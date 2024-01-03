"use server"

import db from "@/lib/db";
import {redirect} from "next/navigation";
import {z} from "zod";
import {generateControlNumber, normalizeValues} from "@/lib/utils";
import {decryptJson, encryptJson, rsaEncryption} from "@/lib/banorte";

const CuentaFolioSchema = z.object({
    cuentaFolio: z.string().length(12, "La cuenta-folio debe tener 12 dígitos.").regex(/^\d+$/, "La cuenta-folio solo puede contener números."),
});

const SolicitaSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    apellidoPaterno: z.string().min(1, "El apellido paterno es requerido"),
    apellidoMaterno: z.string().min(1, "El apellido materno es requerido"),
    curp: z.string().length(18, "La CURP debe tener 18 caracteres"),
    codigoPostal: z.string().length(5, "El código postal debe tener 5 dígitos"),
    colonia: z.string().min(1, "La colonia es requerida"),
    calle: z.string().min(1, "La calle es requerida"),
    numeroExterior: z.string().min(1, "El número exterior es requerido"),
    numeroInterior: z.string().optional(),
    telefono: z.string().length(10, "El teléfono debe tener 10 dígitos"),
    correo: z.string().email("El correo electrónico no es válido"),
    terms: z.boolean().refine(val => val, "Debe aceptar los términos y condiciones"),
    notifications: z.boolean().optional(),
});

interface ValidationState {
    status: string;
    message: string | undefined;
}

interface BankResponse {
    idAfiliacion: number;
    referencia: number;
    fechaReqCte: string;
    fechaRspCte: string;
    resultadoPayw: string;
    codigoAut: string;
    texto: string;
    data: string; // Encrypted data
    status3D: string;
    eci: string;
    decision: string;
    reasonCode: number;
    bnteCode: string;
    bnteText: string;
    id: number;
    message: string;
    numeroControl: string;
}

export async function validateCuentaFolio(prevState: ValidationState, formData: FormData): Promise<ValidationState> {
    const result = CuentaFolioSchema.safeParse({
        cuentaFolio: formData.get("cuentaFolio")
    });

    if (!result.success) {
        console.log(prevState);
        return {
            status: "error",
            message: result.error.flatten().fieldErrors.cuentaFolio?.join(","),
        };
    }

    const [cuenta, folio] = splitCuentaFolio(result.data.cuentaFolio.toString());
    const count = await countPredio(cuenta, folio);

    if (count === 0) {
        console.log("Cuenta-Folio no encontrado");
        return {
            status: "error",
            message: "Cuenta-Folio no encontrado",
        };
    }

    console.log("Cuenta-Folio encontrado", prevState);
    redirect(`/predio/${cuenta}${folio}`);
    return {status: "success", message: ""};
}

export async function solicitaAction(prevState, formData: FormData) {
    let rawData = Object.fromEntries(formData.entries());

    rawData.terms = rawData.terms === "on" ? true : false;
    rawData.notifications = rawData.notifications === "on";

    console.log(rawData);
    const result = SolicitaSchema.safeParse({...rawData})

    if (!result.success) {
        console.log(result.error);
        return {
            status: "Error",
            message: result.error.flatten().fieldErrors
        }
    }


    try {
        const newSolicitud = await db.Solicitud2024.create({
            data: {
                nombre: result.data.nombre,
                apellidoPaterno: result.data.apellidoPaterno,
                apellidoMaterno: result.data.apellidoMaterno,
                curp: result.data.curp,
                codigoPostal: result.data.codigoPostal,
                colonia: result.data.colonia,
                calle: result.data.calle,
                numeroExterior: result.data.numeroExterior,
                numeroInterior: result.data.numeroInterior || null,
                telefono: result.data.telefono,
                correo: result.data.correo,
                terms: result.data.terms,
                notifications: result.data.notifications,
            },
        })

        console.log("SOLICITUD GRABADA", newSolicitud);
    } catch (error) {
        console.error(error);
        return {
            status: "Error",
            message: `Error al guardar la solicitud ${error.toString()}`
        }
    }

    return {
        status: "Success",
        // Return the created solicitud, flattened.
        message: Object.fromEntries(Object.entries(result.data).map(([key, value]) => {
            if (typeof value === "boolean") {
                return [key, value ? "Si" : "No"];
            }
            return [key, value];
        })),
    }
}

// Guarda los valores retornados de Banorte en la Base de Datos, en la tabla PaymentTransactions.
// Usa la Salt, Vi, y passphrase usadas durante el encriptado para regenerar la clave derivada pbkdf2 y desencriptar el payload.
export async function saveBanorteResponse(payload: any, cuentafolio: string) {
    try {
        console.log("PAYLOAD RAW:", payload);
        const numCtrl = payload.numeroControl;
        const encryptedFields = payload.data;
        // Get the salt, vi, and passphrase from the DB Table encryption_details, using the controlNumber.
        const encryptionDetailsParams = await db.encryptionDetail.findFirst({
            where: {
                controlNumber: numCtrl,
            },
        });
        console.log(encryptionDetailsParams);

        // Decrypt the payload using the salt, vi, and passphrase.
        const decryptedPayload = decryptJson(encryptedFields, encryptionDetailsParams.passphrase, encryptionDetailsParams.iv, encryptionDetailsParams.salt);
        const dataJson = JSON.parse(decryptedPayload);
        const banorteResponseWithDecryptedData = {
            ...payload,
            ...dataJson,
            cuentafolio: cuentafolio
        }
        // Compose the object to save combining the decrypted payload with the rest of the fields.
        console.log(banorteResponseWithDecryptedData);

        // Save the object in the DB Table PaymentTransactions.
        const paymentTransaction = await db.banorteTransacciones.create({
            data: banorteResponseWithDecryptedData,
        });

        console.log(paymentTransaction);

    } catch (e) {
        console.error(e);
    }
}

export async function getPredio(cuentaFolio: string) {
    try {
        const [cuenta, folio] = splitCuentaFolio(cuentaFolio)

        console.log(cuentaFolio);

        const paymentData = await db.banorteTransacciones.findFirst({
            where: {
                cuentafolio: cuentaFolio,
            }
        });

        console.log("PAYMENTDATA: ", paymentData);

        const predio = await db.padron.findFirst({
            where: {
                pcuenta: cuenta,
                pfolio: folio,
            },
        });

        return {
            predio,
            paymentData
        }
    } catch (error) {
        console.error("Error in getPredio:", error)
        return null;
    }
}

export async function countPredio(cuenta: string, folio: string): Promise<number> {
    return await db.padron.count({
        where: {
            pcuenta: cuenta,
            pfolio: folio,
        },
    });
}

function splitCuentaFolio(cuentaFolio: string): [string, string] {
    const matches = cuentaFolio.match(/.{1,6}/g);

    if (!matches || matches.length !== 2) {
        throw new Error("Invalid cuentaFolio format");
    }

    return [matches[0], matches[1]];
}

export async function encryptPayload(cuenta, folio) {
    try {
        const cuentaFolio = `${cuenta}${folio}`;
        const dataFromDB = await getPredio(cuentaFolio);

        const banortePayload = createDataObject(dataFromDB.predio);

        const jsonData = JSON.stringify(normalizeValues(banortePayload));
        const dataEncrypted = encryptJson(jsonData);

        const dataEncryptedStr = `${dataEncrypted.Vi}::${dataEncrypted.Salt}::${dataEncrypted.Passphrase}`;

        // Store the Vi, Salt and Passphrase in the DB Table encryption_details, for later use.
        const encryptionDetails = await db.encryptionDetail.create({
            data: {
                salt: dataEncrypted.Salt,
                passphrase: dataEncrypted.Passphrase,
                iv: dataEncrypted.Vi,
                controlNumber: banortePayload.controlNumber,
            }
        });

        console.log("SAVED ENCRYPTION DETAILS:", encryptionDetails);

        const enryptedPassphrase = rsaEncryption(dataEncryptedStr);

        console.log(`${dataEncrypted.Vi}::${dataEncrypted.Salt}::${dataEncrypted.Passphrase}`);

        const finalString = `${enryptedPassphrase}:::${dataEncrypted.Cypherdata}`;

        return finalString;
    } catch (error) {
        console.error(error);
        throw new Error("Error al encriptar los datos.");
    }
}

function createDataObject(dataFromDB) {
    const merchantConfig = getMerchantConfig();
    return {
        ...merchantConfig,
        amount: dataFromDB.imptotal2.toFixed(2),
        billToFirstName: dataFromDB.pnombre,
        billToLastName: dataFromDB.papp,
        billToStreet: dataFromDB.dfcalle,
        billToStreetNumber: dataFromDB.dfnum,
        billToStreet2Col: dataFromDB.dpcolonia,
        billToCity: dataFromDB.dfcd,
        ...createMerchantDefinedDataFields(3, 100)
    }
}

function getMerchantConfig() {
    return {
        merchantId: process.env.BAN_MERCHANT_ID,
        name: process.env.BAN_NAME,
        password: process.env.BAN_PASSWORD,
        mode: process.env.BAN_MODE,
        controlNumber: generateControlNumber(25).toString(),
        terminalId: process.env.BAN_TERMINAL_ID,
        merchantName: process.env.BAN_MERCHANT_NAME,
        merchantCity: process.env.BAN_MERCHANT_CITY,
        lang: "ES",
    }
}

function createMerchantDefinedDataFields(start: number, end: number) {
    const merchantDefinedDataFields = {};
    for (let i = start; i <= end; i++) {
        merchantDefinedDataFields[`merchantDefinedDataField${i}`] = "";
    }
    return merchantDefinedDataFields;
}
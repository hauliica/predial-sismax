"use server"

import db from "@/lib/db";
import {type Padron} from "@prisma/client";
import {redirect} from "next/navigation";
import {z} from "zod";
import {generateControlNumber} from "@/lib/utils";
import {encryptJson, rsaEncryption} from "@/lib/banorte";

const schema = z.object({
    cuentaFolio: z
        .string()
        .min(12, {message: "Cuenta-Folio debe tener 12 dígitos."})
        .max(12, {message: "Cuenta-Folio debe tener 12 dígitos."})
        .regex(/^[0-9]+$/, {message: "Cuenta-Folio debe contener solo números."}),
});

export async function validateCuentaFolio(prevState?: {
    status: string;
    message: string
}, formData: FormData): Promise<{ status: string; message: string }> {
    // Simulate a 1 second delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const validateData = schema.safeParse({
        cuentaFolio: formData.get("cuentaFolio"),
    });

    // Return error if validation fails
    if (!validateData.success) {
        console.log(prevState);
        return {
            status: "error",
            message: validateData.error.flatten().fieldErrors.cuentaFolio,
        };
    }

    // Split the cuentaFolio into two parts each 6 digits long
    const [cuenta, folio] = validateData.data.cuentaFolio.match(/.{1,6}/g);
    console.log(cuenta, folio);

    //  Check if cuenta and folio exist in the Padron table
    const cuentaFolioExists = await db.padron.count({
        where: {
            pcuenta: cuenta,
            pfolio: folio,
        },
    });
    console.log(cuentaFolioExists, prevState);

    // Return error if cuentaFolio doesn't exist
    if (!cuentaFolioExists) {
        console.log("Cuenta-Folio no encontrado.");
        return {
            status: "error",
            message: "Cuenta-Folio no encontrado.",
        };
    }

    // Return success if everything checks out
    console.log("Cuenta-Folio encontrado.", prevState);

    redirect(`/predio/${cuenta}${folio}`);
}

export async function getPredio(cuentaFolio: string) {
    // Split the cuentaFolio into two parts each 6 digits long
    const [cuenta, folio] = cuentaFolio.match(/.{1,6}/g);

    //  Check if cuenta and folio exist in the Padron table
    const predio = await db.padron.findFirst({
        where: {
            pcuenta: cuenta,
            pfolio: folio,
        },
    });

    return predio as Padron;
}

export async function encryptPayload(cuenta, folio) {
    const cuentaFolio = `${cuenta}${folio}`;
    const dataFromDB = await getPredio(cuentaFolio);
    // Get client IP
    // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const data = {
        merchantId: process.env.BAN_MERCHANT_ID,
        name: process.env.BAN_NAME,
        password: process.env.BAN_PASSWORD,
        mode: process.env.BAN_MODE,
        controlNumber: generateControlNumber().toString().toUpperCase(),
        terminalId: process.env.BAN_TERMINAL_ID,
        amount: dataFromDB.imptotal2.toFixed(2),
        merchantName: process.env.BAN_MERCHANT_NAME,
        merchantCity: process.env.BAN_MERCHANT_CITY,
        lang: "ES",
        customerRef1: "",
        customerRef2: "",
        customerRef3: "",
        customerRef4: "",
        customerRef5: "",
        billToFirstName: dataFromDB.pnombre,
        billToLastName: dataFromDB.papp,
        billToStreet: dataFromDB.dpcalle,
        billToStreetNumber: dataFromDB.dpnum,
        billToStreetNumber2: "",
        billToStreet2Col: dataFromDB.dpcolonia,
        billToStreet2Del: dataFromDB.dfcd,
        billToCity: "ACUNA",
        billToState: "CO",
        billToCountry: "MX",
        billToPhoneNumber: "8771000000",
        billToPostalCode: "26260",
        billToEmail: "correo@email.com",
        billToCustomerId: "",
        billToCustomerPassword: "",
        billToDateOfBirth: "",
        billToHostname: "",
        billToHttpBrowserEmail: "",
        billToIpAddress: "",
        comments: "",
        shipToFirstName: "",
        shipToLastName: "",
        shipToStreetNumber: "",
        shipToStreetNumber2: "",
        shipToStreet2Col: "",
        shipToStreet2Del: "",
        shipToCity: "",
        shipToState: "",
        shipToCountry: "",
        shipToPostalCode: "",
        shipToPhoneNumber: "",
        merchantDefinedDataField3: "",
        merchantDefinedDataField4: "",
        merchantDefinedDataField5: "",
        merchantDefinedDataField8: "",
        merchantDefinedDataField6: "",
        merchantDefinedDataField7: "",
        merchantDefinedDataField9: "",
        merchantDefinedDataField10: "",
        merchantDefinedDataField11: "",
        merchantDefinedDataField12: "",
        merchantDefinedDataField13: "",
        merchantDefinedDataField14: "",
        merchantDefinedDataField15: "",
        merchantDefinedDataField16: "",
        merchantDefinedDataField17: "",
        merchantDefinedDataField18: "",
        merchantDefinedDataField19: "",
        merchantDefinedDataField20: "",
        merchantDefinedDataField21: "",
        merchantDefinedDataField22: "",
        merchantDefinedDataField23: "",
        merchantDefinedDataField24: "",
        merchantDefinedDataField25: "",
        merchantDefinedDataField26: "",
        merchantDefinedDataField27: "",
        merchantDefinedDataField28: "",
        merchantDefinedDataField29: "",
        merchantDefinedDataField30: "",
        merchantDefinedDataField31: "",
        merchantDefinedDataField32: "",
        merchantDefinedDataField33: "",
        merchantDefinedDataField34: "",
        merchantDefinedDataField35: "",
        merchantDefinedDataField36: "",
        merchantDefinedDataField37: "",
        merchantDefinedDataField38: "",
        merchantDefinedDataField39: "",
        merchantDefinedDataField40: "",
        merchantDefinedDataField41: "",
        merchantDefinedDataField42: "",
        merchantDefinedDataField43: "",
        merchantDefinedDataField44: "",
        merchantDefinedDataField45: "",
        merchantDefinedDataField46: "",
        merchantDefinedDataField47: "",
        merchantDefinedDataField48: "",
        merchantDefinedDataField49: "",
        merchantDefinedDataField50: "",
        merchantDefinedDataField51: "",
        merchantDefinedDataField52: "",
        merchantDefinedDataField53: "",
        merchantDefinedDataField54: "",
        merchantDefinedDataField55: "",
        merchantDefinedDataField56: "",
        merchantDefinedDataField57: "",
        merchantDefinedDataField58: "",
        merchantDefinedDataField59: "",
        merchantDefinedDataField60: "",
        merchantDefinedDataField61: "",
        merchantDefinedDataField62: "",
        merchantDefinedDataField63: "",
        merchantDefinedDataField64: "",
        merchantDefinedDataField65: "",
        merchantDefinedDataField66: "",
        merchantDefinedDataField67: "",
        merchantDefinedDataField68: "",
        merchantDefinedDataField69: "",
        merchantDefinedDataField70: "",
        merchantDefinedDataField71: "",
        merchantDefinedDataField72: "",
        merchantDefinedDataField73: "",
        merchantDefinedDataField74: "",
        merchantDefinedDataField75: "",
        merchantDefinedDataField76: "",
        merchantDefinedDataField77: "",
        merchantDefinedDataField78: "",
        merchantDefinedDataField79: "",
        merchantDefinedDataField80: "",
        merchantDefinedDataField81: "",
        merchantDefinedDataField82: "",
        merchantDefinedDataField83: "",
        merchantDefinedDataField84: "",
        merchantDefinedDataField85: "",
        merchantDefinedDataField86: "",
        merchantDefinedDataField87: "",
        merchantDefinedDataField88: "",
        merchantDefinedDataField89: "",
        merchantDefinedDataField90: "",
        merchantDefinedDataField91: "",
        merchantDefinedDataField92: "",
        merchantDefinedDataField93: "",
        merchantDefinedDataField94: "",
        merchantDefinedDataField95: "",
        merchantDefinedDataField96: "",
        merchantDefinedDataField97: "",
        merchantDefinedDataField98: "",
        merchantDefinedDataField99: "",
        merchantDefinedDataField100: "",
    };

    // Convert a JSON object to a string. Making sure it contains the opening and closing {} and quotes around the kes and values
    const jsonData = JSON.stringify(data);

    const dataEncrypted = encryptJson(jsonData);
    // Compose the string to be encrypted from the retuned values
    const dataEncryptedStr = `${dataEncrypted.Vi}::${dataEncrypted.Salt}::${dataEncrypted.Passphrase}`;
    // Perform RSA encryption
    const encryptedPassphrase = rsaEncryption(dataEncryptedStr);

    console.log(`${dataEncrypted.Vi}::${dataEncrypted.Salt}::${dataEncrypted.Passphrase}`);

    // Compose final string to be sent to Banorte compose of the encrypted passPhrase and encrptedData
    const finalString = `${encryptedPassphrase}:::${dataEncrypted.Cypherdata}`;

    return finalString;
}

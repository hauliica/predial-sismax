"use server"

import db from "@/lib/db";
import {type Padron} from "@prisma/client";
import {redirect} from "next/navigation";
import {z} from "zod";
import {generateControlNumber, normalizeValues} from "@/lib/utils";
import {decryptJson, encryptJson, rsaEncryption} from "@/lib/banorte";

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
}, formData: FormData): Promise<{ message: string[] | undefined; status: string }> {
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
    // Get the IP from the request


    const data = {
        merchantId: process.env.BAN_MERCHANT_ID,
        name: process.env.BAN_NAME,
        password: process.env.BAN_PASSWORD,
        mode: process.env.BAN_MODE,
        controlNumber: generateControlNumber().toString(),
        terminalId: process.env.BAN_TERMINAL_ID,
        amount: dataFromDB.imptotal2.toFixed(2),
        merchantName: process.env.BAN_MERCHANT_NAME,
        merchantCity: process.env.BAN_MERCHANT_CITY,
        lang: "ES",
        billToFirstName: dataFromDB.pnombre,
        billToLastName: dataFromDB.papp,
        billToStreet: dataFromDB.dpcalle,
        billToStreetNumber: dataFromDB.dpnum,
        billToStreet2Col: dataFromDB.dpcolonia,
        billToStreet2Del: dataFromDB.dfcd,
        billToCity: "ACUNA",
        billToState: "CO",
        billToCountry: "MX",
        billToPhoneNumber: "8771000000",
        billToPostalCode: "26260",
        billToEmail: "correo@email.com",
        billToIpAddress: "189.179.227.40",
    };

    // Convert a JSON object to a string. Making sure it contains the opening and closing {} and quotes around the kes and values
    const jsonData = JSON.stringify(normalizeValues(data));

    const dataEncrypted = encryptJson(jsonData);
    // Compose the string to be encrypted from the retuned values
    const dataEncryptedStr = `${dataEncrypted.Vi}::${dataEncrypted.Salt}::${dataEncrypted.Passphrase}`;
    // Perform RSA encryption
    const encryptedPassphrase = rsaEncryption(dataEncryptedStr);

    console.log(`${dataEncrypted.Vi}::${dataEncrypted.Salt}::${dataEncrypted.Passphrase}`);

    const decrypted = decryptJson(dataEncrypted.Cypherdata, dataEncrypted.Passphrase, dataEncrypted.Vi, dataEncrypted.Salt);

    // Compose final string to be sent to Banorte compose of the encrypted passPhrase and encrptedData
    const finalString = `${encryptedPassphrase}:::${dataEncrypted.Cypherdata}`;

    return finalString;
}

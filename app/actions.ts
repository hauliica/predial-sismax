"use server"

import db from "@/lib/db";
import {type Padron} from "@prisma/client";
import {redirect} from "next/navigation";
import {z} from "zod";

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
}, formData: FormData): Promise<{ status?: string; message?: string }> {
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

export async function getPredio(cuentaFolio: string): Promise<Padron> {
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
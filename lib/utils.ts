import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {randomBytes} from "crypto";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateControlNumber(cuentaFolio: string, length: number = 30): string {
    if (length > 30 || length <= 0) {
        throw new Error('Longitud no soportada.');
    }

    if (cuentaFolio.length !== 12) {
        throw new Error('El cuentaFolio debe ser de 12 dígitos.');
    }

    // Codificado Base62 (0-9, a-z, A-Z)
    const base62Charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = cuentaFolio; // Start with cuentaFolio as the first 12 characters

    while (result.length < length) {
        const bytes = randomBytes(length - result.length);
        bytes.forEach(b => {
            // Convertidor 0-255 a 0-61
            const charIndex = b % 62;
            if (result.length < length) {
                result += base62Charset[charIndex];
            }
        });
    }

    return result;
}

export function normalizeValues(obj: Record<string, any>): Record<string, any> {
    const normalizedObj = {...obj};

    Object.keys(normalizedObj).forEach(key => {
        if (typeof normalizedObj[key] === 'string') {
            normalizedObj[key] = normalizedObj[key].normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ñ/gi, 'n');
        }
    });

    return normalizedObj;
}
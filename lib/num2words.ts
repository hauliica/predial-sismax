const units = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const uniqueTens = ['once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

function convertHundreds(num: number): string {
    if (num < 100) {
        return convertTens(num);
    }

    const hundred = Math.floor(num / 100);
    const rest = num % 100;
    return (hundred === 1 && rest === 0 ? 'cien' : hundreds[hundred]) + (rest > 0 ? ' ' + convertTens(rest) : '');
}

function convertTens(num: number): string {
    if (num < 10) {
        return units[num];
    } else if (num >= 11 && num <= 19) {
        return uniqueTens[num - 11];
    }

    const ten = Math.floor(num / 10);
    const unit = num % 10;
    return tens[ten] + (unit !== 0 ? (ten === 2 ? 'i' : ' y ') + units[unit] : '');
}

function convertThousands(num: number): string {
    if (num < 1000) {
        return convertHundreds(num);
    }

    const thousands = Math.floor(num / 1000);
    let thousandsWords = thousands === 1 ? 'mil' : convertHundreds(thousands) + ' mil';
    const rest = num % 1000;
    rest > 0 && (thousandsWords += ' ' + convertHundreds(rest));
    return thousandsWords;
}

export default function num2words(amount: number | string): string {
    if (typeof amount === "string") {
        amount = parseFloat(amount);
    }

    let integerPart = Math.floor(amount);
    let fractionalPart = amount - integerPart;

    const cents = Math.round(fractionalPart * 100);
    const amountInWords = integerPart > 0 ? convertThousands(integerPart) + ' peso' + (integerPart === 1 ? '' : 's') : '';
    const centsInWords = cents > 0 ? convertTens(cents) + ' centavo' + (cents === 1 ? '' : 's') : '';
    return [amountInWords, centsInWords].filter(Boolean).join(' con ');
}
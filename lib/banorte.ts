import * as forge from "node-forge";
import {readFileSync} from "fs";

export function encryptJson(jsonData: string) {
    // Generate a random passphrase, iv and salt
    const passphrase = generateRandomString(16, true);
    const iv = generateRandomString(16, false);
    const salt = generateRandomString(16, false);
    // Convert the Iv and Salt to Hex
    const ivHex = Buffer.from(iv, "utf-8").toString("hex");
    const saltHex = Buffer.from(salt, "utf-8").toString("hex");
    // Convert the Hex to Byte array
    const ivBytes = forge.util.hexToBytes(ivHex);
    const saltBytes = forge.util.hexToBytes(saltHex);

    const key = forge.pkcs5.pbkdf2(
        passphrase,
        saltBytes,
        1000,
        16,
        forge.md.sha1.create(),
    );

    const dataBytes = forge.util.encodeUtf8(jsonData);
    const ivBuffer = forge.util.createBuffer(ivBytes, "raw");

    const cipher = forge.cipher.createCipher("AES-CTR", key);
    cipher.start({iv: ivBytes});
    cipher.update(forge.util.createBuffer(dataBytes, "raw"));
    cipher.finish();

    const encryptedContent = forge.util.encode64(cipher.output.getBytes());

    console.log({
        encryptedContent,
        ivBytes,
        passphrase,
        iv,
        salt,
        key,
        dataBytes,
        cipher,
    });

    return {
        Vi: ivHex,
        Salt: saltHex,
        Passphrase: passphrase,
        Cypherdata: encryptedContent,
    };
}

export function rsaEncryption(aesKey: string) {
    const certPem = readFileSync(process.env.CERTIFICATE_PATH, "utf-8");
    const cert = forge.pki.certificateFromPem(certPem);
    // From the certificate extract the public key
    const rsaPK = cert.publicKey;
    const ver = cert.validity;

    const dataBuffer = Buffer.from(aesKey, "utf-8");

    const encryptedData = rsaPK.encrypt(
        dataBuffer.toString("binary"),
        "RSA-OAEP",
        {
            md: forge.md.sha256.create(),
            mgf1: {
                md: forge.md.sha1.create(),
            },
        },
    );

    console.log({certPem, rsaPK, encryptedData, ver}, forge.util.encode64(encryptedData));

    return forge.util.encode64(encryptedData);
}

/* Decrypt function that takes the combined string of the encrypted passphrase and encrypted data
 * and returns the decrypted data */
export function decryptJson(encryptedData: string, passphrase: string, iv: string, salt: string) {
    // Convert the Hex to Byte array
    const ivBytes = forge.util.hexToBytes(iv);
    const saltBytes = forge.util.hexToBytes(salt);

    // Recreate the key from the passphrase and salt
    const key = forge.pkcs5.pbkdf2(
        passphrase,
        saltBytes,
        1000,
        16,
        forge.md.sha1.create(),
    );

    // Convert the encrypted data to a byte array
    const encryptedDataBytes = forge.util.decode64(encryptedData);

    // Create a buffer from the IV
    const ivBuffer = forge.util.createBuffer(ivBytes, "raw");

    // Create a decipher object
    const decipher = forge.cipher.createDecipher("AES-CTR", key);
    decipher.start({iv: ivBytes});
    decipher.update(forge.util.createBuffer(encryptedDataBytes, "raw"));
    decipher.finish();

    // Get the clear text
    const decrypted = decipher.output.getBytes();
    const decryptedText = forge.util.decodeUtf8(decrypted);

    console.log({
        iv,
        salt,
        ivBytes,
        saltBytes,
        key,
        encryptedDataBytes,
        decrypted,
        decryptedText
    });

    return decrypted;
}

function generateRandomString(length: number, useExtended: boolean): string {
    const chars = useExtended
        ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz*&-%/!?*+=()"
        : "0123456789abcdefghijklmnopqrstuvwxyz";

    let result = "";

    const randomBytes = forge.random.getBytesSync(length);
    for (let i = 0; i < length; i++) {
        const randomValue = randomBytes.charCodeAt(i) % chars.length;
        result += chars[randomValue];
    }

    return result;
}

// export function startBanorte()
// {
//   // Convert a JSON object to a string. Making sure it contains the opening and closing {} and quotes around the kes and values
//   const jsonData = JSON.stringify(data);
//   const passphrase = generateRandomString(16, extendedCharacters);
//   const iv = generateRandomString(16, rndCharacters);
//   const salt = generateRandomString(16, rndCharacters);

//   const dataEncrypted = encryptJson(jsonData, passphrase, iv, salt);
//   // Compose the string to be encrypted from the retuned values
//   const dataEncryptedStr = `${dataEncrypted[0]}::${dataEncrypted[1]}::${dataEncrypted[2]}`;
//   // Perform RSA encryption
//   const encryptedPassphrase = rsaEncryption(dataEncryptedStr);

//   // Compose final string to be sent to Banorte compose of the encrypted passPhrase and encrptedData
//   const finalString = `${encryptedPassphrase}::${dataEncrypted[3]}`;

//   return finalString;
// }
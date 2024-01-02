import {encryptJson, decryptJson, rsaEncryption} from "@/lib/banorte";

describe("Encryption and Decryption Tests", () => {

    describe("encryptJson", () => {
        it("Should encrypt a JSON string and return the correct structure", () => {
            const jsonData = JSON.stringify({test: "data"});
            const encrypted = encryptJson(jsonData);

            expect(encrypted).toHaveProperty("Vi");
            expect(encrypted).toHaveProperty("Salt");
            expect(encrypted).toHaveProperty("Passphrase");
            expect(encrypted).toHaveProperty("Cypherdata");
        });
    });

    describe("decryptJson", () => {
        it("Should decrypt an encrypted JSON string correctly", () => {
            const jsonData = JSON.stringify({test: "data"});
            const {Vi, Salt, Passphrase, Cypherdata} = encryptJson(jsonData);
            const decrypted = decryptJson(Cypherdata, Passphrase, Vi, Salt);

            expect(decrypted).toEqual(jsonData);
        })
    });
})
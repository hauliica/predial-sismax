import {solicitaAction, saveBanorteResponse, validateCuentaFolio} from '@/app/actions';
import {PrismaClient} from '@prisma/client';
import {decryptJson} from "@/lib/banorte";

const prisma = new PrismaClient();

describe('Prisma Client', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        // Delete records created during the test
    })

    describe("Validate Cuenta-Folio", () => {
        it("Should return an error for invalid cuentaFolio", async () => {
            const prevState = {status: '', message: ''};
            const formData = new FormData();
            formData.append('cuentaFolio', '1234567890123');

            const result = await validateCuentaFolio(prevState, formData);

            expect(result.status).toBe('error');
            expect(result.message).toBe('La cuenta-folio debe tener 12 dígitos.');
        })
    })

    describe("Save a Solicitud in the DB using solicitaACtion function", () => {
        it("Should save a solicitud in the database", async () => {
            // Create formData
            const formData = new FormData();
            formData.append('nombre', 'Test');
            formData.append('apellidoPaterno', 'Test');
            formData.append('apellidoMaterno', 'Test');
            formData.append('curp', 'OOCS970425HCLCHL05');
            formData.append('codigoPostal', '26260');
            formData.append('colonia', 'Test');
            formData.append('calle', 'Test');
            formData.append('numeroExterior', 'Test');
            formData.append('numeroInterior', '');
            formData.append('telefono', '8771005275');
            formData.append('correo', 'correo@gmail.com');
            formData.append('terms', "on");
            formData.append('notifications', "on");


            const result = await solicitaAction({}, formData);

            expect(result.status).toBe('Success');


        });
    });

    describe("Save Banorte Response", () => {
        it("Should save the banorte response in the database", async () => {
            const encryptionDetails = {
                salt: '35653478736a756c6533616462763363',
                passphrase: '3Qm9h0SvBRMGGaoq',
                iv: '3862363239347633743367676a637a6f',
                controlNumber: 'Rkzq4H1d4Mbd9mf3u58z8PG5I'
            }

            const banorteResponse = {
                data: '19HimscEUhR+EnrHJSapMvaKQ6tJaSf/oO+ubep/M+Vs9MtAo73hVhGEZ6+I/Xl3BIVDcl9b7IjgBWsQhIj2WOV+m3prEVGpcczaCH+/ioX+2skeuDDb5d3JxZI/9PaFv6H4OtSWlL4oZAL3phVXi32KbP4PGLJyLADtYVQ4fIDTtqy0tmKbnXLVEfGGZOf/xGHn3XJp9Ub6XjT7kmwnS/bK5o0uf6SM/Mn7mMGKY5PvFzPXGmR33Q9XRtaw5sWIDqFTCadYmIcNI5/14pCVxyTyK5+2mW9Io7H8COA4NlW5eJvjtLc6A7b1Si3aYaMD74YskwlicfWXoQW7SwST2W0LfYvx2Flnju4zADLBhQeMN8uA7vzUIUEeVo5KYV6LkeJtThwZWfBHs1A+5cKhxTeSbo+3d3hj60PsrR8PJI6UiZiZVlvER9NUpWlDv0IP3uZGoXVGBnKJ3E6mwpbaosMs0bt96IpNit2B2y9nj5V4oKaSMwQ1jY5tZZsWG0iFQCon+8/hDTqv9t7kde39OBHIkg==',
                status3D: '200',
                eci: '05',
                id: 2,
                message: 'operationSuccessfully',
                numeroControl: 'Rkzq4H1d4Mbd9mf3u58z8PG5I'
            }


            // Decrypt the data field from the response using the encryption details
            const decryptedData = decryptJson(banorteResponse.data, encryptionDetails.passphrase, encryptionDetails.iv, encryptionDetails.salt);
            const decryptedDataObj = JSON.parse(decryptedData);

            // Merge the decrypted data with the banorte response removing the encrypted `data` field
            const banorteResponseWithDecryptedData = {
                ...banorteResponse,
                ...decryptedDataObj
            }

            // Save the banorte response in the database excluding the encrypted `data` field from the original response
            const result = await prisma.banorteTransacciones.create({
                data: banorteResponseWithDecryptedData
            });

            console.log(result);

            expect(result).toHaveProperty('transaction_id')

        })
    })

    describe("getPredio", () => {
        it("should return predio data for valid cuentaFolio", async () => {
            const cuentaFolio = '062307082609';
            const result = await getPredio(cuentaFolio);

            expect(result).toHaveProperty('pcuenta');
            expect(result).toHaveProperty('pfolio');
            expect(result).toHaveProperty('pnombre');
        })
    })
})

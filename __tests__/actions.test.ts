import {solicitaAction, validateCuentaFolio} from '@/app/actions';
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
        it("Should correctly use the saveBanorteResponse Function", async () => {

        })
        it("Should save the banorte response in the database", async () => {
            const encryptionDetails = {
                salt: '6e6f666863366f696f77723462643865',
                passphrase: 'OdW7S9V3c6/TofEG',
                iv: '736f7068783168766379707762397a70',
                controlNumber: 'aLeUtvvvSIsZpTd6d7TPFuLd3'
            }

            const banorteResponse = {
                data: 'uAV4BrpEomPE+jtLaRrcoeSTx1Ca5uKg8PyGENKVCrbIl2LZV3SPibFpb2TCsMSMbp6/65qrgpCwi+fZqosf5xzi3kCDuDy/RVAln0PB7/VSDcEFNdzYspGNQHlGxCQIwkIelECrXBlUcZ0bPC3QKTh6q5eRfaTW4NTOMg5rL5yOofvcd1Zj5jmnMmgAKk8khWl+tw8qtRYR0yGRfiRq6Bh7JZ6k8puScK+ra12rSzhmyEawmGdYh2VZ1bu8T5+LA5C0da5wYZVb+oUtg1sFc5JLtdWGjyMR2jkyQzlgV8PyHtgVOm/n+b6eZRxc27Lwr3avAK0m+uO7fTEtlj7iRlz4s4MnlfIc7t666ooT5WttcoeVaL9S0C8sLWLlSnw/SBft9AppKVNQdwlaxA8S+4qr8fN0K2v5V2l33ZpLkRP7NiD6KGrd/7khOaq+OKI2gEmrSUPAX4Sdwv8jiKwwmdv7fd00fu/XFFa1gvd74PVmHkW8bU/jKxuJ99hqNgMzGQ3jJFsvjMy1VlzqjtPZlGDpuA==',
                status3D: '200',
                eci: '02',
                id: 2,
                message: 'operationSuccessfully',
                numeroControl: 'aLeUtvvvSIsZpTd6d7TPFuLd3'
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

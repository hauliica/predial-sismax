import {encryptPayload} from "@/app/actions";

export function usePaymentModal(data) {
    function startPaymentProcess() {
        try {
            Payment.setEnv("pro");
            Payment.startPayment({
                Params: data,
                onClosed: (response) => console.log(response),
                onError: (response) => console.log(response),
                onSuccess: (response) => console.log(response),
                onCancel: (response) => console.log(response),
            });
        } catch (error) {
            console.log("Error al encriptar datos.", error);
        }
    }

    return {startPaymentProcess};
}
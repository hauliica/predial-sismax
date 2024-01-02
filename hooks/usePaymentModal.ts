import {useState, useEffect} from "react";
import {encryptPayload} from "@/app/actions";

export default function usePaymentModal() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("usePaymentModal");
    }, [])

    const startPayment = async (data) => {
        setIsLoading(true);

        try {
            Payment.setEnv("pro");
            const cipheredData = await encryptPayload(data.pcuenta, data.pfolio);

            Payment.startPayment({
                params: cipheredData,
                onSuccess: (response) => {
                    console.log("Pago exitoso: ", response);
                    setIsLoading(false);
                },
                onError: (error) => {
                    console.log("Error en el pago: ", error);
                    setIsLoading(false);
                },
                onCancel: () => {
                    console.log("Pago cancelado");
                    setIsLoading(false);
                },
                onClosed: () => {
                    console.log("Pago cerrado");
                    setIsLoading(false);
                }
            })
        } catch (error) {
            console.log("Error al iniciar el pago: ", error);
        }
    };

    return {
        isLoading,
        startPayment
    }

}
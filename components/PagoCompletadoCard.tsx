import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckCircle2} from "lucide-react";
import React from "react";

export function PagoCompletadoCard(props) {
    const {data, paymentData} = props; // Assume hasPaid is a prop that tells us if the payment has been made

    // We can format the date nicely using toLocaleDateString() or any other method you prefer
    const paymentDate = new Date(data.fechaRspCte).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Card className="bg-white col-span-2 lg:col-span-4 dark:bg-black shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-green-50 dark:bg-green-900 p-4">
                <div className="flex items-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300 mr-2"/>
                    <CardTitle className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Pago Completado
                    </CardTitle>
                </div>
                <CardDescription className="text-sm text-green-600 dark:text-green-300">
                    ¡Gracias! Tu pago ha sido recibido.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex justify-start mb-2">
                    <span className="font-medium mr-4 text-gray-600 dark:text-gray-200">Fecha:</span>
                    <span className="text-gray-600 font-bold dark:text-gray-200">{paymentDate}</span>
                </div>
                <div className="flex justify-start mb-2">
                    <span className="font-medium mr-4 text-gray-600 dark:text-gray-200">Referencia:</span>
                    <span className="text-gray-600 font-bold dark:text-gray-200">{data.referencia.toString()}</span>
                </div>
                <div className="flex items-center justify-start mb-2">
                    <span className="font-medium text-gray-600 mr-4 dark:text-gray-200">Numero de Control:</span>
                    <span className="text-gray-600 font-bold dark:text-gray-200">{data.numeroControl}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between p-5">
                {/*<Button variant="outline" className="flex items-center">*/}
                {/*    <DownloadIcon className="w-4 h-4 mr-2"/>*/}
                {/*    Descargar Recibo*/}
                {/*</Button>*/}
                {/*<Button variant="outline">*/}
                {/*    Ver Detalles de la Transacción*/}
                {/*</Button>*/}
            </CardFooter>
        </Card>
    );
}
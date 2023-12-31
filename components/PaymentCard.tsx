"use client";

import {CalendarIcon, CreditCardIcon, FileArchiveIcon, ReceiptIcon,} from "lucide-react";
import FullViewportModal from "@/components/LoadingOverlay";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import num2words from "@/lib/num2words";
import Script from "next/script";
import {encryptPayload, saveBanorteResponse} from "@/app/actions";
import {useState} from "react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";

export function PaymentCard(props) {
    const [isBanorteReady, setIsBanorteReady] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const router = useRouter();
    const {data} = props
    console.log(data)

    async function startPaymentProcess() {
        setIsModalLoading(true);

        if (!isBanorteReady) {
            console.error("Payment processor is not ready");
            throw new Error("El procesador de pagos no esta listo")
        }

        const cipheredData = await encryptPayload(data.pcuenta, data.pfolio);
        console.log(cipheredData);


        try {
            Payment.setEnv("pro");

            Payment.startPayment({
                Params: cipheredData,
                onClosed: function (response) {
                    console.log("ONCLOSED: ", response);
                    router.refresh();
                },
                OnError: function (response) {
                    console.log("ONERROR: ", response);
                    // saveBanorteResponse(response, `${data.pcuenta}${data.pfolio}`);
                    router.refresh();
                },
                onSuccess: function (response) {
                    console.log("ONSUCCESS: ", response);
                    saveBanorteResponse(response, `${data.pcuenta}${data.pfolio}`, data.imptotal2);
                    router.refresh();
                    // Redirect to the same page to re-render the segment
                },
                onCancel: function (response) {
                    console.log("ONCANCEL: ", response);
                    router.refresh();
                },
                loaded: function () {
                    setIsModalLoading(false);
                }
            });
        } catch (error) {
            console.log("ERROR: ", error);
            setIsModalLoading(false);
        }

    }

    return (
        <>
            <FullViewportModal show={isModalLoading} message="Cargando..."/>
            <Card className="col-span-2 lg:col-span-4">
                <Script strategy="afterInteractive"
                        src="https://multicobros.banorte.com/orquestador/resources/js/jquery-3.3.1.js" onLoad={() => {
                    console.log("JQuery Loaded");
                }}/>
                <Script strategy="afterInteractive"
                        src="https://multicobros.banorte.com/orquestador/lightbox/checkoutV2.js"
                        onLoad={() => {
                            console.log("Banorte CheckoutV2 Loaded");
                            setIsBanorteReady(true);
                        }}/>
                <CardHeader className="p-5">
                    <CardTitle>Estado de Cuenta</CardTitle>
                    <CardDescription>
                        Revisión detallada del total adeudado y opciones de pago disponibles.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1 lg:grid-cols-2">
                    <div id="adeudoBox" className="mx-2 flex flex-col justify-center">
                        <h6 className="text-xs font-semibold uppercase text-gray-500">
                            Total Adeudado
                        </h6>
                        <p className="text-3xl font-bold text-gray-800">
                            {/* Convert imptotal2 to Number and apply format */}
                            {new Intl.NumberFormat("es-MX", {
                                style: "currency",
                                currency: "MXN",
                            }).format(Number(data.imptotal2))}
                        </p>
                        <p className="text-sm capitalize tracking-tighter text-gray-500">
                            ({num2words(data.imptotal2)})
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-y-4">
                        {/* Fecha Limite de Pago*/}
                        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                            <CalendarIcon className="mt-px h-5 w-5"/>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    Fecha Limite de Pago
                                </p>
                                <p className="text-sm font-medium leading-none">01/31/2024</p>
                            </div>
                        </div>
                        {/*Concepto de Pago*/}
                        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                            <FileArchiveIcon className="mt-px h-5 w-5"/>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Concepto de Pago</p>
                                <p className="text-sm font-medium leading-none">
                                    {data.concepto2}
                                </p>
                            </div>
                        </div>
                        {/*  Estatus de Pago*/}
                        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                            <ReceiptIcon className="mt-px h-5 w-5"/>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Estatus de Pago</p>
                                <p className="text-sm font-medium leading-none">
                                    {data.fechapag}
                                </p>
                            </div>
                        </div>
                        {/*  Medio de Pago*/}
                        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                            <CreditCardIcon className="mt-px h-5 w-5"/>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Medio de Pago</p>
                                <p className="text-sm font-medium leading-none">
                                    {data.fechapag}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
                    {/*  Pagar con Tarjetade Credito*/}
                    <Button
                        variant="default"
                        className="col-span-1"
                        onClick={startPaymentProcess}
                        disabled={!isBanorteReady}
                    >
                        {/* A reload icon that is visible until the checkOutV2 is ready*/}
                        {!isBanorteReady && (
                            <ReloadIcon className="animate-spin h-5 w-5 mr-2"/>
                        )}
                        Pagar con Tarjeta de Credito/Debito
                    </Button>
                    {/*  Imprimir Recibo de Pago*/}
                    <Button variant="outline" className="col-span-1">
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://predial.sistemasmac.com/apis/notifica/imprimir/aviso1.php?cta=${data.pcuenta}&fol=${data.pfolio}`}>
                            Imprimir Estado de Cuenta
                        </a>
                    </Button><Button variant="outline" className="col-span-1">
                    <a target="_blank" rel="noopener noreferrer"
                       href={`https://predial.sistemasmac.com/apis/notifica/imprimir/detalles.php?cta=${data.pcuenta}&fol=${data.pfolio}`}>
                        Informe Detallado
                    </a>
                </Button>

                </CardFooter>

            </Card>
        </>
    )
        ;
}

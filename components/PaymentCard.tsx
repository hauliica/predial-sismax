import {
    CalendarIcon,
    FileArchiveIcon,
    ReceiptIcon,
    CreditCardIcon,
} from "lucide-react";
import Script from "next/script";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

export async function EstadoCuentaCard() {
    return (
        <Card className="col-span-2 lg:col-span-4">
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
                        $ {props.predio.imptotal2}
                    </p>
                    <p className="text-sm capitalize tracking-tighter text-gray-500">
                        ({numberToWords(props.predio.imptotal2)})
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
                            <p className="text-sm font-medium leading-none">01/01/2021</p>
                        </div>
                    </div>
                    {/*Concepto de Pago*/}
                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                        <FileArchiveIcon className="mt-px h-5 w-5"/>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Concepto de Pago</p>
                            <p className="text-sm font-medium leading-none">
                                {props.predio.concepto1}
                            </p>
                        </div>
                    </div>
                    {/*  Estatus de Pago*/}
                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                        <ReceiptIcon className="mt-px h-5 w-5"/>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Estatus de Pago</p>
                            <p className="text-sm font-medium leading-none">
                                {props.predio.fechapag}
                            </p>
                        </div>
                    </div>
                    {/*  Medio de Pago*/}
                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                        <CreditCardIcon className="mt-px h-5 w-5"/>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Medio de Pago</p>
                            <p className="text-sm font-medium leading-none">
                                {props.predio.fechapag}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
                {/*  Pagar con Tarjetade Credito*/}
                <Button
                    onClick={empezarBanorte}
                    variant="default"
                    className="col-span-1"
                >
                    Pagar con Tarjeta de Credito/Debito
                </Button>
                {/*  Imprimir Formato de Pago OXXO*/}
                <Button variant="outline" className="col-span-1">
                    Imprimir Formato de Pago OXXO
                </Button>
                {/*  Imprimir Recibo de Pago*/}
                <Button variant="outline" className="col-span-1">
                    Imprimir Recibo de Pago
                </Button>
            </CardFooter>
            <Script src="https://multicobros.banorte.com/orquestador/resources/js/jquery-3.3.1.js"/>
            <Script src="https://multicobros.banorte.com/orquestador/lightbox/checkoutV2.js"/>
        </Card>
    );
}

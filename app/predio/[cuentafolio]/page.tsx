import {getPredio} from "@/app/actions";
import {PaymentCard} from "@/components/PaymentCard";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {IdCardIcon} from "@radix-ui/react-icons";
import {
    BuildingIcon,
    DollarSignIcon,
    FileArchiveIcon,
    FingerprintIcon,
    HomeIcon,
    KeyIcon,
    MailIcon,
    PhoneIcon,
    PrinterIcon,
    ScaleIcon,
    UserIcon
} from "lucide-react";
import {notFound} from "next/navigation";
import {Button} from "@/components/ui/button";
import {headers} from "next/headers";
import {Suspense} from "react";
import {PagoCompletadoCard} from "@/components/PagoCompletadoCard";

// function IP() {
//     const FALLBACK_IP_ADDRESS = "0.0.0.0";
//     const forwardedFor = headers().get("x-forwarded-for");
//     console.log(headers().entries());
//
//     if (forwardedFor) {
//         console.log(forwardedFor);
//         return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
//     }
//
//     return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
// }

export default async function Page({params}: { params: { cuentafolio: string } }) {
    const {predio, paymentData} = await getPredio(params.cuentafolio);
    const cuentafolio = params.cuentafolio;
    const header = headers();
    const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
    console.log(predio);

    console.log(ip);


    if (!predio) {
        notFound();
    }

    return (
        <Suspense fallback={null}>
            <main>
                <div className="border-b-2 border-neutral-200">
                    <div className="container">
                        <div className
                                 =
                                 "bg-white p-6 flex items-center justify-between w-full">
                            <div className
                                     =
                                     "flex items-center">
                                <div className
                                         =
                                         "rounded-full p-4 bg-blue-100 text-blue-600">
                                    <FileArchiveIcon className
                                                         =
                                                         "h-6 w-6"/>
                                </div>
                                <div className="ml-4">
                                    <div className="font-semibold text-gray-700">Cuenta Folio #{cuentafolio}</div>
                                    <div className="text-sm text-gray-500">{predio.propietario}</div>
                                </div>
                            </div>
                            <div className="hidden flex space-x-2">
                                <Button variant="outline" size="sm"></Button>
                                <Button variant="outline" size="sm">

                                </Button>
                                <Button size="sm">

                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="bg-gray-100">
                    <div className="mx-auto lg:container">
                        <div className="grid gap-4 bg-gray-100 md:grid-cols-2 lg:grid-cols-4 lg:p-6">
                            {/* Card 1: Perfil del Contribuyente */}
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle className="">Perfil del Contribuyente</CardTitle>
                                    <CardDescription>
                                        Información detallada del contribuyente registrada en el
                                        sistema.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-1 lg:grid-cols-2 lg:gap-y-4">
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <UserIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Nombre de Contribuyente
                                            </p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.propietario}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Domicilio */}
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <HomeIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Domicilio</p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.dfcalle} #{predio.dfnum}, {predio.dfcolonia},{" "}
                                                {predio.dfcd}
                                            </p>
                                        </div>
                                    </div>
                                    {/* CURP */}
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <FingerprintIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">CURP</p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.pcurp}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <IdCardIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">RFC</p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.prfc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <MailIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Correo Electrónico
                                            </p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.dfcorreo ?? "Sin Correo"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="-mx-2 flex items-start space-x-4 rounded-sm p-2 transition-all">
                                        <PhoneIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Teléfono</p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.dftel}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card 2: Detalles del Predio */}
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Detalles del Predio</CardTitle>
                                    <CardDescription>
                                        Resumen informativo sobre las características y detalles
                                        catastrales del predio.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    {/*  Domicilio del Predio*/}
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <HomeIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Domicilio del Predio
                                            </p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.dpcalle} #{predio.dpnum}, {predio.dpcolonia},{" "}
                                                {predio.dpcd}
                                            </p>
                                        </div>
                                    </div>
                                    {/*  Clave Catastral*/}
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <ScaleIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Clave Catastral
                                            </p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.clavecatastral}
                                            </p>
                                        </div>
                                    </div>
                                    {/*  Valor Catastral*/}
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <DollarSignIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Valor Catastral
                                            </p>
                                            <p className="text-sm font-medium leading-none">
                                                $ {predio.vcat.toLocaleString("es-MX", {maximumFractionDigits: 2})}
                                            </p>
                                        </div>
                                    </div>
                                    {/*  Superificie de Terreno*/}
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <BuildingIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Superificie de Terreno
                                            </p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.terreno} m²
                                            </p>
                                        </div>
                                    </div>
                                    {/*  Superficie de Construccion*/}
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <PrinterIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Superficie de Construccion
                                            </p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.const} m²
                                            </p>
                                        </div>
                                    </div>
                                    {/*  Uso del Predio*/}
                                    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                                        <KeyIcon className="mt-px h-5 w-5 text-slate-950"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                                Uso del Predio
                                            </p>
                                            <p className="text-sm font-medium leading-none">
                                                {predio.uso}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card 3: Estado de Cuenta */}
                            {/* IF paymentData is not null show PagoCompletadoCard */}
                            {paymentData ? (
                                <PagoCompletadoCard data={paymentData}/>
                            ) : (
                                <PaymentCard data={predio}/>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </Suspense>
    );
}

import {getPredio} from "@/app/actions";
import {EstadoCuentaCard} from "@/components/PaymentCard";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {IdCardIcon} from "@radix-ui/react-icons";
import {
    UserIcon,
    HomeIcon,
    FingerprintIcon,
    MailIcon,
    PhoneIcon,
    ScaleIcon,
    DollarSignIcon,
    BuildingIcon,
    PrinterIcon,
    KeyIcon
} from "lucide-react";

type infoContribuyente = {
    propietario: string;
    dfcalle: string;
    dfnum: string;
    dfcolonia: string;
    dfcd: string;
    pcurp: string;
    prfc: string;
    dfcorreo: string;
    dftel: string;
};

type infoPredio = {
    dpcalle: string;
    dpnum: string;
    dpcolonia: string;
    dpcd: string;
    clavecatastral: string;
    vcat: number;
    terreno: number;
    const: number;
    uso: string;
};

type infoCuenta = {
    imptotal2: number;
    concepto1: string;
    fechapag: string;
};

export default async function Page({
                                       params,
                                   }: {
    params: { cuentafolio: string };
}) {
    const {cuentafolio} = params;
    const predio = await getPredio(cuentafolio);
    // Split the predio object into three objects: infoContribuyente, infoPredio, and infoCuenta

}
return (
    <section className="bg-gray-100 lg:p-4">
        <div className="mx-auto lg:container">
            <div>
                <h1 className="scroll-m-20 py-4 text-2xl font-semibold tracking-tight">
                    Datos del Contribuyente y Predio
                </h1>
            </div>
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
                            <UserIcon className="mt-px h-5 w-5 text-amber-500"/>
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
                            <HomeIcon className="mt-px h-5 w-5 text-amber-500"/>
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
                            <FingerprintIcon className="mt-px h-5 w-5 text-amber-500"/>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">CURP</p>
                                <p className="text-sm font-medium leading-none">
                                    {predio.pcurp}
                                </p>
                            </div>
                        </div>
                        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                            <IdCardIcon className="mt-px h-5 w-5 text-amber-500"/>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">RFC</p>
                                <p className="text-sm font-medium leading-none">
                                    {predio.prfc}
                                </p>
                            </div>
                        </div>
                        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                            <MailIcon className="mt-px h-5 w-5 text-amber-500"/>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    Correo Electrónico
                                </p>
                                <p className="text-sm font-medium leading-none">
                                    {predio.dfcorreo ?? "Sin Correo"}
                                </p>
                            </div>
                        </div>
                        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                            <PhoneIcon className="mt-px h-5 w-5 text-amber-500"/>
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
                            <HomeIcon className="mt-px h-5 w-5 text-amber-500"/>
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
                            <ScaleIcon className="mt-px h-5 w-5 text-amber-500"/>
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
                            <DollarSignIcon className="mt-px h-5 w-5 text-amber-500"/>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    Valor Catastral
                                </p>
                                <p className="text-sm font-medium leading-none">
                                    $ {predio.vcat}
                                </p>
                            </div>
                        </div>
                        {/*  Superificie de Terreno*/}
                        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
                            <BuildingIcon className="mt-px h-5 w-5 text-amber-500"/>
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
                            <PrinterIcon className="mt-px h-5 w-5 text-amber-500"/>
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
                            <KeyIcon className="mt-px h-5 w-5 text-amber-500"/>
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
                <EstadoCuentaCard predio={predio}/>
            </div>
        </div>
    </section>
);
}

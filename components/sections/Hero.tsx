import {HeroImage} from "@/assets/HeroImage";
import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Hero() {

    return (
        <section
            className="min-h-[calc(100vh-65px)] bg-white/70 bg-gradient-to-b from-orange-100 from-0% via-orange-200  via-30%  to-gray-50 bg-blend-overlay">
            <div className="container flex flex-col lg:flex-row">
                <div className="flex flex-col justify-center space-y-4 text-center lg:mb-24 lg:w-5/12 lg:text-left">
          <span className="text-sm tracking-tight">
            Estamos Orgullosos de Presentar
          </span>
                    <h1 className="text-4xl font-black uppercase text-slate-950 lg:text-5xl">
                        Un nuevo método para <span className="text-orange-600">pagar</span>{" "}
                        <br></br> tu predial
                    </h1>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        Te presentamos un sistema simple y eficiente que te permitirá pagar
                        tu impuesto predial en línea, sin tener que salir de casa. Aprovecha
                        esta nueva modalidad y evita filas y tiempos de espera.
                    </p>
                    <div
                        className="mt-4 flex flex-col space-y-2 sm:flex-row sm:justify-evenly sm:space-x-4 sm:space-y-0 lg:justify-start">
                        <Button size="lg"><Link href="#consulta">¡Paga Ahora!</Link></Button>
                        <Button variant="outline" size="lg">
                            <Link href="/solicita">Solicita tu Cuenta Folio</Link>
                        </Button>
                    </div>
                </div>

                <div className="flex justify-center text-center lg:w-7/12">
                    <HeroImage className="h-auto w-full"/>
                </div>
            </div>
        </section>
    );
}

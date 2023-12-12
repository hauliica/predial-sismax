import {VentajasSVG} from "@/assets/VentajasSVG";
import {DoubleArrowUpIcon, LockClosedIcon} from "@radix-ui/react-icons";
import {RocketIcon} from "lucide-react";

const defaultFeatures = [
    {
        name: "Paga en línea rápido y seguro",
        description:
            "Paga tu impuesto predial de manera rápida y segura desde la comodidad de tu hogar. Evita largas filas y tiempos de espera.",
        icon: <DoubleArrowUpIcon/>,
    },
    {
        name: "Certificados SSL",
        description:
            "Tus transacciones en línea están protegidas con certificados SSL avanzados para garantizar la seguridad de tus datos.",
        icon: <LockClosedIcon/>,
    },
    {
        name: "Respaldo de bases de datos",
        description:
            "Tus datos y registros están respaldados de manera segura para garantizar la integridad de la información.",
        icon: <RocketIcon/>,
    },
];

export default function VentajasSection() {
    return (
        <section className="overflow-x-hidden py-16 sm:py-8" id="ventajas">
            <div className="container mx-auto px-6 lg:px-8">
                <div
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-8">
                        <div className="lg:max-w-lg">
                            <h2 className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                                Ventajas de Pagar en Línea
                            </h2>
                            <p className="mt-2 text-3xl font-bold text-gray-800 lg:text-4xl">
                                Una forma más conveniente
                            </p>
                            <p className="mt-3 text-base tracking-tight text-gray-500">
                                Pagar tus impuestos de propiedad en línea en la Ciudad de Acuña
                                tiene ventajas significativas para ti y tu comunidad.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {defaultFeatures.map((feature, index) => (
                                    <div key={index} className="relative pl-9">
                                        <dt className="mr-1 inline font-semibold text-neutral-800">
                      <span className="absolute left-1 top-1 h-5 w-5 text-[#ff9836]">
                        {feature.icon}
                      </span>
                                            {feature.name}
                                        </dt>
                                        <dd className="inline text-gray-600">
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <VentajasSVG className="w-[48rem] max-w-none sm:w-full md:-ml-4 lg:-ml-0"/>
                </div>
            </div>
        </section>
    );
}

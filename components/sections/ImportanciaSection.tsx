import {
    BuildingIcon,
    AlertTriangleIcon,
    HeartIcon,
    BookIcon,
} from "lucide-react";

export default function ImportanciaSection() {
    return (
        <section className="w-full overflow-x-hidden">
            <div className="container px-6 py-10 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                        La Importancia de Pagar Nuestro Predial
                    </h2>
                    <p className="mt-2 text-3xl font-bold text-gray-800 sm:text-4xl">
                        Un Compromiso con la Comunidad
                    </p>
                    <p className="mt-3 text-lg text-gray-500">
                        Tu contribución a través de los impuestos de propiedad es vital para
                        mantener y mejorar los servicios locales.
                    </p>
                </div>

                {/*// <!-- Service Block Rows -->*/}
                <div className="space-y-8">
                    {/*// <!-- Service Row 1 -->*/}
                    <div className="flex flex-row items-center rounded-lg bg-white p-6 shadow-sm">
                        <div className="flex-shrink-0">
                            <BuildingIcon/>
                        </div>
                        <div className="ml-4 flex-grow">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Servicios públicos
                            </h3>
                            <p className="text-base text-gray-500">
                                El impuesto predial se utiliza para financiar servicios públicos
                                como alumbrado, recolección de basura y mantenimiento de calles.
                            </p>
                        </div>
                    </div>
                    {/*// <!-- Additional Service Rows -->*/}
                    <ServiceBlock
                        title="Servicios de emergencia"
                        description="Los impuestos de propiedad se utilizan para financiar servicios de
                emergencia como bomberos, policía, ambulancias, etc."
                        icon={<AlertTriangleIcon/>}
                        index={0}
                    />
                    <ServiceBlock
                        title="Servicios de salud"
                        description="Los impuestos de propiedad se utilizan para financiar servicios de
                salud como hospitales, clínicas, centros de salud, etc."
                        icon={<HeartIcon/>}
                        index={1}
                    />
                    <ServiceBlock
                        title="Servicios de educación"
                        description="Los impuestos de propiedad se utilizan para financiar servicios de
                educación como escuelas, universidades, bibliotecas, etc."
                        icon={<BookIcon/>}
                        index={2}
                    />
                </div>
            </div>
        </section>
    );
}

interface ServiceBlockProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}

function ServiceBlock({title, description, icon, index}: ServiceBlockProps) {
    const rowStyle = index % 2 === 0 ? "flex-row-reverse text-right" : "flex-row";

    return (
        <div
            className={`flex items-center rounded-lg bg-white p-6 shadow-sm ${rowStyle}`}
        >
            <div className="flex-shrink-0">
                <span className="h-5 w-5 text-orange-500">{icon}</span>
            </div>
            <div className="order mx-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-base text-gray-500">{description}</p>
            </div>
        </div>
    );
}

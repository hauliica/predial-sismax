import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import {Link} from "lucide-react";

export default function FAQSection() {
    return (
        <section className="bg-white py-6 sm:py-8 lg:py-12" id="preguntas">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                        Preguntas frecuentes
                    </h2>
                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                        Aquí encontrarás algumas respuestas a preguntas comunes sobre el
                        Pago en Línea del Impuesto Predial.
                    </p>
                </div>
                <div className="mx-auto max-w-2xl">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                ¿Qué es el impuesto predial y por qué debo pagarlo?
                            </AccordionTrigger>
                            <AccordionContent>
                                El impuesto predial es un gravamen que se aplica sobre la
                                propiedad de bienes inmuebles. Los fondos recaudados son
                                utilizados para financiar diversos servicios y obras públicas en
                                el municipio. El pago puntual de este impuesto es crucial para
                                el desarrollo y mantenimiento de la localidad.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                ¿Cómo puedo pagar mi impuesto predial en línea?
                            </AccordionTrigger>
                            <AccordionContent>
                                Para pagar en línea, ingresa tu Cuenta-Folio en el campo
                                correspondiente <Link href="#pago">Aqui</Link>. Luego, sigue los
                                pasos para completar el pago mediante nuestra segura pasarela de
                                pagos.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                ¿Qué es la Cuenta-Folio y dónde lo encuentro?
                            </AccordionTrigger>
                            <AccordionContent>
                                La Cuenta-Folio es un número único asignado a tu propiedad que
                                sirve para identificarla en el sistema. Puedes encontrar este
                                número en tus recibos anteriores de impuesto predial o en la
                                oficina del municipio.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                ¿Qué hago si no tengo un Cuenta-Folio?
                            </AccordionTrigger>
                            <AccordionContent>
                                Si no tienes tu Cuenta-Folio, puedes solicitarlo llenando un
                                formulario en nuestra página de{" "}
                                <Link href="/solicita">Solicitud de Cuenta-Folio</Link> Una vez
                                enviado el formulario, recibirás tu Cuenta-Folio a través del
                                método que elijas: Email o SMS.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>¿Es seguro pagar en línea?</AccordionTrigger>
                            <AccordionContent>
                                Sí, la seguridad es una de nuestras principales preocupaciones.
                                Utilizamos encriptación SSL/TLS para asegurar que tus datos y
                                transacciones estén protegidos.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger>
                                ¿Puedo pagar en efectivo o en una tienda física?
                            </AccordionTrigger>
                            <AccordionContent>
                                Sí, ofrecemos la opción de imprimir un formato con un código de
                                barras que podrás utilizar para pagar en tiendas OXXO.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

import {AcunaLogo} from "@/assets/AcunaLogo";
import Link from "next/link";
import {Button} from "./ui/button";

function Header() {
    return (
        <header className="w-full border-b bg-white">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex flex-shrink-0 items-center">
                        <Link href="/">
                            <AcunaLogo className="h-10 w-auto"/>
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {/* <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                        <Link
                            href="#"
                            className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            Importancia
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            Preguntas Frecuentes
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            Contacto
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Link href="#consulta">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="border border-orange-600 bg-transparent text-orange-600 shadow-sm hover:bg-accent hover:text-accent-foreground"
                            >
                                ¡Paga Ahora!
                            </Button>
                        </Link>
                        <Link href="/solicita">
                            <Button size="sm" className="ml-4">
                                Solicita tu Cuenta-Folio
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;

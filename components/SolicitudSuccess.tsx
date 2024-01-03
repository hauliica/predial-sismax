"use client"

import Link from "next/link";
import {CheckCircleIcon, InboxIcon} from "lucide-react";

export default function SolicitudSuccess() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div
                    className="rounded-lg shadow-xl overflow-hidden p-6 space-y-6 bg-white border-t-4 border-green-500">
                    <div className="text-center space-y-4">
                        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Solicitud Enviada Exitosamente
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Tu solicitud para obtener el Cuenta-Folio ha sido procesada con éxito y está siendo
                            revisada.
                        </p>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <InboxIcon className="mx-auto h-10 w-10 text-blue-500"/>
                                <p className="text-md text-gray-800">
                                    Revisa tu correo electrónico
                                </p>
                                <p className="text-sm text-gray-500">
                                    Te hemos enviado un mensaje con los siguientes pasos a seguir para completar tu
                                    solicitud.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link href="/"
                              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

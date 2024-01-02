"use client"

import {Alert, AlertTitle} from "@/components/ui/alert";
import {AlertDescription} from "@/components/ui/alert";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckCircle, Mail} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function SolicitudSuccess() {
    return (
        <div className="flex items-center justify-center h-auto min-h-[calc(100vh-70px)] bg-gray-100 px-4">
            <div className="rounded-lg shadow-lg p-4 sm:p-6 mx-auto w-full max-w-md md:max-w-xl bg-white">
                <div className="text-center">
                    <div
                        className="mb-6 mx-auto inline-block w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-blue-50 flex items-center justify-center">
                        <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-green-500"/>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Solicitud Enviada</h3>
                    <p className="text-sm sm:text-md text-gray-600 mb-5">Tu solicitud para obtener el Cuenta-Folio ha
                        sido recibida con éxito.</p>
                    <p className="text-xs sm:text-sm text-gray-500">Pronto recibirás un correo electrónico con los
                        detalles de tu solicitud y las instrucciones para consultar y pagar tus impuestos de propiedad
                        en Ciudad Acuña.</p>
                </div>
                <div className="mt-8 flex justify-center">
                    <Link href="/"
                          className="inline-flex items-center justify-center bg-orange-600 text-white font-semibold rounded-md px-4 sm:px-5 py-2 sm:py-3 hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 transition ease-in-out duration-150">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>

    )
}
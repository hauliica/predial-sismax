"use client";

import React, {useMemo, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {solicitaAction} from "@/app/actions";
import {useFormState, useFormStatus} from "react-dom";
import SolicitudSuccess from "@/components/SolicitudSuccess";

const CheckIcon = () => (
    <svg className="flex-shrink-0 w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"></path>
    </svg>
);

function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    );
}

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <>
            {pending && <LoadingOverlay/>}
            <button type="submit" aria-disabled={pending}>
                Add
            </button>
        </>
    );
}

export default function SolicitaPage() {
    // Form submission handler (to be implemented)
    const [state, formAction] = useFormState(solicitaAction, {
        status: null,
        message: null,
    });

    const isSuccess = state.status === "Success";
    console.log("isSuccess: ", isSuccess);

    return (
        <main className="py-8 bg-white lg:py-0 flex-1">
            {isSuccess ? (
                <SolicitudSuccess/>
            ) : (
                <div className="lg:flex">
                    <section className="hidden w-2/6 p-12 lg:h-auto lg:block bg-amber-400">
                        <div className="flex items-center mb-8 space-x-4">
                            <h2 className="shadow-amber-900 drop-shadow-sm flex items-center text-2xl font-semibold text-white">
                                Solicitud de tu Cuenta-Folio
                            </h2>
                        </div>
                        <div className="block p-8 text-white rounded-lg bg-amber-500">
                            <h3 className="mb-1 text-xl font-display font-semibold">
                                ¿Por qué necesitas tu Cuenta-Folio?
                            </h3>
                            <p className="mb-4 font-light text-amber-100 sm:text-lg">
                                Acceso rápido y seguro a detalles de propiedad y opciones de pago.
                            </p>
                            <ul role="list" className="space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <CheckIcon/>
                                    <span>Acceso a detalles de propiedad</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <CheckIcon/>
                                    <span>Acceso a opciones de pago</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <CheckIcon/>
                                    <span>Acceso a detalles de propiedad</span>
                                </li>
                            </ul>
                        </div>
                    </section>


                    <section className="flex py-4 lg:py-12 px-4 2xl:px-24 items-center w-full lg:w-4/6 lg:px-12">
                        <div className="w-full">
                            <form action={formAction}>
                                {/* Información Personal section */}
                                <h2 className="text-lg font-semibold my-4">Información Personal</h2>
                                <div className="grid gap-5 my-6 sm:grid-cols-2">
                                    {/* nombre */}
                                    <div>
                                        <Label htmlFor="nombre"
                                               className="block mb-2 text-sm font-medium text-gray-900">Nombre</Label>
                                        <Input type="text" name="nombre" id="nombre"

                                               placeholder="Juan" required/>
                                    </div>
                                    <div>
                                        <Label htmlFor="apellidoPaterno"
                                               className="block mb-2 text-sm font-medium text-gray-900">Apellido</Label>
                                        <Input type="text" name="apellidoPaterno" id="apellidoPaterno"

                                               placeholder="Perez" required/>
                                    </div>
                                    <div>
                                        <Label htmlFor="apellidoMaterno"
                                               className="block mb-2 text-sm font-medium text-gray-900">Apellido</Label>
                                        <Input type="text" name="apellidoMaterno" id="apellidoMaterno"
                                               className=""
                                               placeholder="Perez" required/>
                                    </div>
                                    <div>
                                        <Label htmlFor="curp"
                                               className="block mb-2 text-sm font-medium text-gray-900">CURP</Label>
                                        <Input type="text" name="curp" id="curp"

                                               placeholder="PERJ980101HDFRRL09" required/>
                                    </div>
                                </div>
                                {/* ... Other sections of the form */}
                                <h2 className="text-lg font-semibold my-4">Direccion</h2>
                                <div className="grid gap-5 my-6 sm:grid-cols-2">
                                    {/*  Codigo Postal*/}
                                    <div>
                                        <Label htmlFor="codigoPostal"
                                               className="block mb-2 text-sm font-medium text-gray-900">Codigo
                                            Postal</Label>
                                        <Input type="text" name="codigoPostal" id="codigoPostal"
                                               placeholder="12345" required/>
                                    </div>
                                    <div>
                                        <Label htmlFor="colonia"
                                               className="block mb-2 text-sm font-medium text-gray-900">Colonia</Label>
                                        <Input type="text" name="colonia" id="colonia"
                                               placeholder="Centro" required/>
                                    </div>
                                    <div>
                                        <Label htmlFor="calle"
                                               className="block mb-2 text-sm font-medium text-gray-900">Calle</Label>
                                        <Input type="text" name="calle" id="calle"
                                               placeholder="Calle 1" required/>
                                    </div>
                                    <div>
                                        <Label htmlFor="numeroExterior"
                                               className="block mb-2 text-sm font-medium text-gray-900">Numero
                                            Exterior</Label>
                                        <Input type="text" name="numeroExterior" id="numeroExterior"
                                               placeholder="123" required/>
                                    </div>
                                    <div>
                                        <Label htmlFor="numeroInterior"
                                               className="block mb-2 text-sm font-medium text-gray-900">Numero
                                            Interior</Label>
                                        <Input type="text" name="numeroInterior" id="numeroInterior"
                                        />
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold my-4">Contacto</h2>
                                <div className="grid gap-5 my-6 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="telefono"
                                               className="block mb-2 text-sm font-medium text-gray-900">Telefono</Label>
                                        <Input type="text" name="telefono" id="telefono"
                                               placeholder="1234567890" required/>
                                    </div>
                                    <div>
                                        <Label htmlFor="correo"
                                               className="block mb-2 text-sm font-medium text-gray-900">Correo</Label>
                                        <Input type="text" name="correo" id="correo"
                                               placeholder="correo@electronico.com" required/>
                                    </div>
                                </div>

                                <div className="mb-6 space-y-3">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="terms"
                                                name="terms"
                                                aria-describedby="terms"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-amber-300"
                                                required
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <Label htmlFor="terms" className="font-light text-gray-500 ">
                                                Al enviar este formulario, estás solicitando tu Cuenta-Folio y aceptas
                                                los{" "}
                                                <a className="font-medium text-amber-600 hover:underline" href="#">
                                                    Términos de Uso
                                                </a>{" "}
                                                y la{" "}
                                                <a className="font-medium text-amber-600 hover:underline" href="#">
                                                    Política de Privacidad
                                                </a>{" "}
                                                de la ciudad de Acuña.
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="notifications"
                                                name="notifications"
                                                aria-describedby="notifications"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-amber-300"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="notifications" className="font-light text-gray-500 ">
                                                Envíame actualizaciones y notificaciones relacionadas con el Impuesto
                                                Predial.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* Submit button */}
                                <div className="justify-end mt-4 flex space-x-3">
                                    <Button type="reset" variant="outline">
                                        Empezar de nuevo
                                    </Button>
                                    <SubmitButton type="submit">
                                        Solicitar mi Cuenta-Folio
                                    </SubmitButton>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}
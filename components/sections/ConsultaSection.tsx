"use client";

import Link from "next/link";
import {useFormState, useFormStatus} from "react-dom";
import {validateCuentaFolio} from "@/app/actions";
import {Button} from "../ui/button";

function SubmitBtn() {
    const {pending} = useFormStatus();

    return (
        <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
            {pending ? "Enviando..." : "Enviar"}
        </Button>
    );
}

export default function CTASection() {
    const [state, formAction] = useFormState(validateCuentaFolio, {
        status: null,
        message: null,
    });

    return (
        <section
            id="pago"
            className="flex w-full items-center justify-center overflow-x-hidden py-8"
        >
            <div
                className="pointer-events-none relative inset-0 overflow-hidden"
                aria-hidden="true"
            >
                <svg
                    className="absolute inset-0 h-full w-full"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 32 32"
                    preserveAspectRatio="none"
                    transform="scale(3)"
                >
                    <path
                        d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 2c7.732 0 14 6.268 14 14S23.732 30 16 30C8.268 30 2 23.732 2 16S8.268 2 16 2z"
                        fill="rgba(255,255,255,0.05)"
                    />
                </svg>
                <svg
                    className="absolute left-1/4 top-1/4 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rotate-45 transform"
                    viewBox="0 0 100 100"
                    fill="rgba(255,255,255,0.10)"
                >
                    <rect width="100" height="100" rx="5"></rect>
                </svg>
                <svg
                    className="absolute bottom-1/4 right-1/4 h-40 w-40 translate-x-1/2 translate-y-1/2 rotate-[170deg] transform"
                    viewBox="0 0 100 100"
                    fill="rgba(255,255,255,0.05)"
                >
                    <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg
                    className="bottom-6/6 absolute right-1/3 h-40 w-40 translate-x-1/2 translate-y-1/2 rotate-[210deg] transform"
                    viewBox="0 0 100 100"
                    fill="rgba(255,255,255,0.03)"
                >
                    <rect width="100" height="100" rx="5"></rect>
                </svg>
                <div className="bg-noise absolute inset-0 opacity-[0.8]"></div>
            </div>
            <div
                className="relative mx-auto max-w-4xl space-y-6 rounded-none bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-4 py-16 text-center shadow-2xl sm:px-6 lg:rounded-lg lg:px-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    ¡Comienza a pagar tu predio de manera rápida y segura!
                </h2>
                <p className="inline-block rounded-full bg-white bg-opacity-20 px-4 py-2 text-xs font-medium tracking-wide text-neutral-100 sm:text-sm">
                    Simplifica tu vida y contribuye a tu comunidad.
                </p>
                {/* Form has been refactored for cleaner layout and better responsiveness */}
                <form action={formAction} className="space-y-4">
                    {state?.message && state?.status === "error" && (
                        <div
                            className="mb-2 w-full text-sm tracking-tight text-red-600 bg-red-100 border border-red-400 rounded px-3 py-2">
                            {state.message}
                        </div>
                    )}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <input
                            type="text"
                            id="cuentaFolio"
                            name="cuentaFolio"
                            placeholder="Introduce tu cuenta-folio"
                            aria-label="Cuenta-Folio"
                            className="w-full flex-grow rounded-lg transition-all duration-300 bg-white bg-opacity-80 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-90 sm:w-auto"
                            required
                        />
                        <SubmitBtn/>
                    </div>
                </form>
                <p className="text-xs text-white">
                    ¿No conoces tu Cuenta-Folio?
                    <Link
                        className="ml-1 text-amber-300 underline hover:text-amber-400"
                        href="/solicita"
                    >
                        Solicitalo Aqui
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}

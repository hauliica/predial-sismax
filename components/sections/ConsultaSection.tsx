"use client";

import Link from "next/link";
import {useFormState, useFormStatus} from "react-dom";
import {validateCuentaFolio} from "@/app/actions";
import {Button} from "@/components/ui/button";

function SubmitBtn() {
    const {pending} = useFormStatus();

    return (
        <Button type="submit" variant="secondary" size="lg" className="w-full py-6 sm:w-auto" disabled={pending}>
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
            className="flex w-full items-center justify-center overflow-x-hidden py-8"
        >
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
                            name="cuentaFolio"
                            placeholder="Introduce tu cuenta-folio"
                            className="w-full flex-grow rounded-md transition-all duration-300 bg-white bg-opacity-80 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-90 sm:w-auto"
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

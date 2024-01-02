"use client"

import {Button} from "@/components/ui/button";

export default function GlobalError({error, reset}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
        <body>
        <h2>Ocurrio un Error....</h2>
        <Button onClick={() => reset()}>Volver a Intentar</Button>
        </body>
        </html>
    )
}
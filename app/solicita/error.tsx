"use client"

import {useEffect} from "react";

export default function Error({
                                  error,
                                  reset
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <div>
            <h2>Algo salio mal...</h2>
            <button onClick={() => reset()}>Volver a Intentar</button>
        </div>
    )
}
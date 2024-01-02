'use client';

import {useEffect} from 'react';
import {Button} from "@/components/ui/button";

export default function Error({
                                  error,
                                  reset
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log errors to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Algo salio mal...</h2>
            <Button onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
            }>
                Volver a Intentar
            </Button>
        </div>
    )
}
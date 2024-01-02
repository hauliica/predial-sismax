import {useFormState} from "react-dom";
import React, {createContext, ReactNode, useContext, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import * as LabelPrimitive from "@radix-ui/react-label"
import {Slot} from "@radix-ui/react-slot";

const FormContext = createContext<{ state: any; formActionHook: any } | null>(null);
const FormFieldContext = createContext<{ name: string; error: string | null } | null>(null);

function formAction(previousState: any, formData: any) {
    // TODO: form submission logic
    return {...previousState, ...formData};
}

interface FormProps {
    children: ReactNode;
}

interface FormFieldProps {
    name: string;
    children: ReactNode;
}

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

interface FormLabelProps extends React.ComponentPropsWithoutRef <typeof LabelPrimitive.Root> {
    className?: string;
}

interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {
    className?: string
}

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    className?: string;
}

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
    className?: string;
}

const Form = ({children}: FormProps) => {
    const [state, formActionHook] = useFormState(formAction, {});

    return (
        <FormContext.Provider value={{state, formActionHook}}>
            <form action={formActionHook}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

const FormField = ({name, children}: FormFieldProps) => {
    const [error, setError] = useState<string | null>(null);

    // Validation or either logic to determine the error state can be added here

    return (
        <FormFieldContext.Provider value={{name, error}}>
            <div>
                {children}
            </div>
        </FormFieldContext.Provider>
    );
};

function useFormField() {
    const fieldContext = useContext(FormFieldContext);
    const formContext = useContext(FormContext);

    if (!fieldContext || !formContext) {
        throw new Error("useFormField must be used within a <FormField /> inside a <Form/>")
    }

    const id = useRef(`form-field-${Math.random().toString(36).substring(2, 9)}`).current;

    return {
        id,
        name: fieldContext.name,
        value: formContext.state[fieldContext.name] || "",
        error: fieldContext.error,
        setError: (error: string) => {
            // TODO: add logic to set the error state
        },
    };
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({className, ...props}, ref) => {
    return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});

FormItem.displayName = "FormItem";


const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
    ({className, ...props}, ref) => {
        const {id, error} = useFormField();

        return (
            <Label
                ref={ref}
                className={cn(error ? "text-destructive" : "", className)}
                htmlFor={id}
                {...props}
            />
        );
    }
)

FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, FormControlProps>(
    ({className, ...props}, ref) => {
        const {id} = useFormField();

        return <Slot ref={ref} id={id} className={className} {...props} />;
    }
)

FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
    ({className, children, ...props}, ref) => {
        const {id} = useFormField();

        return (
            <p
                ref={ref}
                id={`${id}-description`}
                className={cn("text-[0.8rem] text-muted-foreground", className)}
                {...props}
            >
                {children}
            </p>
        );
    }
)

FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
    ({className, children, ...props}, ref) => {
        const {id, error} = useFormField();
        const message = error ? error : children;

        return (
            <p
                ref={ref}
                id={`${id}-message`}
                className={cn("text-[0.8rem] font-medium", error ? "text-destructive" : "", className)}
                {...props}
            >
                {children}
            </p>
        )
    }
)

FormMessage.displayName = "FormMessage";

export {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
};
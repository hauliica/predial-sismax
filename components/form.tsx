import React, {useCallback, useState, createContext, useContext} from "react";
import * as zod from 'zod';

const FormContext = createContext(undefined);

const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }

    return context;
}

const FormProvider = ({children, initialData = {}, schema, onSubmit}) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Custom Validation
    const validateField = (name, value) => {
        // TODO: Validation
    }

    // Reset form to initial state
    const resetForm = useCallback(() => {
        setFormData(initialData);
        setErrors({})
    }, [initialData])

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            Object.entries(formData).forEach(([key, value]) => validateField(key, value));
            schema.parse(formData);
            setErrors({});

            await onSubmit(formData);
            resetForm();
        } catch (error) {
            if (error instanceof zod.ZodError) {
                setErrors(error.errors.reduce((acc, val) => {
                    acc[val.path[0]] = val.message;
                    return acc;
                }, {}));
            }
            // Handle other errors
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormContext.Provider value={{formData, setFormData, errors, setErrors, isSubmitting}}>
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

// Set display name for dev tools
FormProvider.displayName = "FormProvider";

// Field Component
const FormField = ({name, children}) => {
    const {formData, setFormData, errors} = useFormContext();

    const handleChange = (event) => {
        const {value} = event.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    return React.cloneElement(children, {
        onChange: handleChange,
        value: formData[name] || '',
        error: errors[name],
    });
};

FormField.displayName = "FormField";

const FormInput = React.forwardRef(({error, ...props}, ref) => (
    <div>
        <input ref={ref} aria-invalid={!!error} {...props} />
        {error && <span role="alert">{error}</span>}
    </div>
));

FormInput.displayName = "FormInput";

const FormLabel = React.forwardRef(({htmlFor, ...props}, ref) => (
    <label ref={ref} htmlFor={htmlFor} {...props} />
));

FormLabel.displayName = "FormLabel";

export {FormProvider, FormField, FormInput, FormLabel}
import React from "react";
import FormContext, { FormErrorKeys, FormErrors, FormSetter, FormValues } from "./FormContext";
import useAnimatedContainerContext from "../../layouts/AnimatedContainer/useAnimatedContainerContext";
import { AxiosError } from "axios";
import { AuthReject } from "devflikrauth";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    submit?: (values: FormValues, setErrors: FormSetter<FormErrors>, parseError: ErrorParser) => Promise<void> | void;
}

export type ErrorParser = (error: unknown) => void;

function Form({ action, submit, onSubmit, ...props }: FormProps) {

    const [values, setValue] = React.useState<FormValues>({});
    const [errors, setError] = React.useState<FormErrors>({});

    const { transiting: disabled, setTransiting: setDisabled } = useAnimatedContainerContext();

    function setValues(key: keyof FormValues, value: string) {
        setValue((val) => ({ ...val, [key]: value }));
    }

    function setErrors(key: keyof FormErrors, value: string) {
        setError((err) => ({ ...err, [key]: value }));
    }

    interface ParsableError extends AxiosError<AuthReject> {
        data?: AuthReject;
    }

    function parseError(error: unknown) {
        const xError = error as ParsableError;

        const { type, message } = xError.response?.data || xError.data || {};
        let target = type?.split("/")?.[1];
        target = target && FormErrorKeys.includes(target) ? target : "default";

        setErrors(target as keyof FormErrors, String(message));

        // console.warn(error);

    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        if (onSubmit) return onSubmit(e);

        e.preventDefault();

        setError({});

        if (submit) {
            try {

                setDisabled(true);
                await submit(values, setErrors, parseError);
            } catch (error) {
                console.error(error);
            } finally {
                setDisabled(false);
            }
        }
    }


    // React.useEffect(() => {
    //     console.log(...Object.entries(errors).map(item => (`${item[0]}: ${item[1]}`)));
    //     console.log(...Object.entries(values).map(item => (`${item[0]}: ${item[1]}`)));
    // }, [errors, values]);


    return (
        <FormContext.Provider value={{ values, setValues, errors, setErrors, disabled }}>
            <form onSubmit={handleSubmit} {...{ action }} {...props} />
        </FormContext.Provider>
    );
}

export default Form;
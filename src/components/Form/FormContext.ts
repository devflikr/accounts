import React from "react";

export type FormSetter<T> = (key: keyof T, value: string) => void;

export type FormContextValue = {
    values: FormValues;
    errors: FormErrors;
    setValues: FormSetter<FormValues>;
    setErrors: FormSetter<FormErrors>;
    disabled: boolean;
};

export type FormValues = {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    confirm?: string;
    username?: string;
    phone?: string;
};

export type FormErrors = FormValues & {
    default?: string;
};

export const FormErrorKeys = ["firstname", "lastname", "username", "email", "password", "confirm"];

const FormContext = React.createContext<FormContextValue>({
    values: {},
    errors: {},
    setValues: () => { },
    setErrors: () => { },
    disabled: true,
});

export default FormContext;


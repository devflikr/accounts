import React from "react";
import FormContext, { FormContextValue } from "./FormContext";

export default function useFormContext(): FormContextValue {
    const context = React.useContext(FormContext);
    if (!context) throw new Error("Unable to access Form Context API.");
    return context;
}
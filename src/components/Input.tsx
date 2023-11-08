import React from 'react';
import Content from './Content';
import uuid from '../core/utils/uuid';
import { twMerge } from 'tailwind-merge';
import useFormContext from './Form/useFormContext';
import { FormValues } from './Form/FormContext';
import classNames from 'classnames';
import ErrorBox from './ErrorBox';
import { useEffectOnce, useUpdateEffect } from 'react-unique-hooks';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    noSpaces?: boolean;
}

function Input({ id, name, label, placeholder, onChange, noSpaces, defaultValue, ...props }: InputProps) {
    const uid = (id || name || uuid()) as keyof FormValues;

    const [value, setValue] = React.useState<string>((defaultValue as string) || "");

    const { setValues, errors, disabled } = useFormContext();

    useUpdateEffect(() => {
        setValue(defaultValue as string || "");
        setValues(uid, defaultValue as string || "");
    }, [defaultValue]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = (noSpaces && (e.target.value === " ")) ? "" : e.target.value;
        setValue(value);
        setValues(uid, value);
        onChange?.(e);
    }

    useEffectOnce(() => {
        setValues(uid, value);
    });

    return (
        <Content className="[.flexbox-parent>&]:px-0 w-full my-2 sm:my-5">
            <fieldset className="relative w-full flex flex-col-reverse gap-2" disabled={disabled}>
                <input onChange={handleChange} value={value} className={twMerge(classNames(
                    "px-2 py-2 bg-white flex-1 outline-none rounded  min-w-[0] w-full transition-all duration-150 shadow-[0_0_4px_2px_#0001] peer",
                    "border-0 border-b-[3px] border-b-transparent focus-visible:border-b-blue-700 focus-visible:rounded-none",
                    {
                        "border-b-red-600 focus-visible:border-b-red-600": errors[uid],
                    },
                ))} {...{ id: uid, name: uid }} {...props} placeholder={placeholder || ""} />
                <label htmlFor={uid} className={twMerge(classNames(
                    "text-sm line-clamp-1 max-w-[calc(100%_-_calc(2_*_2_*_4px))] font-semibold transition-all duration-150",
                    "text-gray-500 peer-focus-visible:text-blue-700",
                    {
                        "text-red-600 peer-focus-visible:text-red-600": errors[uid],
                    }
                ))}>{label}</label>
            </fieldset>
            <ErrorBox name={uid} />
        </Content>
    )
}

export default Input;
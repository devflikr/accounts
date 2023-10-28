import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import useFormContext from './Form/useFormContext';
import useSafeNavigate from '../hooks/useSafeNavigate';


const buttonVariants = cva("px-5 py-2 rounded-md border border-transparent transition-all font-semibold", {
    variants: {
        as: {
            button: "bg-white hover:bg-blue-100 focus-visible:bg-blue-100 text-blue-500",
            submit: "bg-blue-500 hover:bg-blue-700 focus-visible:bg-blue-700 text-white",
            reset: "bg-white border-gray-300 hover:bg-gray-200 text-gray-700",
        },
        display: {
            block: "block w-3/4 mx-auto",
            inline: "inline-block",
        },
    },
    defaultVariants: {
        as: "button",
        display: "inline",
    },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    to?: string;
    replace?: boolean;
}

function Button({ as, type, to, replace, onClick, display, disabled: defaultDisabled, ...props }: ButtonProps) {

    const navigate = useSafeNavigate();

    const { disabled } = useFormContext();

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onClick && onClick(e);
        to && navigate(to, { replace });
    }

    return (
        <button className={twMerge(clsx(buttonVariants({ as, display })))} onClick={handleClick} type={as || type || "button"} disabled={disabled || defaultDisabled} {...props} />
    )
}

export default Button;
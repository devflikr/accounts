import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const typographyVariants = cva("", {
    variants: {
        element: {
            h1: "font-bold text-3xl",
            h2: "font-bold text-2xl",
            h3: "font-bold text-xl",
            h4: "font-semibold text-lg",
            h5: "font-semibold text-base",
            h6: "font-medium text-sm",
            p: "font-medium text-base",
        },
        align: {
            left: "text-left",
            right: "text-right",
            center: "text-center",
            justify: "text-justify",
            start: "text-start",
            end: "text-end",
        },
        weight: {
            black: "font-black",
            extrabold: "font-extrabold",
            bold: "font-bold",
            semibold: "font-semibold",
            medium: "font-medium",
            normal: "font-normal font",
            extralight: "font-extralight",
            light: "font-light",
            thin: "font-thin",
        },
        size: {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
            lg: " text-lg",
            xl: " text-xl",
            "2xl": " text-2xl",
            "3xl": " text-3xl",
            "4xl": " text-4xl",
            "5xl": " text-5xl",
            "6xl": " text-6xl",
            "7xl": " text-7xl",
            "8xl": " text-8xl",
            "9xl": " text-9xl",
        },
    },
    defaultVariants: {
        element: "p",
        align: "center",
    }
});

export type TypographyProps = React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof typographyVariants>;

function Typography({ className, element, align, weight, size, ...props }: TypographyProps) {
    return (
        <p className={twMerge(clsx(typographyVariants({ className, element, align, weight, size })))} {...props} />
    );
}

export default Typography;
import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Content from './Content';
import classNames from 'classnames';


const flexBoxVariants = cva("px-5", {
    variants: {
        flow: {
            row: "flex-row",
            col: " flex-col",
            "row-rev": "flex-row-reverse",
            "col-rev": " flex-col-reverse",
        },
        align: {
            end: "items-end",
            start: "items-start",
            center: "items-center",
            stretch: "items-stretch",
            baseline: "items-baseline",
        },
        justify: {
            end: "justify-end",
            start: "justify-start",
            normal: "justify-normal",
            around: "justify-around",
            center: "justify-center",
            evenly: "justify-evenly",
            between: "justify-between",
            stretch: "justify-stretch",
        },
        display: {
            flex: "w-full flex",
            block: "w-full block",
            inline: "inline-block",
            "inline-flex": "inline-flex",
        },
        gap: {
            "0": "gap-0",
            "1": "gap-1",
            "2": "gap-2",
            "3": "gap-3",
            "4": "gap-4",
            "5": "gap-5",
            "6": "gap-6",
            "7": "gap-7",
            "8": "gap-8",
            "9": "gap-9",
        }
    },
    defaultVariants: {
        display: "flex",
        flow: "row",
        align: "center",
    },
});

export interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof flexBoxVariants> {

}

function FlexBox({ flow, align, justify, gap, ...props }: FlexBoxProps) {
    return (
        <Content className={classNames("flexbox-parent", twMerge(clsx(flexBoxVariants({ flow, align, justify, gap }))))} {...props} />
    )
}

export default FlexBox;
import React from 'react';
import { twMerge } from 'tailwind-merge';

function Content({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={twMerge("px-5 sm:px-10 my-5", className)} {...props} />
    )
}

export default Content;
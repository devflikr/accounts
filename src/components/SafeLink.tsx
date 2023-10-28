import { Link, LinkProps } from "react-router-dom";
import useSafeSearchParams from "../hooks/useSafeSearchParams";
import { twMerge } from "tailwind-merge";


function SafeLink({ to, className, ...props }: LinkProps) {

    const searchParams = useSafeSearchParams();

    return (
        <Link to={to + searchParams.toString()} className={twMerge("py-1 px-2", className)} {...props} />
    )
}

export default SafeLink;
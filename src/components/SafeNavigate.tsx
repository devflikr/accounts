import { Navigate, NavigateProps } from "react-router-dom";
import useSafeSearchParams from "../hooks/useSafeSearchParams";


function SafeNavigate({ to, ...props }: NavigateProps) {

    const { toString } = useSafeSearchParams();

    return (
        <Navigate to={toString(to)} {...props} />
    )
}

export default SafeNavigate;
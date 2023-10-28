import { NavigateOptions, To, useNavigate } from "react-router-dom";
import useSafeSearchParams from "./useSafeSearchParams";

function useSafeNavigate() {

    const { toString } = useSafeSearchParams();

    const navigate = useNavigate();

    return function (to: To, options?: NavigateOptions) {
        return navigate(toString(to), options);
    };
}

export default useSafeNavigate;
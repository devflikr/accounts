import { useEffect, useState } from "react";
import { To, useSearchParams } from "react-router-dom";
import uuid from "../core/utils/uuid";

function useSafeSearchParams() {

    const [searchParams] = useSearchParams();

    const [app, setApp] = useState<string>(decodeURIComponent(searchParams.get("app") || encodeURIComponent("DevFlikr.com")));
    const [redirect, setRedirect] = useState<string>(decodeURIComponent(searchParams.get("redirect") || encodeURIComponent(`${import.meta.env.VITE_HOME_ROUTE || "https://devflikr.com"}`)));
    const [token, setToken] = useState<string>(decodeURIComponent(searchParams.get("token") || encodeURIComponent(uuid())));
    const [useAuth, setUseAuth] = useState<number>(parseInt(searchParams.get("useAuth") || "-1"));

    function toString(to?: To) {
        let searchString = `?app=${encodeURIComponent(app as string)}&redirect=${encodeURIComponent(redirect as string)}&token=${encodeURIComponent(token)}`;
        if (to) {
            if (to.toString().includes("?")) searchString = "&" + searchString.slice(1);
            searchString = to + searchString;
        }
        if (useAuth !== -1 && !Number.isNaN(useAuth)) searchString += `&useAuth=${useAuth}`;
        return searchString;
    }

    useEffect(() => {
        setApp(decodeURIComponent(searchParams.get("app") || encodeURIComponent("DevFlikr.com")));
        setRedirect(decodeURIComponent(searchParams.get("redirect") || encodeURIComponent(`${import.meta.env.VITE_HOME_ROUTE || "https://devflikr.com"}`)));
        setToken(decodeURIComponent(searchParams.get("token") || encodeURIComponent(uuid())));
        setUseAuth(parseInt(searchParams.get("useAuth") || "-1"));
    }, [searchParams]);

    return { app, redirect, location, useAuth, toString };
}

export default useSafeSearchParams;
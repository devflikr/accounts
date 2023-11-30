import React from 'react';
import useSafeSearchParams from '../../hooks/useSafeSearchParams';
import Typography from '../../components/Typography';
import { useDocumentTitle } from 'react-unique-hooks';

function RedirectPage() {
    useDocumentTitle("Redirecting");
    const { redirect, callback, useAuth } = useSafeSearchParams();

    React.useEffect(() => {
        console.log(redirect);
        if (callback && window.opener) {
            const cb = (window.opener as unknown as { [key: string]: unknown })[callback];
            if (cb && typeof cb === 'function') {
                cb();
                window.close();
            }
        }
        if (redirect) window.location.replace(`${redirect}${redirect.includes("?") ? "&" : "?"}auth=${useAuth || 0}`);
    }, [callback, redirect, useAuth]);

    return <Typography>Redirecting...</Typography>;
}

export default RedirectPage;
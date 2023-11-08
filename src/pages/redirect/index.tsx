import React from 'react';
import useSafeSearchParams from '../../hooks/useSafeSearchParams';
import Typography from '../../components/Typography';
import { useDocumentTitle } from 'react-unique-hooks';

function RedirectPage() {
    useDocumentTitle("Redirecting");
    const { redirect, useAuth } = useSafeSearchParams();

    React.useEffect(() => {
        console.log(redirect);
        if (redirect) window.location.replace(`${redirect}${redirect.includes("?") ? "&" : "?"}auth=${useAuth || 0}`);
    }, [redirect, useAuth]);

    return <Typography>Redirecting...</Typography>;
}

export default RedirectPage;
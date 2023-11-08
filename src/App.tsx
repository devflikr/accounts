import FlexSpacer from "./layouts/FlexSpacer";
import AnimatedContainer from "./layouts/AnimatedContainer";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import AnimatedContent from "./layouts/AnimatedContent";
import LoginPage from "./pages/login/index";
import React from "react";
import SignupPage from "./pages/signup";
import SafeNavigate from "./components/SafeNavigate";
import AuthChooserPage from "./pages/authchooser";
import useSafeSearchParams from "./hooks/useSafeSearchParams";
import SignupUserAuthPage from "./pages/signup/userauth";
import SignupUserContactPage from "./pages/signup/usercontact";
import SignupFinalizePage from "./pages/signup/finalize";
import RedirectPage from "./pages/redirect";
import { setCurrentAuthIndex } from "devflikrauth";
import { useAuthCurrentUser, useAuthUsers } from "react-devflikrauth-hooks";
import { LazyImage } from "neatkit/components";
import RecoverPage from "./pages/recover";

function App() {

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const [, loading] = useAuthCurrentUser(parseInt(searchParams.get("useAuth") || "") || -1);

    const { useAuth } = useSafeSearchParams();

    React.useEffect(() => {
        if (!loading && useAuth > -1 && !Number.isNaN(useAuth)) setCurrentAuthIndex(useAuth);
    }, [loading, useAuth]);

    return (
        <>
            <LazyImage
                thumbnail="/assets/bg-5.jpg"
                style={{ position: "fixed", inset: "0" }}
                // src="/assets/bg.jpg"
                overlayStyle={{ display: "none" }}
                // imageStyle={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <div className="fixed inset-0 min-h-[100dvh] bg-[#000a] backdrop-blur-lg"></div>
            <FlexSpacer />
            <div className="flex flex-nowrap justify-center items-center p-3">
                <AnimatedContainer>
                    {/* <AnimatePresence mode="wait" initial={false}> */}
                    {!loading && <Routes location={location} key={location.key}>
                        <Route path="/signup" element={<AnimatedContent element={<SignupPage />} />} />
                        <Route path="/signup/userauth" element={<AnimatedContent element={<SignupUserAuthPage />} />} />
                        <Route path="/signup/uci" element={<AnimatedContent element={<SignupUserContactPage />} />} />
                        <Route path="/signup/finalize" element={<AnimatedContent element={<SignupFinalizePage />} />} />
                        <Route path="/signin" element={<AnimatedContent element={<LoginPage />} />} />
                        <Route path="/authchooser" element={<AnimatedContent element={<AuthChooserPage />} />} />
                        <Route path="/recover" element={<AnimatedContent element={<RecoverPage />} />} />
                        <Route path="/redirect" element={<AnimatedContent element={<RedirectPage />} />} />
                        <Route path="/" element={<AnimatedContent element={<NoAuthRedirect />} />} />
                    </Routes>}
                    {/* </AnimatePresence> */}
                </AnimatedContainer>
            </div>
            <FlexSpacer />
        </>
    );
}

export default App;

function NoAuthRedirect() {
    const [users] = useAuthUsers();
    const path = users.length ? "/authchooser" : "/signin";
    return <SafeNavigate to={path} replace />;
}

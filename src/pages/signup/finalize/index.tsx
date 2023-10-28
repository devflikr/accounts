import Button from "../../../components/Button";
import Content from "../../../components/Content";
import FlexBox from "../../../components/FlexBox";
import Form from "../../../components/Form";
import SafeNavigate from "../../../components/SafeNavigate";
import Typography from "../../../components/Typography";
import UserBanner from "../UserBanner";
import { useAuthCurrentUser } from "react-devflikrauth-hooks";

function SignupFinalizePage() {

    const [user] = useAuthCurrentUser();

    if (!user) return <SafeNavigate to="/" replace />

    return (
        <Form>
            <Content className="flex flex-nowrap justify-center">
                <img src="/banner.png" alt="DevFlikr" className="max-w-[100px] w-full " />
            </Content>
            <Content>
                <UserBanner />
                <Typography weight="medium" size="lg">You are all setup</Typography>
            </Content>

            <Content><Typography align="left">We're thrilled to have you join our community of like-minded individuals looking to connect, learn, and grow together.</Typography></Content>
            <Content><Typography align="left">To get started, please take a moment to create your profile. This will help us tailor your experience and ensure you receive the most relevant content and connections.</Typography></Content>
            <Content><Typography align="left"></Typography>Rest assured, your information is safe with us. We take privacy seriously and will never share your data without your consent. For more details, please review our <a href={`${import.meta.env.VITE_HOME_ROUTE || "https://devflikr.com"}/about/privacy?auth=${user.index}`} target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</Content>
            <Content><Typography align="left"></Typography>Visit our <a href={`${import.meta.env.VITE_SUPPORT_ROUTE || "https://support.devflikr.com"}?auth=${user.index}`} target="_blank" rel="noopener noreferrer">Help Center</a> for answers to frequently asked questions or reach out to our support team at <a href="mailto:support@devflikr.com">support@devflikr.com</a>.</Content>

            <FlexBox justify="between" gap="9">
                <Button as="reset" display="block" to={`/redirect?redirect=${encodeURIComponent(import.meta.env.VITE_MYACCOUNT_ROUTE || "https://myaccount.devflikr.com")}`}>Your Account</Button>
                <Button as="submit" display="block" to="/redirect">Continue</Button>
            </FlexBox>
        </Form>
    )
}

export default SignupFinalizePage;
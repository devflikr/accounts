import { sendNewPassword } from "devflikrauth";
import Button from "../../components/Button";
import Content from "../../components/Content";
import FlexBox from "../../components/FlexBox";
import Form from "../../components/Form";
import Input from "../../components/Input";
import SafeLink from "../../components/SafeLink";
import Tagline from "../../components/Tagline";
import Typography from "../../components/Typography";
import { useState } from "react";
import RecoverSuccess from "./Recover";
import { useDocumentTitle } from "react-unique-hooks";

function RecoverPage() {
    useDocumentTitle("Reset Password");
    const [success, setSuccess] = useState(false);
    return (
        <Form submit={async (values, setErrors, parseError) => {
            try {
                if (!values.email) return setErrors("email", "Email address is required");

                await sendNewPassword(values.email);

                setSuccess(true);
            } catch (error) { parseError(error); }
        }}>
            <Content className="flex flex-nowrap justify-center">
                <img src="/banner.png" alt="DevFlikr" className="max-w-[100px] w-full " />
            </Content>
            <Content>
                <Typography element="h2">Reset your Password</Typography>
                <Tagline>with your account to continue</Tagline>
            </Content>
            {success ? <>
                <RecoverSuccess />
                <Content><Typography align="left" size="sm" className="text-gray-600">An email containing your new password has been dispatched.If you haven't received it, please click here to <SafeLink to={"/recover"} className="p-0" onClick={(e) => {
                    e.preventDefault();
                    setSuccess(false);
                }}>try again</SafeLink>.</Typography></Content>
                <Content><Typography align="left" size="sm" className="text-gray-600">Remember to update your password after logging in.</Typography></Content>
                <Content><Typography align="left" size="sm" className="text-gray-600">Please allow some time for the email to arrive. Kindly wait for 10 - 15 minutes before attempting to resend it.</Typography></Content>
            </> : <>
                <Input name="email" type="email" autoComplete="email" label="Email address" autoFocus={true} noSpaces />
                <Content>
                    <Typography align="left" size="sm" className="text-gray-600">You will receive an email with your new password, which you can use to access your account. We strongly recommend updating your password after logging in to enhance the security of your account.</Typography>
                </Content>
                <FlexBox justify="between">
                    <Button as="submit" display="block">Send new password</Button>
                </FlexBox>
            </>}
            <Content>
                <Typography><SafeLink to="/signin">Back to Login</SafeLink></Typography>
            </Content>
        </Form>
    )
}

export default RecoverPage;
import Button from "../../components/Button";
import Content from "../../components/Content";
import ErrorBox from "../../components/ErrorBox";
import FlexBox from "../../components/FlexBox";
import Form from "../../components/Form";
import Input from "../../components/Input";
import SafeLink from "../../components/SafeLink";
import Tagline from "../../components/Tagline";
import Typography from "../../components/Typography";
import useSafeNavigate from "../../hooks/useSafeNavigate";
import { createUserWithEmailAndPassword, updateUserProfile } from "devflikrauth";

function SignupPage() {
    const navigate = useSafeNavigate();
    return (
        <Form submit={async (values, setErrors, parseError) => {
            try {

                if (!values.firstname) return setErrors("firstname", "First name is required");

                if (!values.username) return setErrors("username", "Email is required");
                if (!values.password) return setErrors("password", "Password is required");

                if (values.password !== values.confirm) return setErrors("confirm", "Password doesn't match");

                const data = await createUserWithEmailAndPassword(values.username, values.password);

                if (data) {
                    await updateUserProfile(data, {
                        firstname: values.firstname,
                        lastname: values.lastname || null,
                    });
                    navigate((`/signup/userauth?useAuth=${data.index}`));
                }

            } catch (error) { parseError(error); }
        }}>
            <Content className="flex flex-nowrap justify-center">
                <img src="/banner.png" alt="DevFlikr" className="max-w-[100px] w-full " />
            </Content>
            <Content>
                <Typography element="h2">Signup</Typography>
                <Tagline>to create a new account</Tagline>
            </Content>

            <FlexBox gap="5" align="start">
                <Input name="firstname" autoComplete="given-name" label="First name" autoFocus noSpaces required />
                <Input name="lastname" autoComplete="family-name" label="Last name (optional)" noSpaces />
            </FlexBox>

            <Input name="username" type="email" autoComplete="email" label="Email address" noSpaces required />
            <FlexBox gap="5" align="start">
                <Input name="password" type="password" autoComplete="new-password" label="New password" required />
                <Input name="confirm" type="password" autoComplete="new-password" label="Confirm password" required />
            </FlexBox>
            <Typography><ErrorBox name="default" /></Typography>
            <FlexBox justify="between">
                <Button as="submit" display="block">Create Account</Button>
            </FlexBox>
            <Content>
                <Typography>Already have an account? <SafeLink to="/signin">Login instead</SafeLink></Typography>
            </Content>
        </Form>
    )
}

export default SignupPage;
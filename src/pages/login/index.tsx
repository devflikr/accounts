import { loginUserWithUsernameAndPassword } from "devflikrauth";
import Button from "../../components/Button";
import Content from "../../components/Content";
import FlexBox from "../../components/FlexBox";
import Form from "../../components/Form";
import Input from "../../components/Input";
import SafeLink from "../../components/SafeLink";
import Tagline from "../../components/Tagline";
import Typography from "../../components/Typography";
import useSafeNavigate from "../../hooks/useSafeNavigate";

function LoginPage() {
    const navigate = useSafeNavigate();
    return (
        <Form submit={async (values, setErrors, parseError) => {
            try {
                if (!values.username) return setErrors("username", "Username is required");
                if (!values.password) return setErrors("password", "Password is required");

                const data = await loginUserWithUsernameAndPassword(values.username, values.password);

                if (data) navigate((`/redirect?useAuth=${data.index}`));
            } catch (error) { parseError(error); }
        }}>
            <Content className="flex flex-nowrap justify-center">
                <img src="/banner.png" alt="DevFlikr" className="max-w-[100px] w-full " />
            </Content>
            <Content>
                <Typography element="h2">Signin</Typography>
                <Tagline>with your account to continue</Tagline>
            </Content>
            <Input name="username" type="text" autoComplete="username" label="Username or Email" autoFocus={true} noSpaces />
            <Input name="password" type="password" autoComplete="current-password" label="Password" />
            <FlexBox flow="row-rev">
                <SafeLink to="/recover">Forgot password?</SafeLink>
            </FlexBox>
            <FlexBox justify="between">
                <Button as="submit" display="block">Sign in</Button>
            </FlexBox>
            <Content>
                <Typography>Don't have an account? <SafeLink to="/signup">Create one</SafeLink></Typography>
            </Content>
        </Form>
    )
}

export default LoginPage;
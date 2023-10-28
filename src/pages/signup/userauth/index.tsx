import Button from "../../../components/Button";
import Content from "../../../components/Content";
import ErrorBox from "../../../components/ErrorBox";
import FlexBox from "../../../components/FlexBox";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import SafeNavigate from "../../../components/SafeNavigate";
import Typography from "../../../components/Typography";
import useSafeNavigate from "../../../hooks/useSafeNavigate";
import { useAuthCurrentUser } from "react-devflikrauth-hooks";
import { updateUserUsername } from "devflikrauth";
import UserBanner from "../UserBanner";

function SignupUserAuthPage() {
    const navigate = useSafeNavigate();

    const [user] = useAuthCurrentUser();

    if (!user) return <SafeNavigate to="/" replace />
    return (
        <Form submit={async (values, setErrors, parseError) => {
            try {

                if (!values.username) return setErrors("firstname", "Username is required");

                if (values.username !== user.username) {
                    await updateUserUsername(user, values.username);
                }

                navigate("/signup/uci");

            } catch (error) { parseError(error); }
        }}>
            <Content className="flex flex-nowrap justify-center">
                <img src="/banner.png" alt="DevFlikr" className="max-w-[100px] w-full " />
            </Content>
            <Content>
                <UserBanner />
                <Typography weight="medium" size="lg">Choose a new Username</Typography>
            </Content>

            <Input name="username" autoComplete="username" label="Username" noSpaces required autoFocus defaultValue={user.username} />
            <Content>
                <Typography align="left" size="sm" className="text-gray-600">We've generated a temporary username for you. Feel free to modify it or retain it as is.</Typography>
            </Content>
            <Typography><ErrorBox name="default" /></Typography>
            <FlexBox justify="between">
                <Button as="submit" display="block">Next</Button>
            </FlexBox>
            <Content>
                <Typography align="left" size="sm" className="text-gray-600">Your username can serve as an alternative for logging in when accessing your account. You have the flexibility to update it at your convenience.</Typography>
            </Content>
        </Form>
    )
}

export default SignupUserAuthPage;
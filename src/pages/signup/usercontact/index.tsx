import Button from "../../../components/Button";
import Content from "../../../components/Content";
import ErrorBox from "../../../components/ErrorBox";
import FlexBox from "../../../components/FlexBox";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import SafeNavigate from "../../../components/SafeNavigate";
import Typography from "../../../components/Typography";
import { updateUserProfile } from "devflikrauth";
import useSafeNavigate from "../../../hooks/useSafeNavigate";
import { useAuthCurrentUser } from "react-devflikrauth-hooks";
import UserBanner from "../UserBanner";
import { useDocumentTitle } from "react-unique-hooks";

function SignupUserContactPage() {
    useDocumentTitle("Contacts");
    const navigate = useSafeNavigate();

    const [user] = useAuthCurrentUser();

    if (!user) return <SafeNavigate to="/" replace />
    return (
        <Form submit={async (values, setErrors, parseError) => {
            try {

                if (!values.phone) return setErrors("firstname", "Username is required");

                if (values.username !== user.phone) {
                    await updateUserProfile(user, {
                        phone: values.phone,
                    });
                }

                navigate("/signup/finalize");

            } catch (error) { parseError(error); }
        }}>
            <Content className="flex flex-nowrap justify-center">
                <img src="/banner.png" alt="DevFlikr" className="max-w-[100px] w-full " />
            </Content>
            <Content>
                <UserBanner />
                <Typography weight="medium" size="lg">Update your Contact Information</Typography>
            </Content>

            <Input name="phone" type="number" autoComplete="tel" label="Whatsapp number" noSpaces required autoFocus defaultValue={user.phone} />
            <Content>
                <Typography align="left" size="sm" className="text-gray-600">This information is utilized to help you regain access to your account in the event that you forget your password.</Typography>
            </Content>
            <Typography><ErrorBox name="default" /></Typography>
            <FlexBox justify="between" gap="9">
                <Button as="reset" display="block" to="/signup/finalize">Skip</Button>
                <Button as="submit" display="block">Next</Button>
            </FlexBox>
            <Content>
                <Typography align="left" size="sm" className="text-gray-600">At the moment we only support Whatsapp verification. You can adjust your preferences at any time within your MyAccount page.</Typography>
            </Content>
        </Form>
    )
}

export default SignupUserContactPage;
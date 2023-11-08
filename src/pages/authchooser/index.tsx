import Content from '../../components/Content';
import Typography from '../../components/Typography';
import Tagline from '../../components/Tagline';
import UserAccounts from './UserAccounts';
import { useAuthUsers } from "react-devflikrauth-hooks";
import SafeNavigate from '../../components/SafeNavigate';
import { useDocumentTitle } from 'react-unique-hooks';

function AuthChooserPage() {
    useDocumentTitle("Select Account");
    const [users] = useAuthUsers();

    if (!users.length) return <SafeNavigate to="/signin" replace />

    return (
        <>
            <Content className="flex flex-nowrap justify-center">
                <img src="/banner.png" alt="DevFlikr" className="max-w-[100px] w-full " />
            </Content>
            <Content>
                <Typography element="h2">Choose an Account</Typography>
                <Tagline>to continue</Tagline>
            </Content>
            <UserAccounts />
        </>
    )
}

export default AuthChooserPage;
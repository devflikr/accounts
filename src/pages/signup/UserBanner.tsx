import FlexBox from '../../components/FlexBox';
import Typography from '../../components/Typography';
import { useAuthCurrentUser } from "react-devflikrauth-hooks";

function UserBanner() {

    const [user] = useAuthCurrentUser();

    if (!user) return null;

    return (
        <FlexBox gap="3" justify="center" align="center">
            <img className="w-6 h-6 rounded-full" src={user.profile} alt={user.username} />
            <Typography element="h2">{`${user.firstname} ${user.lastname || ""}`.trim()}</Typography>
        </FlexBox>
    )
}

export default UserBanner;
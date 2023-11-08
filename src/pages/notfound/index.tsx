import Content from "../../components/Content";
import SafeLink from "../../components/SafeLink";
import Typography from "../../components/Typography";
import { useDocumentTitle } from "react-unique-hooks";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();
    useDocumentTitle("Page doesn't exist");
    return (
        <>
            <Content className="flex flex-nowrap justify-center">
                <img src="/banner.png" alt="DevFlikr" className="max-w-[100px] w-full " />
            </Content>
            <Content>
                <Typography element="h2">Page not found</Typography>
                <Typography>This page doesn't exists.</Typography>
            </Content>
            <Content>
                <img src="/assets/not-found.png" alt="Not found" className="w-full mx-auto max-w-xs" />
            </Content>
            <Content>
                <Typography><SafeLink to="/" onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}>Go back</SafeLink></Typography>
            </Content>
        </>
    )
}

export default NotFoundPage;
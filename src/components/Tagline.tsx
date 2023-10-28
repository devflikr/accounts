import Typography, { TypographyProps } from './Typography';
import useSafeSearchParams from '../hooks/useSafeSearchParams';

export type TaglineProps = TypographyProps;

function Tagline({ children, ...props }: TaglineProps) {
    const { app } = useSafeSearchParams();
    return (
        <Typography weight="medium" size="lg" {...props}>{(app) ? <>to continue to <span className="text-purple-500">{app}</span></> : children}</Typography>
    )
}

export default Tagline;
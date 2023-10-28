import { twMerge } from 'tailwind-merge';
import UpsGrayScale from '../assets/ups/ups-bb.png';

export type UserAvatarProps = {
    src?: string;
    alt?: string;
    size?: string | number;
    className?: string;
}
function UserAvatar({ src, alt, size, className }: UserAvatarProps) {
    return (
        <div className="flex justify-center">
            <img src={src || UpsGrayScale} alt={alt || "User profile to be"} className={twMerge(className, "rounded-full overflow-hidden object-cover")} width={size} height={size} />
        </div>
    )
}

export default UserAvatar;
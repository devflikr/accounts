// import React from 'react';
import { useAuthUsers } from "react-devflikrauth-hooks";
import Content from '../../components/Content';
import Typography from '../../components/Typography';
import useSafeSearchParams from '../../hooks/useSafeSearchParams';
import useSafeNavigate from '../../hooks/useSafeNavigate';

function UserAccounts() {

    const [users] = useAuthUsers();

    const { app } = useSafeSearchParams();

    return (
        <>
            <Content className="sm:px-0 my-10">
                <ul className="flex flex-col flex-nowrap w-full">
                    {users.map((user, index) => <Account
                        key={user.uid}
                        name={user.firstname + " " + (user.lastname || "")}
                        email={user.email}
                        profile={user.profile}
                        redirect="/redirect"
                        attach={`?useAuth=${index}`}
                    />)}
                    <Account
                        key="auth-chooser-add-account"
                        name="Use Another Account"
                        profile={"/assets/user-add.png"}
                        redirect="/signin"
                    />
                </ul>
            </Content>
            <Content>
                <Typography align="left" size="sm" weight="semibold" className="text-gray-600">
                    To continue, DevFlikr will share your name, email address and profile picture with <span className="text-blue-900">{app}</span>.
                    Before using this app, make sure it is a valid DevFlikr associated app.
                </Typography>
            </Content>
        </>
    )
}

export default UserAccounts;

export interface AccountProps {
    name?: string;
    email?: string;
    profile?: string;
    redirect: string;
    attach?: string;
}

function Account({ name, email, profile, redirect, attach }: AccountProps) {

    const navigate = useSafeNavigate();

    return (
        <li>
            <button type="button" className="w-full block px-2 sm:px-6 hover:bg-blue-50 focus-within:bg-blue-100 active:bg-blue-100 transition-all" onClick={() => navigate(redirect + (attach || ""))}>
                <span className="w-full flex flex-row flex-nowrap items-center gap-3 border-b border-b-gray-300 p-2 [li:last-of-type>button>&]:border-b-0">
                    <span className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                        <img className="rounded-full max-w-full max-h-full" src={profile || `http://localhost:8978/userprofile/${name}`} alt={name} />
                    </span>
                    <span className="block text-left leading-4">
                        <span className="block w-full line-clamp-1 font-bold text-gray-900">{name}</span>
                        <span className="block w-full line-clamp-1 text-sm font-semibold text-gray-600">{email}</span>
                    </span>
                </span>
            </button>
        </li>
    );
}
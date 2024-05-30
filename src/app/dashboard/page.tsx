import { SignOut } from '../components/sign-out';

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Hello Dashboard!</h1>
            <SignOut />
        </div>
    );
};
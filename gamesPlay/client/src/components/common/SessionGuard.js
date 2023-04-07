import { Navigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export const SessionGuard = ({
    children,
}) => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to='/catalog' />;
    }

    return (
        <>
            {children}
        </>
    );
};
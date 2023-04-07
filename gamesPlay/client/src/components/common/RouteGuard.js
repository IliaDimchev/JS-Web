import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export const RouteGuard = ({
    children,
}) => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace /> //replace will remove the page we got redirected from in the History API
    }

    return children ? children : <Outlet />
};

// export const RouteGuard = ({
//     children,
// }) => {
//     const { isAuthenticated } = useAuthContext();

//     if (!isAuthenticated) {
//         return <Navigate to='/login' />;
//     }

//     return (
//         <>
//             {children}
//         </>
//     );
// };
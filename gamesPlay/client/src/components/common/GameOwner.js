import { Navigate, Outlet, useParams } from "react-router-dom";

import { useGameContext } from "../../contexts/GameContext";
import { useAuthContext } from "../../contexts/AuthContext";

export const GameOwner = ({
    children,
}) => {
    const { gameId } = useParams();
    const { getGame } = useGameContext();
    const { userId } = useAuthContext();

    const currentGame = getGame(gameId);
    console.log(currentGame);
    console.log(gameId);

    if (currentGame && currentGame._ownerId !== userId) {
        return <Navigate to={`/catalog/${gameId}`} replace />
    };

    return children ? children : <Outlet />
};
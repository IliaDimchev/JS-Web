import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { gameServiceFactory } from './services/gameService';

import { Catalog } from "./components/Catalog/Catalog";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { GameDetails } from "./components/GameDetails/GameDetails";
import { Edit } from "./components/Edit/Edit";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Logout } from './components/Logout/Logout';
import { RouteGuard } from './components/common/RouteGuard';
import { SessionGuard } from './components/common/SessionGuard';


export const deletedGame = false;

function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [deletedGame, setDeletedGame] = useState({});
    const gameService = gameServiceFactory(); // Add acc /e

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, [deletedGame]);

    const onCreateGameSubmit = async (data) => {
        const newGame = await gameService.create(data);

        setGames(state => [...state, newGame]);

        navigate('/catalog');
    };

    const onGameEditSubmit = async (values) => {
        const result = await gameService.edit(values._id, values);

        setGames(state => state.map(x => x._id === values._id ? result : x));

        navigate(`/catalog/${values._id}`);
    };

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog' element={<Catalog games={games} />} />
                        <Route path='/catalog/:gameId' element={<GameDetails setDeletedGame={setDeletedGame} />} />

                        <Route element={<RouteGuard />}>
                            <Route path='/catalog/:gameId/edit' element={<Edit onGameEditSubmit={onGameEditSubmit} />} />
                        </Route>

                        <Route path='/create-game' element={
                            <RouteGuard>
                                <CreateGame onCreateGameSubmit={onCreateGameSubmit} />
                            </RouteGuard>
                        } />
                        <Route path='/login' element={
                            <SessionGuard>
                                <Login />
                            </SessionGuard>
                        } />
                        <Route path='/register' element={
                            <SessionGuard>
                                <Register />
                            </SessionGuard>
                        } />
                        <Route path='/logout' element={<Logout />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;

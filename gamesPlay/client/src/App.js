import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import { gameServiceFactory } from './services/gameService';
import { authServiceFactory } from './services/authService';

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

export const deletedGame = false;

function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useState({});
    const [deletedGame, setDeletedGame] = useState({});
    const gameService = gameServiceFactory(auth.accessToken);
    const authService = authServiceFactory(auth.accessToken);

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

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate('/catalog');
        } catch (error) {
            console.log(error);
        }
    }

    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            return;
        };

        try {
            const result = await authService.register(registerData);

            setAuth(result);

            navigate('/catalog');
        } catch (error) {
            console.log(error);
        }
    }

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };

    const onGameEditSubmit = async (values) => {
        const result = await gameService.edit(values._id, values);

        //TODO Change State!!!

        navigate(`/catalog/${values._id}`);
    };

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={context}>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/catalog' element={<Catalog games={games} />}></Route>
                        <Route path='/catalog/:gameId' element={<GameDetails setDeletedGame={setDeletedGame} />}></Route>
                        <Route path='/catalog/:gameId/edit' element={<Edit onGameEditSubmit={onGameEditSubmit} />}></Route>
                        <Route path='/create-game' element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/logout' element={<Logout />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthContext.Provider>
    );
}

export default App;

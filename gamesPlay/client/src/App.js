import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import * as gameService from './services/gameService';
import * as authService from './services/authService';

import { Catalog } from "./components/Catalog/Catalog";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { GameDetails } from "./components/GameDetails/GameDetails";
import { Edit } from "./components/Edit/Edit";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";


function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

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
        try {
            const result = await authService.register(values);

            setAuth(result);

            navigate('/catalog');
        } catch (error) {
            console.log(error);
        }
    }

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
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
                        <Route path='/catalog/:gameId' element={<GameDetails />}></Route>
                        <Route path='/create-game' element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthContext.Provider>
    );
}

export default App;

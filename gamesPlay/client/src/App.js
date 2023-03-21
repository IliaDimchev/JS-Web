import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as gameService from './services/gameService';

import { Catalog } from "./components/Catalog/Catalog";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";


function App() {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

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

    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/catalog' element={<Catalog games={games} />}></Route>
                    <Route path='/create-game' element={<CreateGame onCreateGameSubmit={onCreateGameSubmit}/>}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
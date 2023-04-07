import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

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

function App() {

    return (
        <AuthProvider>
            <GameProvider>
                <div id="box">
                    <Header />

                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/catalog' element={<Catalog />} />
                            <Route path='/catalog/:gameId' element={<GameDetails />} />

                            <Route element={<RouteGuard />}>
                                <Route path='/catalog/:gameId/edit' element={<Edit />} />
                            </Route>

                            <Route path='/create-game' element={
                                <RouteGuard>
                                    <CreateGame />
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
            </GameProvider>
        </AuthProvider>
    );
}

export default App;

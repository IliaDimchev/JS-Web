import { useEffect } from 'react';

import * as userService from './services/userService';

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import './App.css';
import { UserList } from "./components/UserList";

function App() {
  useEffect(() =>{
    // async function getUsers () {
    //   const users = await userService.getAll();
    // }

    // getUsers();

    userService.getAll()
      .then(users => {
        console.log(users);
      })
      .catch(err => {
        console.log('Error' + err);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />

          <UserList />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Search } from "./components/Search";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

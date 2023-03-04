import Header from './/components/Header';
import Description from './components/Description';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Schedule from './components/Schedule';
import Speakers from './components/Speakers';
import Tickets from './components/Tickets';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Header />
      <div className="container">
        <Description />

        <Speakers />
      </div>

      <Tickets />

      <Schedule />

      <Footer />
      </div>
      );
}

      export default App;

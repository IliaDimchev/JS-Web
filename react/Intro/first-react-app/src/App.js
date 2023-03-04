import EventInfo from './components/EventInfo';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Speakers from './components/Speakers';
import Tickets from './components/Tickets';
import Footer from './components/Footer';
import Schedule from './components/Schedule';

function App() {
  return (
    <div>
      <Navigation />

      <Header />

      <div className="container">
        <EventInfo />

        <Speakers />
      </div>

      <Tickets />

      <Schedule />

      <Footer />
    </div>
  );
}

export default App;

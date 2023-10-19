import './App.css';
import { Navbar, Footer, MainContent } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <div className="position-relative">
      <Navbar/>
        <MainContent/>

      <Footer/>
      </div>
    </>
  );
}

export default App;

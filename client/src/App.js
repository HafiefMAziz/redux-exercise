import { useState, useEffect } from 'react';
import './App.css';
import { Navbar, Footer, MainContent } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('token'))) {
      setLogged(true);
    }
  }, [logged]);
  return (
    <div className="App">
      <Navbar logged={logged}/>
      <MainContent logged={logged}/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;

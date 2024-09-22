import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Register from '../src/registration/registrationPage' 
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

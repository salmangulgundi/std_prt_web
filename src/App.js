import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import DashBoard from './dashboard/DashBoard';
import Loginpage from './registration/Loginpage'
import './App.css';
import Upload from './Page/Upload'
import AddQuiz from './Page/AddQuiz';
import AddSubjects from './Page/Subjects/AddSubjects';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Loginpage/>}/>
          <Route path='/dashboard' element={<DashBoard/>} />
          <Route path='/addSubjects' element={<AddSubjects/>} />
          <Route path='/upload' element={<Upload/>} />
          <Route path='/addquiz' element={<AddQuiz/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

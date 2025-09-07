import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/login';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

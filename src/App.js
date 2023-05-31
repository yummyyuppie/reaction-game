import './App.css';
import { Routes, Route} from 'react-router-dom';
import Main from 'pages/Main/Main';
import Auth from 'pages/Auth/Auth';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path="auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;

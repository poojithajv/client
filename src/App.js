import { Toaster } from "react-hot-toast";
import routes from './routes/mainRoute'
import { HashRouter, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import './App.css';

function App() {
  return (
    <div >
      <HashRouter>
        <Toaster />
        <Routes>
          {routes}
        </Routes>
      </HashRouter>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;

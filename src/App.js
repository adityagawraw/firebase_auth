import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return <div className="App">
    <Routes>
    <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    <Toaster />
  </div>;
}

export default App;

import {
    BrowserRouter,
    Routes,
    Route,
    Switch
  } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./routes/home/Home";
import Menu from "./routes/menu/Menu";
import Login from "./routes/loginFolder/Login";
import Register from "./routes/register/Register";
import MultiplicationGame from "./routes/multiplicationGame/MultiplicationGame";
import ArithmeticLevelOne from "./routes/arithmeticLevelOne/ArithmeticLevelOne";
import ArithmeticLevelTwo from "./routes/arithmeticLevelTwo/ArithmeticLevelTwo";
import "./App.css";

  function App() {
    return (
      <BrowserRouter>
       <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/multiplication" element={<MultiplicationGame/>}/>
          <Route path="/arithmeticLevelOne" element={<ArithmeticLevelOne/>}/>
          <Route path="/arithmeticLevelTwo" element={<ArithmeticLevelTwo/>}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;
  
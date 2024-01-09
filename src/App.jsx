import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Macros } from "./pages/Macros/Macros";
import { Usuario } from "./pages/Usuario/Usuario";
import { Alimentos } from "./pages/Alimentos/Alimentos";
import { RegistrarAlimentos } from "./pages/RegistrarAlimentos/RegistrarAlimentos";
import { Header } from "./components/Header/Header"
import { Repositorios } from "./pages/Repositorios/Repositorios";
import { MyToast } from "./components/MyToast/MyToast";

function App() {

  return (
    <BrowserRouter className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login />  } />
        <Route path="/alimentos" element={ <Alimentos /> } />
        <Route path="/alimentos/registrar" element={ <RegistrarAlimentos /> } />
        <Route path="/usuario" element={ <Usuario /> } />
        <Route path="/macros" element={ <Macros /> } />
        <Route path="/repositorios" element={ <Repositorios /> } />
      </Routes>
      <MyToast />
    </BrowserRouter>
  )
}

export default App

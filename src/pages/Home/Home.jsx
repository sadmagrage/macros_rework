import { useState } from "react";
import Option from "../../components/Option/Option";
import { isAuthenticated } from "../../utils/auth";
import { HomeContainer } from "./Home.styled";
import useTheme from "../../context/ThemeContext";

export function Home() {

    const { darkMode } = useTheme();

    const [options] = useState([
        { title: "Sobre o projeto", description: "Informações e links dos repositórios relacionados ao projeto", url: "/sobre" }, 
        { title: "Ver alimentos", description: "Mostra os valores de cada alimento", url: "/alimentos" }, 
        { title: "Calcular macros", description: "O gasto é calculado de acordo com as informações passadas no usuário.", url: "/macros" }, 
        { description: "Inserir novo registro de alimento Permitido apenas a alguns usuários", title: "Registrar alimentos", url: "/alimentos/registrar" }
    ]);

    if (isAuthenticated()) {
        return (
            <HomeContainer darkMode={ darkMode } >
                {
                    options.map(option => <Option title={ option.title } description={ option.description } url={ option.url } darkMode={ darkMode } />)
                }
            </HomeContainer>
        )
    }
    else {
        window.location.pathname = "/login";
    }
}
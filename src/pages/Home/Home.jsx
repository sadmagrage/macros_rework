import { useState } from "react";
import Option from "../../components/Option/Option";
import { isAuthenticated } from "../../utils/auth";
import { HomeContainer } from "./Home.styled";

export function Home() {

    const [options] = useState([
        { title: "Repositório", description: "Link dos repositórios", url: "/repositorios" }, 
        { title: "Ver alimentos", description: "Mostra os valores de cada alimento", url: "/alimentos" }, 
        { title: "Calcular macros", description: "O gasto é calculado de acordo com as informações passadas no usuário.", url: "/macros" }, 
        { description: "Inserir novo registro de alimento Permitido apenas a alguns usuários", title: "Registrar alimentos", url: "/alimentos/registrar" }
    ]);

    if (isAuthenticated()) {
        return (
            <HomeContainer>
                {
                    options.map(option => <Option title={ option.title } description={ option.description } url={ option.url } />)
                }
            </HomeContainer>
        )
    }
    else {
        window.location.pathname = "/login";
    }
}
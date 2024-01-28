import { RepositorioLink, RepositorioLinkDescription, RepositorioLinkTitle, RepositoriosContainer } from './Repositorio.styled';
import useTheme from "../../context/ThemeContext";
import { useState } from 'react';

export function Repositorios () {

    const [repositorioLinkBody] = useState([{ url: "https://github.com/sadmagrage/macros_rework", title: "Repositório das páginas", description: "Link do repositório GitHub da construção das páginas em ReactJS" }, { url: "https://github.com/sadmagrage/macros_rework_api", title: "Repositório da API", description: "Link do repositório GitHub da API em NodeJS" }]);
    const { darkMode } = useTheme();

    return (
        <RepositoriosContainer darkMode={ darkMode } >
            {
                repositorioLinkBody.map(repLinkBody => 
                    <RepositorioLink darkMode={ darkMode } href={ repLinkBody.url } target='_blank' >
                        <RepositorioLinkTitle>{ repLinkBody.title }</RepositorioLinkTitle>
                        <RepositorioLinkDescription>{ repLinkBody.description }</RepositorioLinkDescription>
                    </RepositorioLink>
                )
            }
        </RepositoriosContainer>
    )
}
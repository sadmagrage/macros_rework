import { RepositorioLink, RepositorioLinkDescription, RepositorioLinkTitle, RepositoriosContainer } from './Repositorio.styled';

export function Repositorios () {
    return (
        <RepositoriosContainer>
            <RepositorioLink href='https://github.com/sadmagrage/macros_rework' target='_blank' >
                <RepositorioLinkTitle>Repositório das páginas</RepositorioLinkTitle>
                <RepositorioLinkDescription>Link do repositório GitHub da construção das páginas em ReactJS</RepositorioLinkDescription>
            </RepositorioLink>
            <RepositorioLink href='https://github.com/sadmagrage/macros_rework_api' target='_blank' >
                <RepositorioLinkTitle>Repositório da API</RepositorioLinkTitle>
                <RepositorioLinkDescription>Link do repositório GitHub da API em NodeJS</RepositorioLinkDescription>
            </RepositorioLink>
        </RepositoriosContainer>
    )
}
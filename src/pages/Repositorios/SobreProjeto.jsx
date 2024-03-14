import { DescricaoProjetoContainer, DescricaoProjetoText, DescricaoProjetoTitle, RepositorioLink, RepositorioLinkDescription, RepositorioLinkTitle, RepositoriosContainer } from './SobreProjeto.styled';
import useTheme from "../../context/ThemeContext";
import { useState } from 'react';

export function SobreProjeto () {

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
            <DescricaoProjetoContainer darkMode={ darkMode } >
                <DescricaoProjetoTitle>Projeto web responsivo para cálculo de macronutrientes e calorias.</DescricaoProjetoTitle>
                <br/>
                <DescricaoProjetoText>
                    A criação das páginas foi feita em ReactJS com styled components para facilitar a estilização e separação de componentes, Zustand para gerenciamento de estados, e a API em NodeJS usando Sequelize para realizar as operações com o banco de dados MySql, e autenticação JWT.
                </DescricaoProjetoText>
                <br/>
                <DescricaoProjetoText>
                    Para evitar o incômo aos olhos, foi implementada a opção de troca de tema (tema claro e escuro), a opção se encontra ao canto superior direito (ícone de sol e lua) e a escolha ficará salva no localStorage para os próximos acessos.
                </DescricaoProjetoText>
                <br/>
                <DescricaoProjetoText>
                    As páginas só podem ser acessadas após a efetuação de login ou registro, qualquer acesso feito na página exceto a página "Sobre o projeto", sem estar autenticado, redirecionará para a página de login. Ao fazer login ou registro, será reservado um token JWT nos cookies com validade de meia hora. Após a expiração, qualquer acesso, redirecionará para a tela de login. Ao ser registrado, as informações são salvas no banco de dados, onde terão apenas o username e a senha registrados.
                </DescricaoProjetoText>
                <br/>
                <DescricaoProjetoText>
                    No canto superior direito, ao clicar no username, será redirecionado para a página Usuário, onde poderá atualizar a foto de perfil (apenas com URL), e alterar as variáveis como o fator de atividade, peso, porcentagem de gordura corporal, imagem do perfil. Com os dados suficientes desta página, podemos ir para a próxima página.
                </DescricaoProjetoText>
                <br/>
                <DescricaoProjetoText>
                    Página Macros, nela e feita o cálculo de calorias do dia a serem batidas de acordo com o objetivo, que aparecerá como "Gasto", é só inserir os valores nos alimentos para contabilizá-los, aparecerá como "Kcal", ao clicar nos itens abaixo "Carb" e "Proth" será mostrado, sugestões para completar o que falta.
                </DescricaoProjetoText>
                <br/>
                <DescricaoProjetoText>
                    Página Alimentos para mostrar os macronutrientes de cada alimento.
                </DescricaoProjetoText>
                <br/>
                <DescricaoProjetoText>
                    Página Registrar Alimentos, os alimentos registrados nesta páginas estarão disponíveis na página Macros e Alimentos, somente pessoas específicas podem registrar alimentos.
                </DescricaoProjetoText>
                <br/>
                <DescricaoProjetoText>
                    Por conta da hospedagem gratuita no Glitch.me, o acesso da página pode demorar por volta de 1 minuto.
                </DescricaoProjetoText>
                <br/>
            </DescricaoProjetoContainer>
        </RepositoriosContainer>
    )
}
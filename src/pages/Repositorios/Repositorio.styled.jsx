import styled from "styled-components";
import { darkModeBody, darkModeOption, lightModeBody, lightModeOption, white } from "../../utils/colors";

export const RepositoriosContainer = styled.div`
    background-color: ${ props => props.darkMode ? darkModeBody : lightModeBody };
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 90px;
`;

export const RepositorioLink = styled.a`
    background-color: ${ props => props.darkMode ? darkModeOption : lightModeOption };
    width: 300px;
    text-decoration: none;
    padding: 10px;
    border-radius: 20px;
    border: 2px solid transparent;
    color: white;
`;

export const RepositorioLinkTitle = styled.h3`
    text-align: center;
`;

export const RepositorioLinkDescription = styled.p`
    text-align: center;
`;
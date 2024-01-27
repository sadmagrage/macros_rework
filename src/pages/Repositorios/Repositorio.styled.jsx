import styled from "styled-components";
import { darkModeBody, white } from "../../utils/colors";

export const RepositoriosContainer = styled.div`
    background-color: ${ white };
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const RepositorioLink = styled.a`
    background-color: ${ darkModeBody };
    width: 300px;
    text-decoration: none;
    padding: 10px;
    border-radius: 20px;
    border: 2px solid black;
    color: white;
`;

export const RepositorioLinkTitle = styled.h3``;

export const RepositorioLinkDescription = styled.p``;
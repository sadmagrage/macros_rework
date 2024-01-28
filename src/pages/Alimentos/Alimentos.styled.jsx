import styled from "styled-components";
import { black, darkModeBody, darkModeOption, lightModeBody, lightModeOption, white } from "../../utils/colors";

export const AlimentosStyled = styled.div`
    flex: 1;
    width: 100vw;
    background-color: ${ props => props.darkMode ? darkModeBody : lightModeBody };
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const SearchInput = styled.input`
    align-self: end;
    height: 20px;
    width: 200px;
    padding-left: 5px;
    border-radius: 7px;
    background-color: ${ props => props.darkMode ? darkModeBody : lightModeBody };
    color: ${ props => props.darkMode ? white : black };
    border: 2px solid transparent;
    outline: none;
    margin: 20px 60px 0px 0px;
    appearance: textfield;
    align-self: flex-end;
`;

export const AlimentosMenu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${ props => props.darkMode ? darkModeOption : lightModeOption };
    width: 90%;
    height: fit-content;
    margin: 10px 20px;
    border-radius: 15px;
    align-self: center;
`;

export const AlimentosParentContainer = styled.div`
    box-sizing: initial;
    height: fit-content;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    margin: 0px auto 20px auto;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 95%;
`;

export const AlimentosContainer = styled.div``;

export const Alimento = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 10px 15px;
`;

export const AlimentoNome = styled.h3`
    color: ${ props => props.darkMode ? white : black };
    text-align: center;
`;

export const AlimentoImage = styled.img`
    margin: 5px 0px;
    width: 100%;
    height: 150px;
`;

export const Macro = styled.p`
    align-self: center;
    color: ${ props => props.darkMode ? white : black };
`;
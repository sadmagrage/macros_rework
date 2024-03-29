import styled from "styled-components";
import { darkModeBody, darkModeOption, lightModeBody, lightModeOption, white } from "../../utils/colors";
import { breakpointWidth } from "../../utils/breakpoints";

export const UsuarioContainer = styled.div`
    flex: 1;
    background-color: ${ props => props.darkMode ? darkModeBody : lightModeBody };
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 90px;
`;

export const UsuarioForm = styled.div`
    width: 30%;
    background-color: ${ props => props.darkMode ? darkModeOption : lightModeOption };
    margin: 15px 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    border-radius: 5%;

    @media ${ breakpointWidth.bg } {
        width: 60%;
    }
    @media ${ breakpointWidth.md } {
        width: 90%;
    }
`;

export const UsuarioImage = styled.img`
    width: 90%;
    height: auto;
    border-radius: 50%;
    margin: 20px 0px;
`;

export const UsuarioFormTitle = styled.h1`
    color: white;
    text-align: center;
`;

export const UsuarioInputImage = styled.input`
    width: 50%;
    border-radius: 5px;
    padding: 5px;
    min-height: 30px;
    color: white;
`;

export const UsuarioCamp = styled.div`
    width: 50%;
    margin: 10px 0px;
`;

export const UsuarioLabel = styled.label`
    width: 100%;
    color: white;
`;

export const UsuarioInputText = styled.input`
    width: ${ props => props.radioCamp ? "50px" : "100%" };
    border-radius: 5px;
    outline: none;
    appearance: textfield;
    padding: 0px 5px;
    background-color: transparent;
    border: 2px solid white;
    text-align: center;
    color: white;
`;

export const UsuarioButton = styled.input`
    background-color: aqua;
    border: 2px solid aqua;
    border-radius: 5px;
    width: 50%;
`;

export const UsuarioInputRadioContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const UsuarioInputRadio = styled.input`
    margin: 0px 10px;
`;


export const UsuarioSelect = styled.select`
    width: 100%;
    border-radius: 5px;
    outline: none;
    appearance: textfield;
    padding: 0px 5px;
    background-color: transparent;
    border: 2px solid white;
    text-align: center;
    color: white;
`;

export const UsuarioOption = styled.option``;
import styled from "styled-components";
import { blackTransparent, white } from "../../utils/colors";

export const RegistrarAlimentoContainer = styled.div`
    flex: 1;
    background-color: ${ white };
    background-size: 100vw 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormContainerAlimento = styled.div`
    height: 500px !important;
    background-color: ${ blackTransparent };
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    width: 300px;
    border-radius: 15px;
`;

export const RegistrarAlimentoTitle = styled.h3`
    margin: 5px;
    color: white;
`;

export const RegistrarAlimentoForm = styled.form`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    padding: 0px 15px 15px 15px;
`;

export const RegistrarAlimentoLabel = styled.label`
    color: white;
`;

export const RegistrarAlimentoInput = styled.input`
    width: 100%;
    padding-left: 5px;
    border-radius: 7px;
    background-color: transparent;
    border: 2px solid white;
    color: white;
    outline: none;
    appearance: textfield;
`;

export const RegistrarAlimentoButton = styled.input`
    background-color: aqua;
    border: 2px solid aqua;
    border-radius: 5px;
`;
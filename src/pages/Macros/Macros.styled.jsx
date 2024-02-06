import styled from "styled-components";
import { black, darkModeBody, darkModeOption, lightModeBody, lightModeOption, white } from "../../utils/colors";
import { scrollX, scrollY } from "../../utils/personalizeScrollbar";

export const MacrosContainer = styled.div`
    background-color: ${ props => props.darkMode ? darkModeBody : lightModeBody };
    flex: 1;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MacrosScreen = styled.div`
    background-color: ${ props => props.darkMode ? darkModeOption : lightModeOption };
    width: 95%;
    height: 90%;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const MacrosComida = styled.div`
    width: 70%;
    display: flex;
    overflow-x: auto;
    
    ${ scrollX }
`;

export const ContainerComida = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const InfoContainer = styled.div`
    width: 20%;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FilterButton = styled.input`
    border: 2px solid ${ white };
    color: ${ white };
    background-color: transparent;
    width: 100%;
    margin-bottom: 5px;
    border-radius: 7px;
`;

export const FilterInput = styled.input`
    background-color: transparent;
    color: ${ white };
    width: 100%;
    padding-left: 5px;
    border-radius: 7px;
    border: 2px solid ${ white };
    outline: none;
    appearance: textfield;
    margin-bottom: 5px;
`;

export const Sugestions = styled.div`
    width: 100%;
    margin: 10px 0px;
    overflow-y: scroll;
    height: ${ props => props.designedHeight + "px" };
    padding-right: 2px;

    ${ scrollY }
`;
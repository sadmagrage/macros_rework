import styled from "styled-components";
import { black, darkModeBody, darkModeOption, lightModeBody, lightModeOption, white } from "../../utils/colors";
import { scrollX } from "../../utils/personalizeScrollbar";
import { breakpointHeight } from "../../utils/breakpoints";

export const AlimentosStyled = styled.div`
    flex: 1;
    width: 100vw;
    background-color: ${ props => props.darkMode ? darkModeBody : lightModeBody };
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 90px;
`;

export const SearchInput = styled.input`
    align-self: end;
    height: 20px;
    width: 200px;
    padding-left: 5px;
    border-radius: 7px;
    background-color: transparent;
    color: ${ white };
    border: 2px solid ${ white };
    outline: none;
    margin-right: 60px;
    margin-bottom: 15px;
    appearance: textfield;
    align-self: flex-end;

    @media ${ breakpointHeight.bg } {
        margin: 7.5px 60px 7.5px 0;
    }
`;

export const AlimentosMenu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${ props => props.darkMode ? darkModeOption : lightModeOption };
    width: 90%;
    height: 90%;
    margin: 0 20px;
    border-radius: 15px;
    align-self: center;
    justify-content: center;
`;

export const AlimentosParentContainer = styled.div`
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

    ${ scrollX }

    @media ${ breakpointHeight.bg } {
        padding: 0px;
    }
`;

export const AlimentosContainer = styled.div`
    @media (max-height: 800px) {
        display: flex;
    }
`;

export const Alimento = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 10px 15px;
`;

export const AlimentoNome = styled.h3`
    color: ${ white };
    text-align: center;
`;

export const AlimentoImage = styled.img`
    margin: 5px 0px;
    width: 100%;
    height: 150px;
`;

export const Macro = styled.p`
    align-self: center;
    color: ${ white };
`;
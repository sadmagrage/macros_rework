import styled from "styled-components";
import { black, darkModeBody, darkModeOption, lightModeBody, lightModeOption, white } from "../../utils/colors";
import { scrollX } from "../../utils/personalizeScrollbar";
import { breakpointHeight, breakpointWidth } from "../../utils/breakpoints";

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
    display: ${ props => props.isLoaded ? "unset" : "none" };
    align-self: end;
    height: 20px;
    width: 200px;
    border-radius: 7px;
    background-color: transparent;
    color: ${ white };
    border: 2px solid ${ white };
    outline: none;
    appearance: textfield;
    margin-right: 5%;
    padding: 0px 5px;


    @media ${ breakpointWidth.md } {
        align-self: center;
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
    border-radius: 15px;
    padding: 15px;
    margin: 0px auto 20px auto;
    overflow-x: auto;
    overflow-y: hidden;
    width: 95%;
    display: ${ props => props.isLoaded ? "grid" : "none" };
    
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: repeat(2, 1fr);
    grid-auto-columns: minmax(250px, 1fr);
    
    ${ scrollX }

    @media ${ breakpointHeight.bg } {
        padding: 0px;
        
        @media (max-height: 800px) {
            grid-template-rows: repeat(1, 1fr);
        }
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
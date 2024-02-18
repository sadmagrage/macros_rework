import styled from "styled-components";
import { darkModeBody, darkModeOption, lightModeBody, lightModeOption, white } from "../../utils/colors";
import { scrollX, scrollY } from "../../utils/personalizeScrollbar";
import { breakpointHeight, breakpointWidth } from "../../utils/breakpoints";

export const MacrosContainer = styled.div`
    background-color: ${ props => props.darkMode ? darkModeBody : lightModeBody };
    flex: 1;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 90px;

    @media ${ breakpointWidth.bg } {
        height: calc(100% - 90px);
    }
`;

export const MacrosScreen = styled.div`
    background-color: ${ props => props.darkMode ? darkModeOption : lightModeOption };
    width: 95%;
    height: 90%;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media ${ breakpointWidth.bg } {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
`;

export const MacrosComida = styled.div`
    width: 90%;
    display: flex;
    overflow-x: auto;
    
    ${ scrollX }
    
    @media ${ breakpointWidth.bg } {
        // width: 90%;

        @media ${ breakpointHeight.bg } {
            height: calc(100% - 290px);
        }
    }
`;

export const ContainerComida = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media ${ breakpointHeight.bg } and ${ breakpointWidth.bg } {
        flex-direction: row;
        align-self: center;
        width: 200%;
    }
`;

export const InfoContainer = styled.div`
    width: 20%;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media ${ breakpointWidth.bg } {
        flex-wrap: wrap;
        height: 280px;
        width: 90%;
    }
`;

export const FilterButton = styled.input`
    border: 2px solid ${ white };
    color: ${ white };
    background-color: transparent;
    width: 100%;
    margin-bottom: 5px;
    border-radius: 7px;

    @media ${ breakpointWidth.bg } {
        width: 150px;
    }
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
    text-align: center;

    @media ${ breakpointWidth.bg } {
        width: 150px;
    }
`;

export const Sugestions = styled.div`
    width: 100%;
    margin: 10px 0px;
    overflow-y: scroll;
    height: ${ props => props.designedHeight + "px" };
    padding: 0px 15px;

    ${ scrollY }

    @media ${ breakpointWidth.bg } {
        overflow-y: auto;
        width: calc(100% - 160px);
        height: 100%;
        margin: 0;
    }
`;
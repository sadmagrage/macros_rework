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

    @media ${ breakpointWidth.bg } and (orientation: portrait) {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    @media ${ breakpointWidth.bg } and (orientation: landscape) {
        
    }
`;

export const MacrosComida = styled.div`
    width: 90%;
    overflow-x: auto;
    
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: repeat(3, 1fr);
    grid-auto-columns: minmax(250px, 1fr);
    grid-gap: 10px;

    ${ scrollX }

    @media (min-width: 900px) and (max-height: 900px) {
        grid-template-rows: repeat(2, 1fr);
    }
    
    @media ${ breakpointWidth.bg } {
        grid-template-rows: repeat(2, 1fr);

        @media (max-height: 920px) and (orientation: portrait) {
            height: calc(100% - 290px);
            grid-template-rows: repeat(1, 1fr);
            align-items: center;
        }
    }

    @media (max-height: 600px) {
        grid-template-rows: repeat(1, 1fr);
    }
`;

export const InfoContainer = styled.div`
    width: 20%;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media ${ breakpointWidth.bg } and (orientation: portrait) {
        flex-wrap: wrap;
        height: 280px;
        width: 90%;
    }

    @media ${ breakpointWidth.bg } and (orientation: landscape) {
        flex-wrap: wrap;
        height: 100%;
        width: 90%;
    }
`;

export const FilterButton = styled.input`
    border: 2px solid ${ white };
    color: ${ white };
    background-color: transparent;
    width: calc(100% - 15px * 2);
    margin-bottom: 5px;
    border-radius: 7px;

    @media ${ breakpointWidth.bg } {
        width: 150px;
    }
`;

export const FilterInput = styled.input`
    background-color: transparent;
    color: ${ white };
    width: calc(100% - 15px * 2);
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
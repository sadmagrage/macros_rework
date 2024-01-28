import styled from "styled-components";
import { black, white } from "../../utils/colors";

export const SugestionContainer = styled.div`
    border: 1px solid ${ props => props.darkMode ? white : black };
    border-left: none;
    border-right: none;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
        cursor: pointer;
    }
`;

export const Description = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const MacroName = styled.p`
    color: ${ props => props.darkMode ? white : black };
    width: min-content;
`;

export const BottomArrow = styled.p`
    color: ${ props => props.darkMode ? white : black };
    width: min-content;
`;

export const ComidaSugestionContainer = styled.div`
    display: grid;
    grid-template-rows: ${ props => props.appear ? "1fr" : "0fr" };
    overflow: hidden;
    transition: grid-template-rows 300ms;
`;

export const ComidaSugestion = styled.div`
    min-height: 0;
`;
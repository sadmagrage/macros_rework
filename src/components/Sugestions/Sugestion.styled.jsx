import styled from "styled-components";

export const SugestionContainer = styled.div`
    border: 1px solid white;
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
    color: white;
    width: min-content;
`;

export const BottomArrow = styled.p`
    color: white;
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
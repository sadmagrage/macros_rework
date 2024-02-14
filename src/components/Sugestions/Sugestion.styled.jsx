import styled from "styled-components";
import { black, white } from "../../utils/colors";

export const SugestionContainer = styled.div`
    border: 1px solid ${ white };
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
    color: ${ white };
    width: min-content;
`;

export const BottomArrow = styled.p`
    color: ${ white };
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


//BACKUP

/*
export const HeaderContent = styled.div`
    margin: 0px 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    align-items: center;
`

export const HeaderMenu = styled.div`
    display: flex;
    min-height: 100%;
    justify-content: center;
    flex-direction: column;

    @media ${ breakpoint.bg } {
        ${ props => !props.isLogin && props.activeMenu ? `
            position: absolute;
            top: 30px;
        ` : "" }
    }
`;

export const HeaderLinks = styled.div`
    display: flex;
    background-color: ${ props => props.darkMode ? darkModeHeader : white };
    
    @media ${ breakpoint.bg } {
        ${ props => props.activeMenu ? 
        `
            flex-direction: column;
            font-size: 20px;
            height: min-content;
        ` : "display: none;" }
    }
`;

export const Link = styled.a`
    ${ props => props.isLogin ? "display: none;" : "" }
    text-decoration: none;
    color: ${ props => props.darkMode ? white : black };
    box-sizing: initial;
    padding: 15px;

    &:hover {
        cursor: pointer;
    }
`;
*/
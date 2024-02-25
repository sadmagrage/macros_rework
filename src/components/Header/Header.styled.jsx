import styled from "styled-components";
import { black, darkModeHeader, lightGrey, lightModeBody, lightModeHeader, white } from "../../utils/colors";
import { breakpointHeight, breakpointWidth } from "../../utils/breakpoints"

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 90px;
    background-color: ${ props => props.darkMode ? darkModeHeader : lightModeHeader };
    font-size: 30px;
    position: fixed;
    top: 0%;
`;

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
    flex-direction: column;
    justify-content: center;
    @media ${ breakpointWidth.bg } {
        ${ props => !props.noPermission ? `
            position: absolute;
            top: 30px;
            z-index: 1;
        ` : "" }
    }
`;

export const HeaderLinksContainer = styled.div`
    @media ${ breakpointWidth.bg } {
        ${ props => !props.noPermission ? `
            display: grid;
            overflow: hidden;
            transition: grid-template-rows 300ms;
        ` : "" }
        grid-template-rows: ${ props => props.activeMenu ? "1fr" : "0fr" };
    }
`

export const HeaderLinksWrapper = styled.div`
    background-color: ${ props => props.darkMode ? darkModeHeader : lightModeHeader };
    min-height: 0;
    display: flex;

    @media ${ breakpointWidth.bg } {
        ${ props => !props.noPermission ? `
            flex-direction: column;
            margin-top: 20px;
        ` : "" }
    }
`;

export const Link = styled.a`
    ${ props => props.noPermission ? "display: none;" : "" }
    text-decoration: none;
    color: ${ props => props.darkMode ? white : black };
    box-sizing: initial;
    padding: 15px;

    &:hover {
        cursor: pointer;
    }
`;

export const ProfileContainer = styled.div`
    display: ${ props => props.noPermission ? "none" : "flex" };
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    position: relative;
    z-index: 2;
`;

export const ThemeToggler = styled.div`
    background-color: ${ lightModeBody };
    width: 65px;
    height: 30px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

export const ThemeIcon = styled.div`
    background-color: ${ props => props.darkMode ? "transparent" :  lightGrey };
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50px;
    width: 30px;
    height: 30px;
`

export const ProfilePic = styled.img`
    align-self: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export const ProfileUsername = styled.h6`
    color: ${ props => props.darkMode ? white : black };
    text-align: center;
`;

export const Logout = styled.p`
    color: ${ props => props.darkMode ? white : black };
    font-size: 15px;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 30px;

    &:hover {
        cursor: pointer;
    }
`;
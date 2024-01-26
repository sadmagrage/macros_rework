import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 90px;
    justify-content: space-around;
    background-color: black;
    font-size: 30px;
`;

export const HeaderLinks = styled.div`
    display: flex;
`;

export const Link = styled.a`
    ${ props => props.isLogin ? "display: none;" : "" }
    text-decoration: none;
    color: white;
    box-sizing: initial;
    padding: 15px;
    align-self: center;
`;

export const ProfileContainer = styled.div`
    display: ${ props => props.isLogin ? "none" : "flex" };
    justify-content: space-around;
    align-items: center;
    padding: 5px;

    &:hover {
        cursor: pointer;
    }
`;

export const ProfilePic = styled.img`
    align-self: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export const ProfileUsername = styled.h6`
    color: white;
    text-align: center;
`;

export const Logout = styled.p`
    color: white;
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
`;
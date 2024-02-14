import styled from "styled-components";
import { darkModeBody, lightModeBody } from "../../utils/colors";

export const HomeContainer = styled.div`
    background-color: ${ props => props.darkMode ? darkModeBody : lightModeBody };
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 90px;
`;
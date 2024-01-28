import styled from "styled-components";
import { black, white } from "../../utils/colors";

export const ComidaContainer = styled.div`
    width: 250px;
    height: min-content;
    margin: 10px 15px;
`

export const ComidaTitle = styled.h3`
    color: ${ props => props.darkMode ? white : black };
    text-align: center;
`;

export const ComidaImage = styled.img`
    width: 250px;
    height: 150px;
`;

export const ComidaInput = styled.input`
    background-color: transparent;
    color: ${ props => props.darkMode ? white : black };
    width: 100%;
    padding-left: 5px;
    border-radius: 7px;
    border: 2px solid ${ props => props.darkMode ? white : black };
    outline: none;
    appearance: textfield;
    margin-bottom: 5px;  
`;
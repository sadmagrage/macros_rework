import styled from "styled-components";
import { black, white } from "../../utils/colors";
import { breakpointHeight } from "../../utils/breakpoints";

export const ComidaContainer = styled.div`
    width: 250px;
    height: min-content;
    margin: 10px 15px;
    
    @media ${ breakpointHeight.bg } {
        width: 300px;
    }
`

export const ComidaTitle = styled.h3`
    color: ${ white };
    text-align: center;
`;

export const ComidaImage = styled.img`
    width: 100%;
    height: 150px;
`;

export const ComidaInput = styled.input`
    background-color: transparent;
    color: ${  white };
    width: 100%;
    padding-left: 5px;
    border-radius: 7px;
    border: 2px solid ${ white };
    outline: none;
    appearance: textfield;
    margin-bottom: 5px;  
`;
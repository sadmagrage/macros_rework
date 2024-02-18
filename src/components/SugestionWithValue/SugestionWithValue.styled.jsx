import styled from "styled-components";
import { black, white } from "../../utils/colors";

export const SugestionWithValueItem = styled.div`
    margin: 5px 0px;
`;

export const SugestionName = styled.h3`
    color: ${ white };
    text-align: center;
    
    @media (max-width: 430px) {
        font-size: smaller;
    }
`;

export const SugestionData = styled.div`
    display: flex;
`;

export const SugestionImg = styled.img`
    width: 70%;
    height: 100px;

    @media (max-width: 430px) {
        width: 60%;
        height: 75px;
    }
`;

export const SugestionValue = styled.h4`
    width: 40%;
    text-align: center;
    color: ${ white };
    align-self: center;

    @media (max-width: 430px) {
        font-size: smaller;
    }
`;
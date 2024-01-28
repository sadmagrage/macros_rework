import styled from "styled-components";
import { black, white } from "../../utils/colors";

export const SugestionWithValueItem = styled.div`
    margin: 5px 0px;
`;

export const SugestionName = styled.h3`
    color: ${ white };
    text-align: center;
`;

export const SugestionData = styled.div`
    display: flex;
`;

export const SugestionImg = styled.img`
    width: 70%;
    height: 100px;
`;

export const SugestionValue = styled.h4`
    width: 30%;
    text-align: center;
    color: ${ white };
    align-self: center;
`;
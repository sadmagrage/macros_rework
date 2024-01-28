import styled from "styled-components";
import { black, white } from "../../utils/colors";

export const SugestionNoValueContainer = styled.div``;

export const SugestionNoValueText = styled.p`
    text-align: center;
    color: ${ props => props.darkMode ? white : black };
    margin: 2.5px 0px;
`;
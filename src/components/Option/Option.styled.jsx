import styled from "styled-components";
import { lightModeOption, darkModeOption } from "../../utils/colors";

export const OptionContainer = styled.div`
    background-color: ${ props => props.darkMode ? darkModeOption : lightModeOption };
    width: 300px;
    height: min-content;
    border-radius: 20px;
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin: 5px;
    
    &:hover {
        cursor: pointer;
    }
`;

export const OptionTitle = styled.h3`
    color: white;
    width: 100%;
    text-align: center;
    margin: 5px;
`;

export const Description = styled.div`
    width: 100%;
`;

export const DescriptionText = styled.p`
    color: white;
    text-align: center;
    width: 100%;
`;
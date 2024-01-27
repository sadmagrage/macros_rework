import { useNavigate } from "react-router-dom";
import { Description, DescriptionText, OptionContainer, OptionTitle } from "./Option.styled";

export default function Option ({ title, description, url, darkMode }) {

    const navigate = useNavigate();

    return (
        <OptionContainer onClick={ () => navigate(url) } darkMode={ darkMode } >
            <OptionTitle>{ title }</OptionTitle>
            <Description>
                <DescriptionText>{ description }</DescriptionText>
            </Description>
        </OptionContainer>
    )
}
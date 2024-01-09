import { useNavigate } from "react-router-dom";
import { Description, DescriptionText, OptionContainer, OptionTitle } from "./Option.styled";

export default function Option ({ title, description, url }) {

    const navigate = useNavigate();

    return (
        <OptionContainer onClick={ () => navigate(url) }>
            <OptionTitle>{ title }</OptionTitle>
            <Description>
                <DescriptionText>{ description }</DescriptionText>
            </Description>
        </OptionContainer>
    )
}
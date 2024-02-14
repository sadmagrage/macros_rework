import { useNavigate } from "react-router-dom";
import { Description, DescriptionText, OptionContainer, OptionTitle } from "./Option.styled";
import useActiveMenu from '../../context/ActiveMenuContext';

export default function Option ({ title, description, url, darkMode }) {

    const navigate = useNavigate();
    const { setActiveMenu } = useActiveMenu();

    return (
        <OptionContainer onClick={ () => { navigate(url);setActiveMenu(false); } } darkMode={ darkMode } >
            <OptionTitle>{ title }</OptionTitle>
            <Description>
                <DescriptionText>{ description }</DescriptionText>
            </Description>
        </OptionContainer>
    )
}
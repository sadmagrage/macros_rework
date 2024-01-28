import { SugestionNoValueContainer, SugestionNoValueText } from "./SugestionNoValue.styled";
import useTheme from "../../context/ThemeContext";

export default function SugestionNoValue ({ macro }) {

    const { darkMode } = useTheme();

    return (
        <SugestionNoValueContainer>
            <SugestionNoValueText darkMode={ darkMode } >Falta { 0 }g de { macro }</SugestionNoValueText>
        </SugestionNoValueContainer>
    )
}
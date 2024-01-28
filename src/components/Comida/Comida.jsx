import { ComidaContainer, ComidaImage, ComidaInput, ComidaTitle } from "./Comida.styled";
import useTheme from "../../context/ThemeContext";

export default function Comida ({ name, img, onInput, value }) {

    const { darkMode } = useTheme();

    return (
        <ComidaContainer>
            <ComidaTitle darkMode={ darkMode } >{ name }</ComidaTitle>
            <ComidaImage src={ img } />
            <ComidaInput darkMode={ darkMode } type="text" value={ value } onChange={ onInput } />
        </ComidaContainer>
    )
}
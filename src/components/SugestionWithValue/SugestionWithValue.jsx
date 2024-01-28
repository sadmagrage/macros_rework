import { SugestionData, SugestionImg, SugestionName, SugestionValue, SugestionWithValueItem } from "./SugestionWithValue.styled";
import useTheme from "../../context/ThemeContext";

export default function SugestionWithValue ({ name, img, value}) {

    const { darkMode } = useTheme();

    return (
        <SugestionWithValueItem>
            <SugestionName darkMode={ darkMode } >{ name }</SugestionName>
            <SugestionData>
                <SugestionImg src={ img } />
                <SugestionValue darkMode={ darkMode } >{ value.toFixed(2) }</SugestionValue>
            </SugestionData>
        </SugestionWithValueItem>
    )
}
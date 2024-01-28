import { MacroValue, PropertiesContainer } from "./Properties.styled";
import useTheme from "../../context/ThemeContext";

export default function Properties ({ macrosProperty }) {

    const { darkMode } = useTheme();

    return (
        <PropertiesContainer>
            {
                Object.keys(macrosProperty).map(macroProperty => 
                    <MacroValue darkMode={ darkMode } >{ macroProperty }: { macrosProperty[macroProperty] }</MacroValue>
                )
            }
        </PropertiesContainer>
    )
}
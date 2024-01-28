import { MacroValue, PropertiesContainer } from "./Properties.styled";

export default function Properties ({ macrosProperty }) {

    return (
        <PropertiesContainer>
            {
                Object.keys(macrosProperty).map(macroProperty => 
                    <MacroValue>{ macroProperty }: { macrosProperty[macroProperty] }</MacroValue>
                )
            }
        </PropertiesContainer>
    )
}
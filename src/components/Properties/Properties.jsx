import { MacroValue, PropertiesContainer } from "./Properties.styled";

export default function Properties ({ macrosProperty }) {

    return (
        <PropertiesContainer>
            {
                Object.keys(macrosProperty).map(macroProperty => 
                    <MacroValue>{ macroProperty.slice(0, 1).toUpperCase() + macroProperty.slice(1, macroProperty.length) }: { macrosProperty[macroProperty] }</MacroValue>
                )
            }
        </PropertiesContainer>
    )
}
import { MacroValue, PropertiesContainer } from "./Properties.styled";

export default function Properties ({ carb, prot, protl, proth, fat, kcal, gasto }) {
    return (
        <PropertiesContainer>
            <MacroValue>Carb: { carb }</MacroValue>
            <MacroValue>Prot: { prot }</MacroValue>
            <MacroValue>Protl: { protl }</MacroValue>
            <MacroValue>Proth: { proth }</MacroValue>
            <MacroValue>Fat: { fat }</MacroValue>
            <MacroValue>Kcal: { kcal }</MacroValue>
            <MacroValue>Gasto: { gasto }</MacroValue>
        </PropertiesContainer>
    )
}
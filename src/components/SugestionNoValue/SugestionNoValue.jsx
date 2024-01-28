import { SugestionNoValueContainer, SugestionNoValueText } from "./SugestionNoValue.styled";

export default function SugestionNoValue ({ macro }) {

    return (
        <SugestionNoValueContainer>
            <SugestionNoValueText>Falta { 0 }g de { macro }</SugestionNoValueText>
        </SugestionNoValueContainer>
    )
}
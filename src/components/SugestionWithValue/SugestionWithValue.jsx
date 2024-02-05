import { imageBufferToUrl } from "../../utils/imageBufferToUrl";
import { SugestionData, SugestionImg, SugestionName, SugestionValue, SugestionWithValueItem } from "./SugestionWithValue.styled";

export default function SugestionWithValue ({ name, img, value}) {

    return (
        <SugestionWithValueItem>
            <SugestionName>{ name }</SugestionName>
            <SugestionData>
                <SugestionImg src={ imageBufferToUrl(img.data) } />
                <SugestionValue>{ value.toFixed(2) }</SugestionValue>
            </SugestionData>
        </SugestionWithValueItem>
    )
}
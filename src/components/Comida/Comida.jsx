import { imageBufferToUrl } from "../../utils/imageBufferToUrl";
import { ComidaContainer, ComidaImage, ComidaInput, ComidaTitle } from "./Comida.styled";

export default function Comida ({ name, img, onInput, value }) {

    return (
        <ComidaContainer>
            <ComidaTitle>{ name }</ComidaTitle>
            <ComidaImage src={ img ? imageBufferToUrl(img.data) : "" } />
            <ComidaInput type="text" value={ value } onChange={ onInput } />
        </ComidaContainer>
    )
}
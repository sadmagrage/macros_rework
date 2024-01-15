import SugestionWithValue from "../SugestionWithValue/SugestionWithValue";
import SugestionNoValue from "../SugestionNoValue/SugestionNoValue";
import { BottomArrow, ComidaSugestion, ComidaSugestionContainer, Description, MacroName, SugestionContainer } from "./Sugestion.styled";

export default function Sugestion ({ onClick, macro, active, dataComida, gasto, kcal, metaProtl, protl, metaProth, proth, metaFat, fat }) {

    const sugestionItem = (macro, comida, index) => {
        if ((macro === "Carb" && comida.carb >= 0.2 && comida.carb < 1) || (macro === "Carb" && comida.nome.toLowerCase() === "suco prats") || (macro === "Carb" && comida.nome.toLowerCase() === "feijao")) {
            const faltaCarb = (gasto - kcal) / 4 / (comida.carb + comida.protl + comida.proth + comida.fat * 9 / 4);

            return <SugestionWithValue name={ comida.nome } img={ comida.img } value={ faltaCarb } />
        }
        else if (macro === "Protl" && index == dataComida.length - 1){
            const faltaProtl = (metaProtl - protl);

            return <SugestionNoValue value={ faltaProtl } macro={ macro } />
        }
        else if (macro === "Proth" && comida.proth > 0) {
            const faltaProth = (metaProth - proth) / comida.proth;

            return <SugestionWithValue name={ comida.name } img={ comida.img } value={ faltaProth } />
        }
        else if (macro === "Fat" && index == dataComida.length - 1) {
            const faltaFat = (metaFat - fat);

            return <SugestionNoValue value={ faltaFat } macro={ macro } />
        }
    }

    return (
        <SugestionContainer onClick={ onClick }>
            <Description>
                <MacroName>{ macro }</MacroName>
                <BottomArrow>v</BottomArrow>
            </Description>
            <ComidaSugestionContainer appear={ active } >
                <ComidaSugestion>
                    {
                        dataComida.map((comida, index) => sugestionItem(macro, comida, index))
                    }
                </ComidaSugestion>
            </ComidaSugestionContainer>
        </SugestionContainer>
    )
}
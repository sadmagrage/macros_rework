import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { getComida } from '../../utils/api';
import { Alimento, AlimentoImage, AlimentoNome, AlimentosMenu, AlimentosParentContainer, AlimentosStyled, Macro, SearchInput } from './Alimentos.styled';
import useTheme from "../../context/ThemeContext";
import { useNavigate } from 'react-router-dom';

export function Alimentos() {
    const [DataAlimentos, setDataAlimentos] = useState([]);
    const [Alimentos, setAlimentos] = useState([]);
    const [macroCamps] = useState(["Carb", "Proth", "Protl", "Fat"]);

    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const container = [];
    let containerText = "";

    const iterateAlimento = (item, index) => {
        if (container.length > 0 || index === Alimentos.length - 1) {
            container.push(item);
            containerText = <div key={ container.length === 2 ? container[0].comida_id + container[1].comida_id : container[0].comida_id } >{ container.map(containerItem => {
                return (
                    <Alimento key={ containerItem.comida_id } >
                        <AlimentoNome>{ containerItem.nome }</AlimentoNome>
                        <AlimentoImage src={ containerItem.img } />
                        {
                            macroCamps.map(macroCamp => <Macro>{ macroCamp }: { containerItem[macroCamp.toLowerCase()].toFixed(3) }</Macro>)
                        }
                    </Alimento>)
            }) }</div>
            const tamanhoContainer = container.length;
            for (let i = 0; i < tamanhoContainer; i++) {
                container.pop();
            }
            
            return containerText;
        }
        else {
            container.push(item);
        }
    }

    const searchAction = e => {
        if (e.target.value !== "") {
            let filteredData = DataAlimentos.filter(item => item.nome.toLowerCase().includes(e.target.value.toLowerCase()));

            setAlimentos(filteredData)
        }
        else {
            setAlimentos(DataAlimentos)
        }
    }

    useEffect(() => {
        getComida()
            .then(data => {
                setDataAlimentos(data);
                setAlimentos(data);
            })
            .catch(error => console.log(error.message));
    }, []);

    if (isAuthenticated()) {
        return (
            <AlimentosStyled darkMode={ darkMode } >
                <AlimentosMenu darkMode={ darkMode } >
                    <SearchInput type="text" onChange={ searchAction } />
                    <AlimentosParentContainer>
                        {
                            Alimentos.map(iterateAlimento)
                        }
                    </AlimentosParentContainer>
                </AlimentosMenu>
            </AlimentosStyled>
        );
    }
    else {
        window.location.pathname = "/login";
    }
}
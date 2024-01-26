import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { getComida } from '../../utils/api';
import { Alimento, AlimentoImage, AlimentoNome, AlimentosMenu, AlimentosParentContainer, AlimentosStyled, Macro, SearchInput } from './Alimentos.styled';

export function Alimentos() {
    const [DataAlimentos, setDataAlimentos] = useState([]);
    const [Alimentos, setAlimentos] = useState([]);

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
                        <Macro>Carb: { containerItem.carb.toFixed(3) }</Macro>
                        <Macro>Protl: { containerItem.protl.toFixed(3) }</Macro>
                        <Macro>Proth: { containerItem.proth.toFixed(3) }</Macro>
                        <Macro>Fat: { containerItem.fat.toFixed(3) }</Macro>
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
            <AlimentosStyled>
                <AlimentosMenu>
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
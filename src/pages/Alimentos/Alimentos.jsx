import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { getComida } from '../../utils/api';
import { Alimento, AlimentoImage, AlimentoNome, AlimentosContainer, AlimentosMenu, AlimentosParentContainer, AlimentosStyled, Macro, SearchInput } from './Alimentos.styled';
import useTheme from "../../context/ThemeContext";
import { useNavigate } from 'react-router-dom';
import { imageBufferToUrl } from '../../utils/imageBufferToUrl';

export function Alimentos() {
    const [DataAlimentos, setDataAlimentos] = useState([]);
    const [Alimentos, setAlimentos] = useState([]);
    const [macroCamps] = useState(["Carb", "Proth", "Protl", "Fat"]);

    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const container = [];
    let containerText = "";
    
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
                setIsLoaded(true);
            })
            .catch(error => console.log(error.message));
    }, []);

    if (isAuthenticated()) {
        return (
            <AlimentosStyled darkMode={ darkMode } >
                <AlimentosMenu darkMode={ darkMode } >
                    <SearchInput type="text" onChange={ searchAction } isLoaded={ isLoaded } />
                    <AlimentosParentContainer isLoaded={ isLoaded } >
                        {
                            Alimentos.map(containerItem =>
                                <Alimento key={ containerItem.comidaId } >
                                    <AlimentoNome>{ containerItem.nome }</AlimentoNome>
                                    <AlimentoImage src={ imageBufferToUrl(containerItem.image.data) } />
                                    {
                                        macroCamps.map(macroCamp => <Macro>{ macroCamp }: { containerItem[macroCamp.toLowerCase()].toFixed(3) }</Macro>)
                                    }
                                </Alimento>)
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
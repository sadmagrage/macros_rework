import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { getComida } from '../../utils/api';
import { Alimento, AlimentoImage, AlimentoNome, AlimentosContainer, AlimentosMenu, AlimentosParentContainer, AlimentosStyled, Macro, MacroContainer, SearchInput } from './Alimentos.styled';
import useTheme from "../../context/ThemeContext";
import { useNavigate } from 'react-router-dom';
import { imageBufferToUrl } from '../../utils/imageBufferToUrl';
import useComida from '../../context/ComidaContext';
import { toast } from 'react-toastify';

export function Alimentos() {
    const [dataComida, setDataComida] = useState([]);
    const [comida, setComida] = useState([]);
    const [macroCamps] = useState(["Carb", "Proth", "Protl", "Fat"]);

    const [isLoaded, setIsLoaded] = useState(false);

    const { comidaFetch, setComidaFetch } = useComida();
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    
    const searchAction = e => {
        if (e.target.value !== "") {
            let filteredData = dataComida.filter(item => item.nome.toLowerCase().includes(e.target.value.toLowerCase()));

            setComida(filteredData)
        }
        else {
            setComida(dataComida)
        }
    }

    useEffect(() => {
        if (comidaFetch.length == 0) {
            toast.dismiss();
            toast.loading("Carregando dados");

            getComida()
                .then(data => {
                    setComidaFetch(data);
                    toast.dismiss();
                    toast.success("Carregado com sucesso");
                })
                .catch(error => toast.error("Erro ao carregar"));
            }
    }, []);

    useEffect(() => {
        comidaFetch.map((item, index) => {
            const newComida = {};

            const alreadyHasInComida = comida.filter(comidaItem => item.comidaId == comidaItem.comidaId).length != 0;
            const alreadyHasInDataComida = dataComida.filter(comidaItem => item.comidaId == comidaItem.comidaId).length != 0;

            if (!alreadyHasInComida && !alreadyHasInDataComida) {
                Object.keys(item).map(prop => {
                    newComida[prop] = item[prop];
                    if (prop == "image") newComida[prop] = imageBufferToUrl(item.image.data);
                });

                if (!alreadyHasInComida) comida.push(newComida);
                if (!alreadyHasInDataComida) dataComida.push(newComida);
            }

            if (index == comidaFetch.length - 1) setIsLoaded(true);
        });
    }, [comidaFetch])

    if (isAuthenticated()) {
        return (
            <AlimentosStyled darkMode={ darkMode } >
                <AlimentosMenu darkMode={ darkMode } >
                    <SearchInput type="text" onChange={ searchAction } isLoaded={ isLoaded } />
                    <AlimentosParentContainer isLoaded={ isLoaded } >
                        {
                            comida.map(containerItem =>
                                <Alimento key={ containerItem.comidaId } >
                                    <AlimentoNome>{ containerItem.nome }</AlimentoNome>
                                    <AlimentoImage src={ containerItem.image } />
                                    <MacroContainer>
                                        {
                                            macroCamps.map(macroCamp => <Macro>{ macroCamp }: { containerItem[macroCamp.toLowerCase()].toFixed(3) }</Macro>)
                                        }
                                    </MacroContainer>
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
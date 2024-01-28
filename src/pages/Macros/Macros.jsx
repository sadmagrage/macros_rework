import React, { useEffect, useState } from 'react';
import { getComida, getSpent } from "../../utils/api";
import { isAuthenticated } from '../../utils/auth';
import { ContainerComida, FilterButton, FilterInput, InfoContainer, MacrosComida, MacrosContainer, MacrosScreen, Sugestions } from './Macros.styled';
import Comida from '../../components/Comida/Comida';
import Properties from '../../components/Properties/Properties';
import Sugestion from '../../components/Sugestions/Sugestion';
import useTheme from "../../context/ThemeContext";

export function Macros() {
    
    const [comida, setComida] = useState([]);
    const [dataComida, setDataComida] = useState([]);

    const [Carb, setCarb] = useState(0);
    const [Prot, setProt] = useState(0);
    const [Protl, setProtl] = useState(0);
    const [Proth, setProth] = useState(0);
    const [Fat, setFat] = useState(0);
    const [Kcal, setKcal] = useState(0);
    const [Gasto, setGasto] = useState(0);

    const [metaProth, setMetaProth] = useState(0);
    const [metaProtl, setMetaProtl] = useState(0);
    const [metaFat, setMetaFat] = useState(0);
    const [metaCarb, setMetaCarb] = useState(0);

    const [ComidaUtilizadas, setComidaUtilizadas] = useState([]);
    const [ApenasUtilizados, setApenasUtilizados] = useState(false);

    const [Atualizador, setAtualizador] = useState(0);
    const [appear, setAppear] = useState("");

    const { darkMode } = useTheme();

    const valueToMacros = () => {
        let carb = 0;
        let prot = 0;
        let protl = 0;
        let proth = 0;
        let fat = 0;

        ComidaUtilizadas.map(item => {
            const valor = item.value[item.value.length - 1] == "+" || item.value[item.value.length - 1] == "-" || item.value[item.value.length - 1] == "*" || item.value[item.value.length - 1] == "/" ? eval(item.value.slice(0, -1)) : eval(item.value) ;
            
            carb += item.carb * valor;
            protl += item.protl * valor;
            proth += item.proth * valor;
            fat += item.fat * valor;
        });
        prot = protl + proth;

        protl = protl > metaProtl ? metaProtl : protl ;
        proth = proth > metaProth ? metaProth : proth ;

        let kcal = (carb + prot) * 4 + fat * 9 ;
        
        setCarb(carb.toFixed(2));
        setProt(prot.toFixed(2));
        setProtl(protl.toFixed(2));
        setProth(proth.toFixed(2));
        setFat(fat.toFixed(2));
        setKcal(kcal.toFixed(2));
    }

    const autoGetValue = (id) => {
        const optionalComida = ComidaUtilizadas.filter(comida => comida.comida_id === id);
        
        if (optionalComida.length === 1) {
            return optionalComida[0].value;
        }
        else {
            return "";
        }
    }

    const inputComidaAction = (e, comidaItem) => {
        let comida = {};
        Object.keys(comidaItem).map(prop => {
            comida[prop] = comidaItem[prop];
        })

        comida["value"] = e.target.value

        if (e.target.value === "") {
            ComidaUtilizadas.splice(ComidaUtilizadas.findIndex(obj => obj.comida_id === comida.comida_id), 1);
        }
        else {
            const optionalComida = ComidaUtilizadas.filter(obj => obj.comida_id === comida.comida_id);

            if (optionalComida.length == 1) {
                optionalComida[0].value = e.target.value;
            }
            else {
                ComidaUtilizadas.push(comida);
            }
        }
        
        valueToMacros();
        localStorage.setItem("comida", JSON.stringify(ComidaUtilizadas));
        Atualizador == 0 ? setAtualizador(1) : setAtualizador(0);
    }

    const filterAction = () => {
        ApenasUtilizados ? setApenasUtilizados(false) : setApenasUtilizados(true);

        if (ApenasUtilizados) {
            setComida(dataComida);
        }
        else {
            setComida(ComidaUtilizadas);
        }

    }

    const filterByTextAction = (e) => {
        let filteredData = dataComida.filter(item => item.nome.toLowerCase().includes(e.target.value.toLowerCase()));

        e.target.value ==  "" ? setComida(dataComida) : setComida(filteredData);
    }

    let container = [];
    const macros = ["Carb", "Protl", "Proth", "Fat"];
    let containerText = "";

    useEffect(() => {

        getSpent()
            .then(data => {
                setGasto(data.gasto);
                
                setMetaCarb(parseFloat(data.metaCarb));
                setMetaProtl(parseFloat(data.metaProtl));
                setMetaProth(parseFloat(data.metaProth));
                setMetaFat(parseFloat(data.metaFat));
            })
            .catch(error => console.log(error.message));

        getComida()
            .then(data => {
                setComida(data);
                setDataComida(data);
            })
            .catch(error => console.log(error));

        const comidaStorage = localStorage.getItem("comida");

        if (comidaStorage) {
            setComidaUtilizadas(JSON.parse(comidaStorage));
            valueToMacros();
        };
    }, []);

    useEffect(valueToMacros, [ComidaUtilizadas]);

    if (isAuthenticated()) {
    return (
        <MacrosContainer darkMode={ darkMode } >
            <MacrosScreen darkMode={ darkMode } >
                <MacrosComida>
                    {
                        comida.map((item, index) => {
                            if (container.length == 1 || index === comida.length - 1) {
                                container.push(item);

                                containerText = <ContainerComida>{ container.map(comidaItem => <Comida name={ comidaItem.nome } img={ comidaItem.img } onInput={ e => inputComidaAction(e, comidaItem) } value={ autoGetValue(comidaItem.comida_id) } />) }</ContainerComida>

                                container = [];

                                return containerText;
                            }
                            else {
                                container.push(item);
                            }
                        })
                    }
                </MacrosComida>
                <InfoContainer>
                    <FilterButton type="button" onClick={ filterAction } value={ ApenasUtilizados ? "Mostrar todos alimentos" : "Mostrar apenas utilizados" } />
                    <FilterButton value="Esvaziar comida" type="button" onClick={ () => setComidaUtilizadas([]) } />
                    <FilterInput type="text" onChange={ filterByTextAction } />
                    <Properties macrosProperty={ { Carb, Prot, Proth, Protl, Fat, Kcal, Gasto } } />
                    <Sugestions>
                        {
                            macros.map(macro => <Sugestion onClick={ () => setAppear(appear == macro ? "" : macro) } active={ appear == macro } macro={ macro } dataComida={ dataComida } gasto={ Gasto } kcal={ Kcal } metaProth={ metaProth } metaProtl={ metaProtl } protl={ Protl } proth={ Proth } fat={ Fat } metaFat={ metaFat } />)
                        }
                    </Sugestions>
                </InfoContainer>
            </MacrosScreen>
        </MacrosContainer>
    );
    }
    else {
        window.location.pathname = "/login";
    }
}
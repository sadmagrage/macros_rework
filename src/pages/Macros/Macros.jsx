import { useEffect, useState } from "react";
import Comida from "../../components/Comida/Comida";
import Properties from "../../components/Properties/Properties";
import Sugestion from "../../components/Sugestions/Sugestion";
import { isAuthenticated } from "../../utils/auth";
import { FilterButton, FilterInput, InfoContainer, MacrosComida, MacrosContainer, MacrosScreen, Sugestions } from "./Macros.styled"
import { useNavigate } from "react-router-dom";
import useComida from "../../context/ComidaContext";
import useTheme from "../../context/ThemeContext";
import { getComida, getSpent } from "../../utils/api";
import { imageBufferToUrl } from "../../utils/imageBufferToUrl";
import { toast } from "react-toastify";

export function Macros () {

    const [comida, setComida] = useState([]);
    const [dataComida, setDataComida] = useState([]);

    const [carb, setCarb] = useState(0);
    const [prot, setProt] = useState(0);
    const [protl, setProtl] = useState(0);
    const [proth, setProth] = useState(0);
    const [fat, setFat] = useState(0);
    const [kcal, setKcal] = useState(0);
    const [gasto, setGasto] = useState(0);

    const [metaProth, setMetaProth] = useState(0);
    const [metaProtl, setMetaProtl] = useState(0);
    const [metaFat, setMetaFat] = useState(0);
    const [metaCarb, setMetaCarb] = useState(0);

    const [comidaUtilizadas, setComidaUtilizadas] = useState([]);
    const [apenasUtilizados, setApenasUtilizados] = useState(false);

    const [appear, setAppear] = useState("");
    const [designedHeight, setDesignedHeight] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const { darkMode } = useTheme();
    const { comidaFetch, setComidaFetch } = useComida();
    const navigate = useNavigate();

    const valueToMacros = () => {
        let carb = 0;
        let prot = 0;
        let protl = 0;
        let proth = 0;
        let fat = 0;

        comidaUtilizadas.map(item => {
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
    
    const autoGetValue = id => {
        const optionalComida = comidaUtilizadas.filter(comida => comida.comidaId === id);
        
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
            comidaUtilizadas.splice(comidaUtilizadas.findIndex(obj => obj.comidaId === comida.comidaId), 1);
        }
        else {
            const optionalComida = comidaUtilizadas.filter(obj => obj.comidaId === comida.comidaId);
    
            if (optionalComida.length == 1) {
                optionalComida[0].value = e.target.value;
            }
            else {
                comidaUtilizadas.push(comida);
            }
        }

        const saveComida = [];

        Promise.all(comidaUtilizadas.map(item => saveComida.push({ comidaId: item.comidaId, value: item.value })))
            .then(() => {
                localStorage.setItem("comida", JSON.stringify(saveComida));
                valueToMacros();
            })
    }
    
    const filterAction = () => {
        apenasUtilizados ? setApenasUtilizados(false) : setApenasUtilizados(true);
    
        if (apenasUtilizados) {
            setComida(dataComida);
        }
        else {
            setComida(comidaUtilizadas);
        }
    }
    
    const filterByTextAction = e => {
        let filteredData = dataComida.filter(item => item.nome.toLowerCase().includes(e.target.value.toLowerCase()));
    
        e.target.value ==  "" ? setComida(dataComida) : setComida(filteredData);
    }
    
    const macros = ["Carb", "Protl", "Proth", "Fat"];
    
    const resizeSugestions = () => {
        const containerElement = document.querySelector(".info_container");
    
        if (!containerElement) return;

        const containerHeight = document.querySelector(".info_container").clientHeight;
    
        let sumHeights = 0;
    
        containerElement.childNodes.forEach((child, index) => {
            const containerElementStyle = getComputedStyle(child);
    
            if (index !== containerElement.childNodes.length - 1) sumHeights += child.clientHeight;
    
            sumHeights += parseFloat(containerElementStyle.paddingTop);
            sumHeights += parseFloat(containerElementStyle.marginTop);
            sumHeights += parseFloat(containerElementStyle.paddingBottom);
            sumHeights += parseFloat(containerElementStyle.marginBottom);
        });
        
        setDesignedHeight(containerHeight - sumHeights);
    }

    useEffect(() => {
        window.addEventListener('resize', resizeSugestions);
        resizeSugestions();
    }, []);

    useEffect(valueToMacros, [comidaUtilizadas]);

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
        const comidaStorage = JSON.parse(localStorage.getItem("comida"));
        
        if (comidaStorage) {
            const comidaUtilizadasStorage = [];

            Promise.all(comidaStorage.map(comidaStorageItem => {
                const comidaUtilizadasStorageItem = {};

                const comidaSearchResult = dataComida.filter(dataComidaItem => dataComidaItem.comidaId == comidaStorageItem.comidaId);
                if (comidaSearchResult.length > 0) {
                    const comidaItem = comidaSearchResult[0];
                    
                    Object.keys(comidaItem).map(prop => {
                        comidaUtilizadasStorageItem[prop] = comidaItem[prop];
                    });

                    comidaUtilizadasStorageItem["value"] = comidaStorageItem.value;

                    comidaUtilizadasStorage.push(comidaUtilizadasStorageItem);
                }
            }))
            .then(() => {
                setComidaUtilizadas(comidaUtilizadasStorage);
                valueToMacros();
            });
        };
    }, [isLoaded]);

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
            <MacrosContainer darkMode={ darkMode } >
                <MacrosScreen darkMode={ darkMode } >
                    <MacrosComida>
                        {
                            comida.map(comidaItem => <Comida name={ comidaItem.nome } img={ comidaItem.image } onInput={ e => inputComidaAction(e, comidaItem) } value={ autoGetValue(comidaItem.comidaId) } />)
                        }
                    </MacrosComida>
                    <InfoContainer className='info_container' >
                        <FilterButton type="button" onClick={ filterAction } value={ apenasUtilizados ? "Mostrar todos alimentos" : "Mostrar apenas utilizados" } />
                        <FilterButton value="Esvaziar comida" type="button" onClick={ () => setComidaUtilizadas([]) } />
                        <FilterInput placeholder='Digite o nome do alimento' type="text" onChange={ filterByTextAction } />
                        <Properties macrosProperty={ { carb, prot, proth, protl, fat, kcal, gasto } } />
                        <Sugestions designedHeight={ designedHeight } >
                            {
                                macros.map(macro => <Sugestion onClick={ () => setAppear(appear == macro ? "" : macro) } active={ appear == macro } macro={ macro } dataComida={ dataComida } gasto={ gasto } kcal={ kcal } metaProth={ metaProth } metaProtl={ metaProtl } protl={ protl } proth={ proth } fat={ fat } metaFat={ metaFat } />)
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
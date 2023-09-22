import React, { useEffect, useState } from 'react';
import { getComida, getData, getSpent } from "../../utils/api";
import { isAuthenticated } from '../../utils/auth';
import "./Macros.css";

export function Macros() {
    
    const [Comida, setComida] = useState([]);
    const [DataComida, setDataComida] = useState([]);

    const [Carb, setCarb] = useState(0);
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

    const valueToMacros = () => {
        let carb = 0;
        let protl = 0;
        let proth = 0;
        let fat = 0;

        ComidaUtilizadas.map(item => {
            carb += item.carb * item.value;
            protl += item.protl * item.value;
            proth += item.proth * item.value;
            fat += item.fat * item.value;
        });

        protl = protl > metaProtl ? metaProtl : protl ;
        proth = proth > metaProth ? metaProth : proth ;

        let kcal = (carb + protl + proth) * 4 + fat * 9 ;

        setCarb(carb.toFixed(2));
        setProtl(protl.toFixed(2));
        setProth(proth.toFixed(2));
        setFat(fat.toFixed(2));
        setKcal(kcal.toFixed(2));
    }

    const sugestionItem = (item, comida, index) => {

        if ((item === "Carb" && comida.carb >= 0.2 && comida.carb < 1) || (item === "Carb" && comida.nome.toLowerCase() === "suco prats") || (item === "Carb" && comida.nome.toLowerCase() === "feijao")) {
      
            const faltaCarb = (metaCarb - Carb + ((metaFat - Fat) * 9 / 4))/(comida.carb+comida.fat * 9 / 4);

            return (
                <div className='sugestion'>
                    <h3 className='sugestion-name'>{ comida.nome }</h3>
                    <div className='sugestion-data'>
                        <img className='sugestion-img' src={ comida.img } />
                        <h4 className='sugestion-value'>{ faltaCarb.toFixed(2) }</h4>
                    </div>
                </div>
            );
        }
        else if (item === "Protl" && index == DataComida.length - 1){
            const faltaProtl = (metaProtl - Protl);
            
            return (
                <div className='no-sugestion'>
                    <p className='sugestion-no-value'>Falta { faltaProtl.toFixed(2) }g de protl</p>
                </div>
            );
        }
        else if (item === "Proth" && comida.proth > 0) {
            const faltaProth = (metaProth - Proth) / comida.proth;
            
            return (
                <div className='sugestion'>
                    <h3 className='sugestion-name'>{ comida.nome }</h3>
                    <div className='sugestion-data'>
                        <img className='sugestion-img' src={ comida.img } />
                        <h4 className='sugestion-value'>{ faltaProth.toFixed(2) }</h4>
                    </div>
                </div>
            );
        }
        else if (item === "Fat" && index == DataComida.length - 1) {
            const faltaFat = (metaFat - Fat);

            return (
                <div className='no-sugestion'>
                    <p className='sugestion-no-value'>Falta { faltaFat.toFixed(2) }g de gordura</p>
                </div>
            );
        }
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

    const sugestAnimation = (e) => {
        const element = e.currentTarget.childNodes[1];

        const isOpen = element.classList.contains("open");

        if (isOpen) {
            element.classList.toggle("open");
            return;
        }

        const listOpen = document.querySelectorAll(".open");

        if (listOpen.length > 0) {
            listOpen[0].classList.toggle("open");
        }

        element.classList.toggle("open");
    }

    const container = [];
    const macros = ["Carb", "Protl", "Proth", "Fat"];
    let containerText = "";

    useEffect(() => {

        getSpent()
            .then(data => {
                setGasto(data.gasto);
                
                setMetaCarb(data.metaCarb);
                setMetaProtl(data.metaProtl);
                setMetaProth(data.metaProth);
                setMetaFat(data.metaFat);
            })
            .catch(error => console.log(error.message));

        getComida()
            .then(data => {
                setComida(data);
                setDataComida(data);
            })
            .catch(error => console.log(error));
    }, []);

    if (isAuthenticated()) {
    return (
        <div className='macros'>
            <div className='macros_container'>
                <div className='macros_comida'>
                    {
                        Comida.map( (item, index) => {
                            if (container.length > 0 || index === Comida.length - 1) {
                                container.push(item);
                                containerText = <div className='container_comida'>{ container.map(containerItem => {
                                    return (
                                        <div className='comida' >
                                            <h3 className='comida_title'>{ containerItem.nome }</h3>
                                            <img className='comida_img' src={ containerItem.img } />
                                            <input type="number" className='white-input' value={ autoGetValue(containerItem.comida_id) } onChange={ (e) => {
                                                let comida = {};
                                                Object.keys(containerItem).map(prop => {
                                                    comida[prop] = containerItem[prop];
                                                })

                                                comida["value"] = (e.target.value === "") ? 0 : parseFloat(e.target.value)

                                                if (e.target.value === "") {
                                                    ComidaUtilizadas.splice(ComidaUtilizadas.findIndex(obj => obj.comida_id === comida.comida_id), 1);
                                                }
                                                else {
                                                    const optionalComida = ComidaUtilizadas.filter(obj => obj.comida_id === comida.comida_id);

                                                    if (optionalComida.length == 1) {
                                                        optionalComida[0].value = parseFloat(e.target.value);
                                                    }
                                                    else {
                                                        ComidaUtilizadas.push(comida);
                                                    }
                                                }
                                                
                                                valueToMacros();
                                            } } />
                                        </div>)
                                }) }</div>;
                                
                                const tamanhoContainer = container.length;
                                for(let i = 0; i < tamanhoContainer; i++) {
                                    container.pop();
                                }

                                return containerText;
                            }
                            else {
                                container.push(item);
                            }
                        })
                    }
                </div>
                <div className='properties_container'>
                    <input type="text" onChange={ (e) => {
                        let filteredData = DataComida.filter(item => item.nome.toLowerCase().includes(e.target.value.toLowerCase()));

                        e.target.value ==  "" ? setComida(DataComida) : setComida(filteredData);
                    } } className='white-input' />
                    <div className='properties'>
                        <p className='macro_value'>Carb: { Carb }</p>
                        <p className='macro_value'>Protl: { Protl }</p>
                        <p className='macro_value'>Proth: { Proth }</p>
                        <p className='macro_value'>Fat: { Fat }</p>
                        <p className='macro_value'>Kcal: { Kcal }</p>
                        <p className='macro_value'>Gasto: { Gasto }</p>
                    </div>
                    <div className='sugestions'>
                        {
                            macros.map(item => {
                                return (
                                    <div className='macro-sugestion' onClick={ (e) => sugestAnimation(e) } >
                                        <div className='description'>
                                            <p className='macro-name'>{ item }</p>
                                            <p className='bottom-arrow'>v</p>
                                        </div>
                                        <div className='container-comida-sugestion wrapper'>
                                            <div className='comida-sugestion expandable' >
                                            {
                                                DataComida.map((comida, index) => sugestionItem(item, comida, index))
                                            }
                                            </div>
                                        </div>
                                    </div>
                                )       
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
    }
    else {
        window.location.pathname = "/login";
    }
}
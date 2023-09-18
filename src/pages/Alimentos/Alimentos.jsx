import React, { useEffect, useState } from 'react';
import './Alimentos.css'
import { isAuthenticated } from '../../utils/auth';
import { getComida } from '../../utils/api';

export function Alimentos() {
    const [DataAlimentos, setDataAlimentos] = useState([]);
    const [Alimentos, setAlimentos] = useState([]);
    const [AfterFetch, setAfterFetch] = useState(false);

    const container = [];
    let containerText = "";

    useEffect(() => {
        getComida()
            .then(data => {
                setDataAlimentos(data);
                setAlimentos(data);
                setAfterFetch(true);
            })
            .catch(error => console.log(error.message));
    }, []);

    if (isAuthenticated()) {
        return (
            <div className={ AfterFetch ? 'alimentos after_fetch' : 'alimentos' }>
                <input type="text" className='search-input' onChange={ (e) => {
                    if (e.target.value !== "") {
                        let filteredData = DataAlimentos.filter(item => item.nome.toLowerCase().includes(e.target.value.toLowerCase()));

                        if (filteredData.length < 2) setAfterFetch(false);

                        setAlimentos(filteredData)
                    }
                    else {
                        setAfterFetch(true);
                        setAlimentos(DataAlimentos)
                    }
                } } />
                <div className='alimentos_menu'>
                    <div className='alimentos_parent_container'>
                    {
                        Alimentos.map( (item, index) => {

                            if (container.length > 0 || index === Alimentos.length - 1) {
                                container.push(item);
                                containerText = <div className="container_alimento" key={ container.length === 2 ? container[0].comida_id + container[1].comida_id : container[0].comida_id } >{ container.map(containerItem => {
                                    return (
                                        <div className='alimento' key={ containerItem.comida_id } >
                                            <h3 className='alimento_nome'>{ containerItem.nome }</h3>
                                            <img className='alimento_image' src={ containerItem.img } />
                                            <p className='macro'>Carb: { containerItem.carb.toFixed(3) }</p>
                                            <p className='macro'>Protl: { containerItem.protl.toFixed(3) }</p>
                                            <p className='macro'>Proth: { containerItem.proth.toFixed(3) }</p>
                                            <p className='macro'>Fat: { containerItem.fat.toFixed(3) }</p>
                                        </div>)
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
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }
    else {
        window.location.pathname = "/login";
    }
}
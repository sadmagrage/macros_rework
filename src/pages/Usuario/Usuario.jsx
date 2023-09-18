import React, { useEffect, useState } from "react";
import { getData, updateUserImg, updateUserSettings } from "../../utils/api";
import { isAuthenticated } from "../../utils/auth";
import "./Usuario.css";

export function Usuario() {
    
    const [DataUser, setDataUser] = useState({});
    const [SelectedEstado, setSelectedEstado] = useState("");
    const [Treino, setTreino] = useState({});
    const [Atualizador, setAtualizador] = useState(0);

    const handleSubmitImg = async () => {
        
        try {
            const formData = new FormData(document.querySelector(".alterar_foto"));

            const img = Object.fromEntries(formData);

            updateUserImg(img)
                .then(() => window.location.pathname = "/")
                .catch(error => console.log(error));

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {

        try {
            const formData = new FormData(document.querySelector(".preferencias_form"));

            const body = Object.fromEntries(formData)

            Object.keys(body).map(item => {
                if (item.includes("_")) {
                    delete body[item];
                }
            });

            body["peso"] = parseFloat(body["peso"]);
            body["bodyfat"] = parseFloat(body["bodyfat"]);
            body["altura"] = parseFloat(body["altura"]);
            body["idade"] = parseFloat(body["idade"]);
            body["superavit"] = parseFloat(body["superavit"]);
            body["deficit"] = parseFloat(body["deficit"]);
            body["adicional"] = parseFloat(body["adicional"]);
            body["treino"] = Treino;
            
            updateUserSettings(body)
                .then(() => window.location.pathname = "/")
                .catch(error => console.log(error.message));

        } catch (error) {
            console.log(error.message)
        }
    };

    useEffect(() => {
        getData()
            .then(data => {
                setDataUser(data)
                setSelectedEstado(data.estado)

                const newTreino = {
                    "domingo": data.treino.domingo,
                    "segunda": data.treino.segunda,
                    "terca": data.treino.terca,
                    "quarta": data.treino.quarta,
                    "quinta": data.treino.quinta,
                    "sexta": data.treino.sexta,
                    "sabado": data.treino.sabado
                };

                setTreino(newTreino)
            })
            .catch(error => console.log(error));
    }, [])

    if (isAuthenticated()) {

        return (
            <div className="usuario">
                <div className="usuario_config">
                    <form className="alterar_foto" onSubmit={ async (e) => {
                        e.preventDefault();
                        await handleSubmitImg();
                    } } >
                        <h2 className="alterar_foto_title">Alterar foto</h2>
                        <img className="alterar_foto_img" src={ DataUser.img } />
                        <input className="form-input" type="text" name="img" />
                        <br/>
                        <input type="submit" className="form-button" value="Enviar" />
                    </form>
                    <div className="preferencias">
                        <h2 className="preferencias_title">Preferências</h2>
                        <form className="preferencias_form" onSubmit={ async (e) => {
                            e.preventDefault();
                            await handleSubmit();
                        }} >
                            {   Object.keys(Treino).map(dia => {
                                    return (
                                        <div className="dias_da_semana" key={ dia } >
                                            <label className="form-label dias_da_semana_title">{ dia.charAt(0).toUpperCase() + dia.slice(1) }</label>
                                            <div className="container_input">
                                                { Treino[dia].map((item) => {
                                                    return (
                                                        <div className="new_input">
                                                            <select className="form-select" value={ item.treino } onChange={ (e) => {
                                                                e.target.parentElement.childNodes[1].name = `${dia.toLowerCase()}_${e.target.value}`
                                                                
                                                                item.treino = e.target.value
                                                                setAtualizador(Atualizador == 1 ? 0 : 1);
                                                                } } >
                                                                <option value="supino" >Supino</option>
                                                                <option value="terra" >Terra</option>
                                                                <option value="stiff" >Stiff</option>
                                                                <option value="agacho" >Agacho</option>
                                                                <option value="restante" >Restante</option>
                                                                <option value="velocidade" >Velocidade</option>
                                                                <option value="minuto" >Minuto</option>
                                                                <option value="adicional" >Adicional</option>
                                                            </select>
                                                            <input className="form-input treino-input" type="number" value={ item.serie } onChange={ (e) => {
                                                                item.serie = e.target.value
                                                                setAtualizador(Atualizador == 1 ? 0 : 1);
                                                            } } name={ `${dia.toLowerCase()}_supino` } />
                                                            <p className="close_icon" onClick={ () => {
                                                                Treino[dia].splice(Treino[dia].indexOf(item), 1);
                                                                setAtualizador(Atualizador == 1 ? 0 : 1)
                                                            } } >X</p>
                                                        </div>
                                                    )
                                                }) }
                                                <p className="plus_icon" onClick={ () => {
                                                    const newItem = { "treino": "supino", "serie": 0 }

                                                    Treino[dia].push(newItem)
                                                    setAtualizador(Atualizador == 1 ? 0 : 1);
                                                } } >+</p>
                                            </div>
                                        </div>)
                            }) }
                            <div className="form-superavit">
                                <label className="form-label">Peso:</label>
                                <input type="number" name="peso" className="form-input treino-input" defaultValue={ DataUser.peso } />
                            </div>
                            <div className="form-superavit">
                                <label className="form-label">BodyFat em %:</label>
                                <input type="number" name="bodyfat" className="form-input treino-input" defaultValue={ DataUser.bodyfat } />
                            </div>
                            <div className="form-superavit">
                                <label className="form-label">Altura em cm:</label>
                                <input type="number" name="altura" className="form-input treino-input" defaultValue={ DataUser.altura } />
                            </div>
                            <div className="form-superavit">
                                <label className="form-label">Idade:</label>
                                <input type="number" name="idade" className="form-input treino-input" defaultValue={ DataUser.idade } />
                            </div>
                            <div className="form-superavit">
                                <label className="form-label">Superavit em %:</label>
                                <input type="number" name="superavit" className="form-input treino-input" defaultValue={ DataUser.superavit } />
                            </div>
                            <div className="form-deficit">
                                <label className="form-label">Deficit em kcal:</label>
                                <input type="number" name="deficit" className="form-input treino-input" defaultValue={ DataUser.deficit } />
                            </div>
                            <div className="form-superavit">
                                <label className="form-label">Adicional:</label>
                                <input type="number" name="adicional" className="form-input treino-input" defaultValue={ DataUser.adicional } />
                            </div>
                            <div className="form-superavit">
                                <label className="form-label">Estado atual: </label>
                                <select name="estado" value={ SelectedEstado } onChange={ (e) => setSelectedEstado(e.target.value) } className="form-select" >
                                    <option value="bulking" >Bulking</option>
                                    <option value="manutencao" >Manutenção</option>
                                    <option value="cutting" >Cutting</option>
                                </select>
                            </div>
                            <br/>
                            <input type="submit" className="form-button" value="Enviar" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    else {
        window.location.pathname = "/login";
    }
}
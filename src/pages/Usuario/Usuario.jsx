import React, { useEffect, useState } from "react";
import { updateImage, updateData } from "../../utils/api";
import { isAuthenticated, setAuthToken } from "../../utils/auth";
import "./Usuario.css";
import { decodeToken } from "../../utils/decodeToken";

export function Usuario() {
    
    const [DataUser, setDataUser] = useState({});
    const [SelectedEstado, setSelectedEstado] = useState("");
    const [FatorAtividade, setFatorAtividade] = useState("");
    const [FileArrayBuffer, setFileArrayBuffer] = useState({});
    const [Atualizador, setAtualizador] = useState(0);

    const blobToImg = (img) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileContent = event.target.result;

            const blob = new Blob([fileContent], { type: img.type });

            const blobURL = URL.createObjectURL(blob);

            DataUser.img = blobURL;
            Atualizador == 1 ? setAtualizador(0) : setAtualizador(1);
        }

        reader.readAsArrayBuffer(img);
    }

    const handleSubmitImg = async () => {
        
        try {

            const formData = new FormData(document.querySelector(".alterar_foto"));

            updateImage(formData)
                .then(token => {
                    setAuthToken(token);
                    window.location.pathname = "/";
                })
                .catch(error => console.log(error));

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {

        try {
            const formData = new FormData(document.querySelector(".preferencias_form"));

            const body = Object.fromEntries(formData)

            body["peso"] = parseFloat(body["peso"]);
            body["bodyfat"] = parseFloat(body["bodyfat"]);

            if (FatorAtividade != "outro") {
                if (FatorAtividade == "sedentario") {
                    body["fator_atividade"] = 1.2;
                }
                else if (FatorAtividade == "levemente-ativo") {
                    body["fator_atividade"] = 1.375;
                }
                else if (FatorAtividade == "moderadamente-ativo") {
                    body["fator_atividade"] = 1.55;
                }
                else if (FatorAtividade == "muito-ativo") {
                    body["fator_atividade"] = 1.725;
                }
                else if (FatorAtividade == "extremamente-ativo") {
                    body["fator_atividade"] = 1.9;
                }
            }
            else {
                body["fator_atividade"] = parseFloat(body["fator_atividade"]);
            }
            
            body["superavit"] = parseFloat(body["superavit"]);
            body["deficit"] = parseFloat(body["deficit"]);
            body["adicional"] = parseFloat(body["adicional"]);
            
            updateData(body)
                .then((token) => {
                    setAuthToken(token);
                    window.location.pathname = "/"
                })
                .catch(error => console.log(error.message));

        } catch (error) {
            console.log(error.message)
        }
    };

    useEffect(() => {

        const data = decodeToken();
    
        setDataUser(data);
        setSelectedEstado(data.estado)
        switch (data.fator_atividade) {
            case 1.2:
                setFatorAtividade("sedentario")
                break;
            case 1.375:
                setFatorAtividade("levemente-ativo");
                break;
            case 1.55:
                setFatorAtividade("moderadamente-ativo");
                break;
            case 1.725:
                setFatorAtividade("muito-ativo");
                break;
            case 1.9:
                setFatorAtividade("extremamente-ativo");
                break;
            default:
                setFatorAtividade("outro")
                break;
        }
        setAtualizador(Atualizador == 1 ? 0 : 1);
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
                        <input className="form-input" type="file" name="img" onChange={ (e) => {
                            const img = e.target.files[0];

                            setFileArrayBuffer(img);
                            blobToImg(img);
                        } } />
                        <br/>
                        <input type="submit" className="form-button" value="Enviar" />
                    </form>
                    <div className="preferencias">
                        <h2 className="preferencias_title">Preferências</h2>
                        <form className="preferencias_form" onSubmit={ async (e) => {
                            e.preventDefault();
                            await handleSubmit();
                        }} >
                            <div className="form-superavit">
                                <label className="form-label">Peso:</label>
                                <input type="number" name="peso" className="form-input treino-input" defaultValue={ DataUser.peso } />
                            </div>
                            <div className="form-superavit">
                                <label className="form-label">BodyFat em %:</label>
                                <input type="number" name="bodyfat" className="form-input treino-input" defaultValue={ DataUser.bodyfat } />
                            </div>
                            <label className="form-label">Fator de atividade:</label>
                            <div className="form-fator-atividade">
                                <label className="form-label"><input className="radio-fator-atividade" type="radio" name="fator_atividade" value="sedentario" checked={ FatorAtividade == "sedentario" } onChange={ () => setFatorAtividade("sedentario") } />Sedentário - 1.2</label>
                                <br/>
                                <label className="form-label"><input className="radio-fator-atividade" type="radio" name="fator_atividade" value="levemente-ativo" checked={ FatorAtividade == "levemente-ativo" } onChange={ () => setFatorAtividade("levemente-ativo") } />Levemente ativo - 1.375</label>
                                <br/>
                                <label className="form-label"><input className="radio-fator-atividade" type="radio" name="fator_atividade" value="moderadamente-ativo" checked={ FatorAtividade == "moderadamente-ativo" }  onChange={ () => setFatorAtividade("moderadamente-ativo") }/>Moderadamente ativo - 1.55</label>
                                <br/>
                                <label className="form-label"><input className="radio-fator-atividade" type="radio" name="fator_atividade" value="muito-ativo" checked={ FatorAtividade == "muito-ativo" }  onChange={ () => setFatorAtividade("muito-ativo") }/>Muito ativo - 1.725</label>
                                <br/>
                                <label className="form-label"><input className="radio-fator-atividade" type="radio" name="fator_atividade" value="extremamente-ativo" checked={ FatorAtividade == "extremamente-ativo" }  onChange={ () => setFatorAtividade("extremamente-ativo") }/>Extremamente ativo - 1.9</label>
                                <br/>
                                <label className="form-label"><input className="radio-fator-atividade" type="radio" name="fator_atividade" value="outro" checked={ FatorAtividade == "outro" }  onChange={ () => setFatorAtividade("outro") }/>Outro</label>
                                <input type="text" name="fator_atividade" className="form-input treino-input" defaultValue={ DataUser.fator_atividade } />
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
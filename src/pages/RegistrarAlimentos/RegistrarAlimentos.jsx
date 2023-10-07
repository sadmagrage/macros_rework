import React from "react";
import { createComida } from "../../utils/api";
import { isAuthenticated } from "../../utils/auth";
import "./RegistrarAlimentos.css";

export function RegistrarAlimentos() {

    const handleSubmit = async () => {
        
        const formElement = document.querySelector(".form_alimentos");
        const formData = new FormData(formElement);

        const body = Object.fromEntries(formData);

        body.quantidade = (body.quantidade == "") ? 1 : parseFloat(body.quantidade);

        body.carb = (body.carb == "") ? 0 : parseFloat(body.carb);
        body.protl = (body.protl == "") ? 0 : parseFloat(body.protl);
        body.proth = (body.proth == "") ? 0 : parseFloat(body.proth);
        body.fat = (body.fat == "") ? 0 : parseFloat(body.fat);

        createComida(body)
            .then(() => window.location.pathname = "/")
            .catch(error => console.log(error.message));
    }

    if (isAuthenticated()) {
        return (
            <div className="registrar_alimento">
                <div className="form-container form-container-alimento">
                    <h3 className="form_title">Registrar alimento</h3>
                    <form onSubmit={ async (e) => {
                        e.preventDefault();
                        await handleSubmit();
                    } } className="form_alimentos" >
                        <label className="form-label">Nome</label>
                        <br/>
                        <input className="form-input" type="text" name="nome" />
                        <br/>
                        <label className="form-label">Quantidade</label>
                        <br/>
                        <input className="form-input" type="text" name="quantidade" />
                        <br/>
                        <label className="form-label">Carb</label>
                        <br/>
                        <input className="form-input" type="text" name="carb" />
                        <br/>
                        <label className="form-label">Protl</label>
                        <br/>
                        <input className="form-input" type="text" name="protl" />
                        <br/>
                        <label className="form-label">Proth</label>
                        <br/>
                        <input className="form-input" type="text" name="proth" />
                        <br/>
                        <label className="form-label">Fat</label>
                        <br/>
                        <input className="form-input" type="text" name="fat" />
                        <br/>
                        <label className="form-label">Image link</label>
                        <br/>
                        <input className="form-input" type="text" name="img" />
                        <br/>
                        <input className="form-button" type="submit" value="Enviar" />
                    </form>
                </div>
            </div>
        );
    }
    else {
        window.location.pathname = "/login";
    }
}
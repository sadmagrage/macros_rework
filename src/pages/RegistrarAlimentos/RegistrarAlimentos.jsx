import React, { useState } from "react";
import { createComida } from "../../utils/api";
import { isAuthenticated } from "../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormContainerAlimento, RegistrarAlimentoButton, RegistrarAlimentoContainer, RegistrarAlimentoForm, RegistrarAlimentoInput, RegistrarAlimentoLabel, RegistrarAlimentoTitle } from "./RegistrarAlimentos.styled";
import useTheme from "../../context/ThemeContext";

export function RegistrarAlimentos() {

    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const [formCamp] = useState(["Nome", "Quantidade", "Carb", "Protl", "Proth", "Fat", "Image link"]);
    const [formBody] = useState({
        nome: "",
        quantidade: "",
        carb: "",
        protl: "",
        proth: "",
        fat: ""
    });

    const createAlimento = async () => {

        formBody.quantidade = (formBody.quantidade == "") ? 1 : parseFloat(formBody.quantidade);

        formBody.carb = (formBody.carb == "") ? 0 : parseFloat(formBody.carb);
        formBody.protl = (formBody.protl == "") ? 0 : parseFloat(formBody.protl);
        formBody.proth = (formBody.proth == "") ? 0 : parseFloat(formBody.proth);
        formBody.fat = (formBody.fat == "") ? 0 : parseFloat(formBody.fat);

        toast.info("Registrando alimento");

        createComida(formBody)
            .then(() => {
                toast.dismiss();
                toast.success("Alimento registrado");
                navigate("/");
            })
            .catch(() => {
                toast.dismiss();
                toast.error("Erro ao registrar alimento");
            });
    }

    const changeBodyProperty = (e, camp) => formBody[camp.toLowerCase()] = e.target.value;

    if (isAuthenticated()) {
        return (
            <RegistrarAlimentoContainer darkMode={ darkMode } >
                <FormContainerAlimento darkMode={ darkMode } >
                    <RegistrarAlimentoTitle>Registrar alimentos</RegistrarAlimentoTitle>
                    <RegistrarAlimentoForm>
                        {
                            formCamp.map(camp => 
                            <div>
                                <RegistrarAlimentoLabel>{ camp }</RegistrarAlimentoLabel>
                                <br/>
                                <RegistrarAlimentoInput type="text" onChange={ e => changeBodyProperty(e, camp) } />
                                <br/>
                            </div>)
                        }
                        <RegistrarAlimentoButton type="button" value="Enviar" onClick={ createAlimento } />
                    </RegistrarAlimentoForm>
                </FormContainerAlimento>
            </RegistrarAlimentoContainer>
        );
    }
    else {
        window.location.pathname = "/login";
    }
}
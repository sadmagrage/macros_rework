import React, { useState } from "react";
import { activateApi, login as loginApi, register } from "../../utils/api";
import { setAuthToken } from "../../utils/auth";
import "./Login.css"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Login() {

    const [Permission, setPermission] = useState(false);
    const navigate = useNavigate();

    activateApi()
        .then(data => {
            setPermission(data.permission)
        })
        .catch(error => console.log(error.message));

    const handleSubmitLogin = async (e) => {
        const formData = new FormData(document.querySelector(".form_login"));
        const body = Object.fromEntries(formData);

        toast.loading("Fazendo login", { autoClose: false });

        loginApi(body)
            .then(token => {
                setAuthToken(token);
                toast.dismiss();
                toast.success('Login realizado com sucesso');
                navigate("/");
            }).
            catch(() => {
                toast.dismiss();
                toast.error('Credenciais incorretas');
            });
    };

    const handleSubmitRegister = async (e) => {
        const formData = new FormData(document.querySelector(".form_login"));

        const body = Object.fromEntries(formData);

        toast.loading("Fazendo registro", { autoClose: false });
        
        register(body)
            .then(token => {
                setAuthToken(token);
                toast.dismiss();
                toast.success('Registro realizado com sucesso');
                navigate("/");
            })
            .catch(() => {
                toast.dismiss();
                toast.error("Erro ao cadastrar");
            });
    }

    const loginAsGuest = () => {
        const body = {
            "username": "teste",
            "password": "123"
        };

        loginApi(body)
            .then(response => {
                console.log(response.data);
                window.location.pathname = "/";
            })
            .catch(error => console.log(error.message));
    };
    
    const [login, setLogin] = useState(true);

    return login ? (
        <div className="login">
            <div className="form-container">
                <h3 className="form_title">Login</h3>
                <form className="form_login" onSubmit={ async (e) => {
                    e.preventDefault();
                    await handleSubmitLogin(e);
                } } >
                    <label className="form-label">Username: </label>
                    <br/>
                    <input type="text" name="username" className="form-input" />
                    <br/>
                    <label className="form-label">Password: </label>
                    <br/>
                    <input type="password" name="password" className="form-input" />
                    <br/>
                    <p className="to_register" onClick={ () => setLogin(false) }>Não tem uma conta ? Clique para registrar-se</p>
                    <br/>
                    <input type="submit" className="form-button" value={ Permission ? "Enviar" : "Carregando ..." } />
                    <input type="button" onClick={ () => loginAsGuest() } className="form-button" value={ Permission ? "Entrar como convidado" : "Carregando ..." } />
                </form>
            </div>
        </div>
    ) : (
        <div className="login">
            <div className="form-container">
                <h3 className="form_title">Registrar</h3>
                <form className="form_login" onSubmit={ async (e) => {
                    e.preventDefault();
                    await handleSubmitRegister(e);
                } } >
                    <label className="form-label">Username: </label>
                    <br/>
                    <input type="text" name="username" className="form-input" />
                    <br/>
                    <label className="form-label">Password: </label>
                    <br/>
                    <input type="password" name="password" className="form-input" />
                    <br/>
                    <p className="to_register" onClick={ () => setLogin(true) }>Voltar para a tela de login</p>
                    <br/>
                    <input type="submit" className="form-button" value={ Permission ? "Enviar" : "Carregando ..." } />
                    <input type="button" onClick={ () => loginAsGuest() } className="form-button" value={ Permission ? "Entrar como convidado" : "Carregando ..." } />
                </form>
            </div>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import { getUserImage, login as loginApi, register } from "../../utils/api";
import { setAuthToken } from "../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Form, FormButton, FormChanger, FormContainer, FormInput, FormLabel, FormTitle, LoginContainer } from "./Login.styled";
import useTheme from "../../context/ThemeContext";
import useUserImage from "../../context/UserImageContext";
import { imageBufferToUrl } from "../../utils/imageBufferToUrl";

export function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUserImage, userImage } = useUserImage();
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        toast.loading("Fazendo login", { autoClose: false });

        loginApi({ username, password })
            .then(token => setAuthToken(token))
            .then(() => {
                toast.dismiss();
                toast.success('Login realizado com sucesso');
                navigate("/");
            }).
            catch(error => {
                toast.dismiss();
                toast.error('Credenciais incorretas');
            });
    };

    const handleSubmitRegister = async (e) => {
        toast.loading("Fazendo registro", { autoClose: false });
        
        register({ username, password })
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
        loginApi({ "username": "teste", "password": "123" })
            .then(() => {
                window.location.pathname = "/";
            })
            .catch(error => console.log(error.message));
    };
    
    const [login, setLogin] = useState(true);

    return (
        <LoginContainer darkMode={ darkMode } >
            <FormContainer darkMode={ darkMode } >
                <FormTitle darkMode={ darkMode } >{  login ? "Login" : "Registrar" }</FormTitle>
                <Form>
                    <FormLabel darkMode={ darkMode }  name="username" >Username: </FormLabel>
                    <br/>
                    <FormInput darkMode={ darkMode }  type="text" name="username" onChange={ (e) => setUsername(e.target.value) } />
                    <br/>
                    <FormLabel darkMode={ darkMode }  name="password">Password: </FormLabel>
                    <br/>
                    <FormInput darkMode={ darkMode }  type="password" name="password" onChange={ (e) => setPassword(e.target.value) } />
                    <br/>
                    <FormChanger onClick={ () => setLogin(!login) } >{ login ? "Não tem uma conta ? Clique aqui para se registrar" : "Voltar para a tela de login" }</FormChanger>
                    <br/>
                    <FormButton type="button" value="Enviar" onClick={ async (e) => { login ? await handleSubmitLogin(e) : await handleSubmitRegister(e) } } />
                    <FormButton type="button" onClick={ () => loginAsGuest() } value="Entrar como convidado" />
                </Form>
            </FormContainer>
        </LoginContainer>
        
    )
}
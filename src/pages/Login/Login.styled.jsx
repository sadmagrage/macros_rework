import styled from "styled-components";
import { black, white } from "../../utils/colors"

export const LoginContainer = styled.div`
    background-color: ${ white };
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    width: 300px;
    border-radius: 15px;
`;

export const FormTitle = styled.h3`
    margin: 5px;
    color: white;
`;

export const Form = styled.form`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    padding: 0px 15px 15px 15px;
`;

export const FormLabel = styled.label`
    color: white;
`;

export const FormInput = styled.input`
    width: 100%;
    padding-left: 5px;
    border-radius: 7px;
    background-color: transparent;
    border: 2px solid white;
    color: white;
    outline: none;
    appearance: textfield;
`;

export const FormChanger = styled.p`
color: aqua;

&:hover {
    cursor: pointer;
}
`;

export const FormButton = styled.input`
    background-color: aqua;
    border: 2px solid aqua;
    border-radius: 5px;
`;
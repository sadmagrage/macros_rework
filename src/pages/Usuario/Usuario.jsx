import { useEffect, useState } from "react";
import { UsuarioButton, UsuarioCamp, UsuarioContainer, UsuarioForm, UsuarioFormTitle, UsuarioImage, UsuarioInputImage, UsuarioInputRadio, UsuarioInputRadioContainer, UsuarioInputText, UsuarioLabel, UsuarioOption, UsuarioSelect } from "./Usuario.styled";
import { decodeToken } from "../../utils/decodeToken";
import { toast } from "react-toastify";
import { getUserImage, updateData, updateImage } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, setAuthToken } from "../../utils/auth";
import useTheme from "../../context/ThemeContext";
import { imageBufferToUrl } from "../../utils/imageBufferToUrl";
import useUserImage from "../../context/UserImageContext";

export function Usuario () {

    const { darkMode } = useTheme();
    const navigate = useNavigate();
    const { userImage, setUserImage } = useUserImage();

    const [camps] = useState([{ label: "Peso", type: "number" }, { label: "Bodyfat em %", type: "number" }, { label: "Fator de atividade", type: "radio" }, { label: "Superavit em %", type: "number" }, { label: "Deficit em unidade", type: "number" }, { label: "Adicional", type: "number" }, { label: "Estado", type: "select" }]);
    const [radioCamps] = useState([{ fatorAtividade: "Sedentário", value: "1.2" }, { fatorAtividade: "Levemente ativo", value: "1.375" }, { fatorAtividade: "Moderamente ativo", value: "1.55" }, { fatorAtividade: "Muito ativo", value: "1.725" }, { fatorAtividade: "Extremamente", value: "1.9" }, { fatorAtividade: "Outro", value: "0" }]);
    const [selectOptions] = useState({ bulking: "Bulking", manutencao: "Manutenção", cutting: "Cutting" });
    const [fatorAtividade, setFatorAtividade] = useState("");
    const [imageBuffer, setImageBuffer] = useState();

    const [peso, setPeso] = useState("");
    const [currentUserImage, setCurrentUserImage] = useState("");
    const [bf, setBf] = useState("");
    const [superavit, setSuperavit] = useState("");
    const [deficit, setDeficit] = useState("");
    const [adicional, setAdicional] = useState("");
    const [estado, setEstado] = useState("bulking");
    const [fatorAtividadeOutro, setFatorAtividadeOutro] = useState("");

    const inputImage = e => {
        const img = e.target.files[0];

        setImageBuffer(img);
        
        const reader = new FileReader();

        reader.onload = event => {
            const fileContent = event.target.result;

            const blob = new Blob([fileContent], { type: img.type });

            const blobURL = URL.createObjectURL(blob);

            setCurrentUserImage(blobURL);
        }

        reader.readAsArrayBuffer(img);
    }

    const sendRequests = () => {

        const userBody = {
            peso: parseFloat(peso),
            bodyfat: parseFloat(bf),
            "fatorAtividade": parseFloat(fatorAtividade == "Outro" ? fatorAtividadeOutro : radioCamps.filter(radioCamp => radioCamp.fatorAtividade == fatorAtividade)[0].value),
            superavit: parseFloat(superavit),
            deficit: parseFloat(deficit),
            adicional: parseFloat(adicional),
            estado
        };
        
        toast.dismiss();
        toast.loading("Atualizando informações", { autoClose: false });

        updateData(userBody)
            .then(token => {
                setAuthToken(token);
                
                if (imageBuffer) {
                    const formImageData = new FormData();
                    formImageData.append('img', imageBuffer);

                    updateImage(formImageData)
                        .then(() => {
                            toast.dismiss();
                            toast.success('Dados atualizados com sucesso');
                            navigate("/")
                        })
                        .catch(() => {toast.dismiss(); toast.error("Erro ao atualizar imagem do usuário")});
                }
                else {
                    toast.dismiss();
                    toast.success('Dados atualizados com sucesso');
                    navigate("/")
                }
            })
            .catch(() => {toast.dismiss(); toast.error("Erro ao atualizar informações do usuário")});
    }
    
    const spawnRadioCamps = camp => {
        return ( 
        <div>
            <UsuarioInputRadio type="radio" checked={ camp.fatorAtividade == fatorAtividade } onChange={ () => setFatorAtividade(camp.fatorAtividade)} />
            <UsuarioLabel>
                {
                    `${ camp.fatorAtividade } - ${ camp.fatorAtividade != "Outro" ? camp.value : "" }` 
                }
            </UsuarioLabel>
            { camp.fatorAtividade == "Outro" ? <UsuarioInputText radioCamp={ true } value={ inputOnlyNumber(fatorAtividadeOutro) } onChange={ e => setFatorAtividadeOutro(e.target.value) } /> : "" }
        </div>
        )
    }

    const valueUseState = label => {
        if (label == "Peso") return peso;
        if (label.startsWith("Bodyfat")) return bf;
        if (label.startsWith("Superavit")) return superavit;
        if (label.startsWith("Deficit")) return deficit;
        if (label == "Adicional") return adicional;
    }

    const valueSetState = (label, value) => {
        if (label == "Peso") setPeso(value);
        else if (label.startsWith("Bodyfat")) setBf(value);
        else if (label.startsWith("Superavit")) setSuperavit(value);
        else if (label.startsWith("Deficit")) setDeficit(value);
        else if (label == "Adicional") setAdicional(value);
    }

    const spawnOptionCamps = camp => {
        return <UsuarioOption value={ camp } >{ selectOptions[camp] }</UsuarioOption>
    }

    const spawnCamps = camp => {
        return (
            <UsuarioCamp>
                <UsuarioLabel name={ camp.label.toLowerCase() } >{ camp.label }: </UsuarioLabel>
                <br />
                {
                    camp.type == "number" ? 
                        <UsuarioInputText for={ camp.label.toLowerCase() } value={ inputOnlyNumber(valueUseState(camp.label)) } onChange={ e => valueSetState(camp.label, e.target.value) }/> :
                    camp.type == "radio" ? 
                        <UsuarioInputRadioContainer>{ radioCamps.map(spawnRadioCamps) }</UsuarioInputRadioContainer> :
                    camp.type == "select" ? 
                        <UsuarioSelect value={ estado } onChange={ e => setEstado(e.target.value) } >{ Object.keys(selectOptions).map(spawnOptionCamps) }</UsuarioSelect> : ""
                }
            </UsuarioCamp>
        )
    }

    const inputOnlyNumber = input => typeof input == "string" ? input.replace(/[^0-9.]/g, '') : input;

    useEffect(() => {
        if (userImage) setCurrentUserImage(imageBufferToUrl(userImage));
            else {
                getUserImage()
                    .then(image => {
                        setUserImage(image);
                        setCurrentUserImage(imageBufferToUrl(image));
                    });
            }
        const data = decodeToken();

        setPeso(data.peso);
        setBf(data.bodyfat);
        setSuperavit(data.superavit);
        setDeficit(data.deficit);
        setAdicional(data.adicional);
        setEstado(data.estado);

        let isFatorAtividadeValuePreset = false;

        radioCamps.map(radioCamp => radioCamp.value == data.fatorAtividade ? isFatorAtividadeValuePreset = true : "" );

        if (isFatorAtividadeValuePreset) setFatorAtividade(radioCamps.filter(radioCamp => radioCamp.value == data.fatorAtividade)[0].fatorAtividade);
        else {
            setFatorAtividadeOutro(data.fatorAtividade);
            setFatorAtividade("Outro");
        }
    }, []);

    if (isAuthenticated()) {
        return (
            <UsuarioContainer darkMode={ darkMode } >
                <UsuarioForm darkMode={ darkMode } >
                    <UsuarioFormTitle>Configurações</UsuarioFormTitle>
                    <UsuarioImage src={ currentUserImage } />
                    <UsuarioInputImage type="file" onChange={ inputImage } />
                    {
                        camps.map(spawnCamps)
                    }
                    <UsuarioButton type="button" value="Enviar" onClick={ sendRequests } />
                </UsuarioForm>
            </UsuarioContainer>
        )
    }
    else {
        window.location.pathname = "/login";
    }
}
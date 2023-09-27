import { isAuthenticated } from "../../utils/auth";
import "./Home.css";

export function Home() {

    if (isAuthenticated()) {
        return (
            <div className='home'>
                <div className="options"onClick={ () => window.location.pathname = "/repositorios" } >
                    <h3 className='options_title'>Repositórios</h3>
                    <div className='description'>
                        <p className="description_text">Link dos repositórios</p>
                    </div>
                </div>
                <div className='options' onClick={ () => window.location.pathname = "/macros" } >
                    <h3 className='options_title'>Calcular macros</h3>
                    <div className='description'>
                        <p className="description_text">O gasto é calculado de acordo com as informações passadas no usuário.</p>
                    </div>
                </div>
                <div className='options' onClick={ () => window.location.pathname = "/alimentos" } >
                    <h3 className='options_title'>Ver alimentos</h3>
                    <div className='description'>
                        <p className="description_text">Mostra os valores de cada alimento</p>
                    </div>
                </div>
                <div className='options' onClick={ () => window.location.pathname = "/alimentos/registrar" } >
                    <h3 className='options_title'>Registrar alimentos</h3>
                    <div className='description'>
                        <div className="description_text_container">
                            <p className="description_text">Inserir novo registro de alimento</p>
                            <p className="description_text warning">Permitido apenas a alguns usuários</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        window.location.pathname = "/login";
    }
}
import { isAuthenticated } from "../../utils/auth";
import "./Home.css";

export function Home() {

    if (isAuthenticated()) {
        return (
            <div className='home'>
                <div className='options' onClick={ () => window.location.pathname = "/macros" } >
                    <h3 className='options_title'>Calcular macros</h3>
                    <div className='description'>
                        <img src="./images/tanjiro.gif" className="description_image" />
                    </div>
                </div>
                <div className='options' onClick={ () => window.location.pathname = "/alimentos" } >
                    <h3 className='options_title'>Ver alimentos</h3>
                    <div className='description'>
                        <img src="./images/gojou.gif" className="description_image" />
                    </div>
                </div>
                <div className='options' onClick={ () => window.location.pathname = "/alimentos/registrar" } >
                    <h3 className='options_title'>Registrar alimentos</h3>
                    <div className='description'>
                        <img src="./images/ichigo.gif" className="description_image" />
                    </div>
                </div>
            </div>
        )
    }
    else {
        window.location.pathname = "/login";
    }
}
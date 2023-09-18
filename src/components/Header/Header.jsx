import { useEffect, useState } from 'react';
import './Header.css'
import iconImage from '../../images/xandao.gif'
import { getData } from '../../utils/api';

export function Header() {

    const appName = "Macros Rework";
    
    const [DataUser, setDataUser] = useState({ "username": "", "img": "" });
    const [Atualizador, setAtualizador] = useState(0);
    
    useEffect(() => {    
        if (window.location.pathname !== '/login') 
            getData()
                .then(data => {
                    setDataUser(data);
                    setAtualizador(Atualizador == 1 ? 0 : 1);
                })
                .catch(error => console.log(error.message));
    }, [])

    return window.location.pathname !== '/login' ? (
        <header>
            <div className='logo_container'>
                <img src={ iconImage } className='logo' />
                <h6 className='logo_name'>{ appName }</h6>
            </div>
            <div className='headerLinks'>
                <a href='/'>Home</a>
                <a href='/macros'>Macros</a>
                <a href='/alimentos'>Alimentos</a>
                <a href='/alimentos/registrar'>Registrar alimentos</a>
            </div>
            <div className='profile_container' onClick={ () => window.location.pathname = "/usuario" } >
                <img src={ DataUser.img } className='profile_pic' />
                <h6 className='profile_username'>{ DataUser.username }</h6>
            </div>
        </header>
    ) : (
        <header>
            <div className='logo_container'>
                <img src="./images/xandao.gif" className='logo' />
                <h6 className='logo_name'>{ appName }</h6>
            </div>
        </header>
    );
}
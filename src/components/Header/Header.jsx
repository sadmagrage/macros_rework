import { useEffect, useState } from 'react';
import './Header.css'
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { getAuthToken } from '../../utils/auth';
import { imageBufferToUrl } from '../../utils/imageBufferToUrl';

export function Header() {

    const appName = "Macros Rework";
    
    const [DataUser, setDataUser] = useState({ "username": "", "img": "" });
    const [Atualizador, setAtualizador] = useState(0);
    
    useEffect(() => {
        
        if (window.location.pathname !== '/login') {
            const data = jwtDecode(getAuthToken()).data;

            data["img"] = imageBufferToUrl(JSON.parse(localStorage.getItem("userImg")));

            setDataUser(data);
            setAtualizador(Atualizador == 1 ? 0 : 1);
        }
    }, []);

    return window.location.pathname !== '/login' ? (
        <header>
            <a href='/' className='logo_name'>{ appName }</a>
            <div className='headerLinks'>
                <a href='/macros'>Macros</a>
                <a href='/alimentos'>Alimentos</a>
                <a href='/repositorios'>Repositórios</a>
            </div>
            <div className='profile_container' onClick={ () => window.location.pathname = "/usuario" } >
                <img src={ DataUser.img } className='profile_pic' />
                <h6 className='profile_username'>{ DataUser.username }</h6>
            </div>
        </header>
    ) : (
        <header>
            <h3 className='logo_name'>{ appName }</h3>
            <a href='/repositorios'>Repositórios</a>
        </header>
    );
}
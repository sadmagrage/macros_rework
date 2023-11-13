import { useEffect, useState } from 'react';
import './Header.css'
import { decodeToken } from '../../utils/decodeToken';
import { removeAuthToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Header() {

    const appName = "Macros Rework";
    
    const [DataUser, setDataUser] = useState({ "username": "", "img": "" });
    const [Atualizador, setAtualizador] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        
        if (window.location.pathname !== '/login') {
            const data = decodeToken();

            setDataUser(data);
            setAtualizador(Atualizador == 1 ? 0 : 1);
        }
    }, []);

    const logout = () => {
        toast.dismiss();
        toast.success("Deslogado com sucesso");
        navigate("/login");
    }

    return window.location.pathname !== '/login' ? (
        <header>
            <a onClick={ () => navigate("/") } className='logo_name'>{ appName }</a>
            <div className='headerLinks'>
                <a onClick={ () => navigate("/macros") }>Macros</a>
                <a onClick={ () => navigate("/alimentos") }>Alimentos</a>
                <a onClick={ () => navigate("/repositorios") }>Repositórios</a>
            </div>
            <div className='profile_container'  onClick={ () => navigate("/usuario") } >
                <img src={ DataUser.img } className='profile_pic' />
                <h6 className='profile_username'>{ DataUser.username }</h6>
                <p className='logout' onClick={ logout } >Logout</p>
            </div>
        </header>
    ) : (
        <header>
            <h3 className='logo_name'>{ appName }</h3>
            <a onClick={ () => navigate("/repositorios") }>Repositórios</a>
        </header>
    );
}
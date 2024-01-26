import { useEffect, useState } from 'react';
import { decodeToken } from '../../utils/decodeToken';
import { removeAuthToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HeaderContainer, HeaderLinks, Link, Logout, ProfileContainer, ProfileInfo, ProfilePic, ProfileUsername } from './Header.styled';

export function Header() {
    
    const [dataUser, setDataUser] = useState({ "username": "", "img": "" });
    const [atualizador, setAtualizador] = useState(0);
    const [isLogin, setIsLogin] = useState(window.location.pathname === '/login');
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isLogin) {
            const data = decodeToken();

            setDataUser(data);
            setAtualizador(atualizador == 1 ? 0 : 1);
        }
    }, []);

    useEffect(() => setIsLogin(window.location.pathname === '/login'));

    const logout = () => {
        toast.dismiss();
        removeAuthToken();
        toast.success("Deslogado com sucesso");
        navigate("/login");
    }

    return (
        <HeaderContainer>
            <HeaderLinks>
            <Link isLogin={ isLogin } onClick={ () => navigate("/")} >Home</Link>
                <Link isLogin={ isLogin } onClick={ () => navigate("/macros")} >Macros</Link>
                <Link isLogin={ isLogin } onClick={ () => navigate("/alimentos")} >Alimentos</Link>
                <Link onClick={ () => navigate("/repositorios")} >Repositórios</Link>
            </HeaderLinks>
            <ProfileContainer isLogin={ isLogin } onClick={ () => navigate("/usuario") } >
                <ProfileInfo>
                    <ProfilePic src={ dataUser.img } />
                    <ProfileUsername>{ dataUser.username }</ProfileUsername>
                </ProfileInfo>
                <Logout onClick={ logout } >Logout</Logout>
            </ProfileContainer>
        </HeaderContainer>
    )
}
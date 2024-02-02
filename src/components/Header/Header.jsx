import { useEffect, useState } from 'react';
import { decodeToken } from '../../utils/decodeToken';
import { removeAuthToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HeaderContainer, HeaderLinks, Link, Logout, ProfileContainer, ProfileInfo, ProfilePic, ProfileUsername, ThemeIcon, ThemeToggler } from './Header.styled';
import useTheme from "../../context/ThemeContext";

export function Header() {
    
    const [dataUser, setDataUser] = useState({ "username": "", "img": "" });
    const [atualizador, setAtualizador] = useState(0);
    const [isLogin, setIsLogin] = useState(window.location.pathname === '/login');
    const { darkMode, toggleTheme, saveTheme } = useTheme();
    const navigate = useNavigate();

    const [link] = useState([{ isLogin: true, url: "/", text: "Home" }, { isLogin: true, url: "/macros", text: "Macros" }, { isLogin: true, url: "/alimentos", text: "Alimentos" }, { isLogin: false, url: "/repositorios", text: "Repositórios" }]);
    
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
        <HeaderContainer darkMode={ darkMode } >
            <HeaderLinks>
                {
                    link.map(linkItem => linkItem.isLogin ? 
                        <Link darkMode={ darkMode } isLogin={ isLogin } onClick={ () => navigate(linkItem.url)} >{ linkItem.text }</Link>
                            :
                        <Link darkMode={ darkMode } onClick={ () => navigate(linkItem.url)} >{ linkItem.text }</Link>
                    )
                }
            </HeaderLinks>
            {
                isLogin ? 
            <ThemeToggler onClick={ () => { toggleTheme(); saveTheme(); } } >
                <ThemeIcon darkMode={ darkMode } src="/icons/sun.png" alt="" />
                <ThemeIcon darkMode={ !darkMode } src="/icons/moon.png" alt="" />
            </ThemeToggler>
                :
            ""
            }
            <ProfileContainer isLogin={ isLogin } >
                <ThemeToggler onClick={ () => { toggleTheme(); saveTheme(); } } >
                    <ThemeIcon darkMode={ darkMode } src="/icons/sun.png" alt="" />
                    <ThemeIcon darkMode={ !darkMode } src="/icons/moon.png" alt="" />
                </ThemeToggler>
                <ProfileInfo onClick={ () => navigate("/usuario") } >
                    <ProfilePic src={ dataUser.img } />
                    <ProfileUsername darkMode={ darkMode } >{ dataUser.username }</ProfileUsername>
                </ProfileInfo>
                <Logout onClick={ logout } darkMode={ darkMode } >Logout</Logout>
            </ProfileContainer>
        </HeaderContainer>
    )
}
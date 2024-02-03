import { useEffect, useState } from 'react';
import { decodeToken } from '../../utils/decodeToken';
import { getAuthToken, isTokenExpired, removeAuthToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HeaderContainer, HeaderLinks, Link, Logout, ProfileContainer, ProfileInfo, ProfilePic, ProfileUsername, ThemeIcon, ThemeToggler } from './Header.styled';
import useTheme from "../../context/ThemeContext";
import useUserImage from "../../context/UserImageContext";
import { imageBufferToUrl } from '../../utils/imageBufferToUrl';
import { getUserImage } from '../../utils/api';

export function Header() {
    
    const [username, setUsername] = useState("");
    const { userImage, setUserImage } = useUserImage();
    const [currentUserImage, setCurrentUserImage] = useState("");
    const [isLogin, setIsLogin] = useState(window.location.pathname === '/login');
    const { darkMode, toggleTheme, saveTheme } = useTheme();
    const navigate = useNavigate();

    const [link] = useState([{ isLogin: true, url: "/", text: "Home" }, { isLogin: true, url: "/macros", text: "Macros" }, { isLogin: true, url: "/alimentos", text: "Alimentos" }, { isLogin: false, url: "/repositorios", text: "Repositórios" }]);
    
    useEffect(() => setIsLogin(window.location.pathname === '/login'));

    useEffect(() => {
        if (!isLogin) {
            const data = decodeToken();

            setUsername(data.username);

            if (userImage) setCurrentUserImage(imageBufferToUrl(userImage));
            else {
                getUserImage()
                    .then(image => {
                        setUserImage(image);
                        setCurrentUserImage(imageBufferToUrl(image));
                    });
            }
        }
    }, [isLogin]);

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
                    <ProfilePic src={ currentUserImage } />
                    <ProfileUsername darkMode={ darkMode } >{ username }</ProfileUsername>
                </ProfileInfo>
                <Logout onClick={ logout } darkMode={ darkMode } >Logout</Logout>
            </ProfileContainer>
        </HeaderContainer>
    )
}
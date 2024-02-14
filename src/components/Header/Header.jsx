import { useEffect, useState } from 'react';
import { decodeToken } from '../../utils/decodeToken';
import { getAuthToken, isAuthenticated, isTokenExpired, removeAuthToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HeaderContainer, HeaderContent, HeaderLinksContainer, HeaderLinksWrapper, HeaderMenu, Link, Logout, ProfileContainer, ProfileInfo, ProfilePic, ProfileUsername, ThemeIcon, ThemeToggler } from './Header.styled';
import useTheme from "../../context/ThemeContext";
import useUserImage from "../../context/UserImageContext";
import { imageBufferToUrl } from '../../utils/imageBufferToUrl';
import { getUserImage } from '../../utils/api';
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from "react-icons/io5";
import { black, white } from '../../utils/colors';
import useActiveMenu from '../../context/ActiveMenuContext';

export function Header() {
    
    const [username, setUsername] = useState("");
    const { userImage, setUserImage } = useUserImage();
    const [currentUserImage, setCurrentUserImage] = useState("");
    const [noPermission, setNoPermission] = useState(true);
    const { darkMode, toggleTheme, saveTheme } = useTheme();
    const navigate = useNavigate();

    const [link] = useState([{ noPermission: true, url: "/", text: "Home" }, { noPermission: true, url: "/macros", text: "Macros" }, { noPermission: true, url: "/alimentos", text: "Alimentos" }, { noPermission: false, url: "/repositorios", text: "Repositórios" }]);
    const { activeMenu, setActiveMenu } = useActiveMenu();
    const [width, setWidth] = useState(window.innerWidth);
    
    const setCurrentWidth = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => setNoPermission(window.location.pathname === '/login' || (window.location.pathname === "/repositorios" && !isAuthenticated())));

    useEffect(() => window.addEventListener('resize', setCurrentWidth), []);

    useEffect(() => {
        if (!noPermission) {
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
    }, [noPermission]);

    const logout = () => {
        toast.dismiss();
        removeAuthToken();
        toast.success("Deslogado com sucesso");
        navigate("/login");
    }

    return (
        <HeaderContainer darkMode={ darkMode } >
            <HeaderContent>
                <HeaderMenu activeMenu={ activeMenu } noPermission={ noPermission } >
                    { !noPermission && width < 901 ? activeMenu ? <IoCloseSharp color={ darkMode ? white : black } onClick={ () => setActiveMenu(!activeMenu) } cursor={ "pointer" } /> : <TiThMenu color={ darkMode ? white : black } onClick={ () => setActiveMenu(!activeMenu) } cursor={ "pointer" } /> : "" }
                    <HeaderLinksContainer noPermission={ noPermission } activeMenu={ activeMenu } >
                        <HeaderLinksWrapper darkMode={ darkMode } noPermission={ noPermission } activeMenu={ activeMenu } >
                            {
                                link.map(linkItem => linkItem.noPermission ? 
                                    <Link darkMode={ darkMode } noPermission={ noPermission } onClick={ () => { navigate(linkItem.url);setActiveMenu(false); }} >{ linkItem.text }</Link>
                                        :
                                    <Link darkMode={ darkMode } onClick={ () => navigate(linkItem.url)} >{ linkItem.text }</Link>
                                )
                            }
                        </HeaderLinksWrapper>
                    </HeaderLinksContainer>
                </HeaderMenu>
                <div/>
                {
                    noPermission ? 
                <ThemeToggler onClick={ () => { toggleTheme(); saveTheme(); } } >
                    <ThemeIcon darkMode={ darkMode } src="/icons/sun.png" alt="" />
                    <ThemeIcon darkMode={ !darkMode } src="/icons/moon.png" alt="" />
                </ThemeToggler>
                    :
                ""
                }
                <ProfileContainer noPermission={ noPermission } >
                    <ThemeToggler onClick={ () => { toggleTheme(); saveTheme(); } } >
                        <ThemeIcon darkMode={ darkMode } src="/icons/sun.png" alt="" />
                        <ThemeIcon darkMode={ !darkMode } src="/icons/moon.png" alt="" />
                    </ThemeToggler>
                    <ProfileInfo onClick={ () => { navigate("/usuario");setActiveMenu(false); } } >
                        <ProfilePic src={ currentUserImage } />
                        <ProfileUsername darkMode={ darkMode } >{ username }</ProfileUsername>
                    </ProfileInfo>
                    <Logout onClick={ logout } darkMode={ darkMode } >Logout</Logout>
                </ProfileContainer>
            </HeaderContent>
        </HeaderContainer>
    )
}
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

const Header = styled.div`
    width: 100%;
    height: 100px;
    position: fixed;
    z-index: 999;
    transition: all .2s;
    &.on {
        background-color: #999;
    }
`
const HeaderWrap = styled.div`
    width: 93%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    @media (min-width: 641px) and (max-width: 1024px) {
        display: grid;
        grid-template-columns: repeat(3, 33%);
    }
    @media (max-width: 640px) {
        display: grid;
        grid-template-columns: repeat(3, 33%);
    }
`
const HeaderLogoAndMenu = styled.div`
    flex-basis: 750px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (min-width: 641px) and (max-width: 1024px) {
        grid-column: 2/3;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 640px) {
        grid-column: 2/3;
        justify-content: center;
        align-item: center;
    }
`
const HeaderLogo = styled.div`
    width: 233px;
    height: 50px;
    @media (min-width: 641px) and (max-width: 1024px) {
        img {
            max-width: 200px !important;
        }
    }
    @media (max-width: 640px) {
        img {
            margin-top: 5px;
            max-width: 200px !important;
        }
    }
`
const HeaderMenu = styled.ul`
    font-family: nanumR;
    font-weight: bold;
    font-size: 18px;
    color: white;
    width: 450px;
    height: 50px;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
        transition: all .3s;
        cursor: pointer;
        &:hover {
            color: #143b63;
        }
    }
`
const HeaderIcon = styled.div`
    width: 150px;
    height: 50px;
    margin-left: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        width: 100%;
        grid-column: 3/4;
        justify-content: flex-end;
    }
    @media (max-width: 640px) {
        width: 100%;
        height: 40px;
        grid-column: 3/4;
        justify-content: space-evenly;
    }
`
const HeaderIconItem = styled.div`
    width: 30px;
    height: 30px;
    background: ${(props) => props.url || "none"};
    background-size: cover;
    background-position: center;
    transition: all .3s;
    &:hover {
        scale: 1.06;
    }
    @media (min-width: 641px) and (max-width: 1024px) {
        margin: 0 20px;
    }
`
const ContentMainMenuHamIconWrap = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        margin: 0 50px 0 10px;
    }
`
const ContentMainMenuHamIconLine = styled.div`
    width: 30px;
    height: 4px;
    border-radius: 50px;
    background-color: white;
`
function Nav() {
    const IsDesktop = useMediaQuery({ query: "(min-width: 1025px"})
    const IsTablet = useMediaQuery({ query: "(min-width: 641px) and (max-width: 1024px)" });
    const IsMobile = useMediaQuery({ query: "(max-width: 640px)" });

    const [ScrollY, setScrollY] = useState(0); 
    const handleFollow = () => {
        setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
    }
    useEffect(() => {
        const watch = () => {
            window.addEventListener('scroll', handleFollow);
        }
        watch(); // addEventListener 함수를 실행
        return () => {
            window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
        }
    })

    const [onSetter, setOnsetter] = useState(0);
    useEffect(() => {
        setOnsetter(IsDesktop === true ? "800" : "580");
    })
    const [navList, setNavs] = useState([]);
    const [iconList, setIcons] = useState([]);
    const fetchUsers = async() => {
        const response = await axios.get(
            'Nav.json'
        );
        setNavs(response.data.navs);
        setIcons(response.data.icons);
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    let tabIconList = iconList.filter(e => e.id < 2);
    return (
        <>
            <Header className={ScrollY > onSetter && "on"}>
                <HeaderWrap>
                    <HeaderLogoAndMenu>
                        <HeaderLogo><img src='Images/logo.png' alt='mainLogo'/></HeaderLogo>
                        { IsDesktop &&
                            <HeaderMenu>
                                {
                                    navList.map((e) => {
                                        return <li key={e.id}>{e.title}</li>
                                    })
                                }
                            </HeaderMenu>
                        }
                    </HeaderLogoAndMenu>
                        { IsDesktop &&           
                            <HeaderIcon>
                                {
                                    iconList.map((e) => {
                                        return <HeaderIconItem key={e.id} url={e.src}></HeaderIconItem>
                                    })
                                }
                            </HeaderIcon>
                        }
                        { IsTablet &&          
                            <HeaderIcon>
                                {
                                    tabIconList.map((e) => {
                                        return <HeaderIconItem key={e.id} url={e.src}></HeaderIconItem>
                                    })
                                }
                                <ContentMainMenuHamIconWrap>
                                    <ContentMainMenuHamIconLine></ContentMainMenuHamIconLine>
                                    <ContentMainMenuHamIconLine></ContentMainMenuHamIconLine>
                                    <ContentMainMenuHamIconLine></ContentMainMenuHamIconLine>
                                </ContentMainMenuHamIconWrap>
                            </HeaderIcon>
                        }
                        { IsMobile &&          
                            <HeaderIcon>
                                <ContentMainMenuHamIconWrap>
                                    <ContentMainMenuHamIconLine></ContentMainMenuHamIconLine>
                                    <ContentMainMenuHamIconLine></ContentMainMenuHamIconLine>
                                    <ContentMainMenuHamIconLine></ContentMainMenuHamIconLine>
                                </ContentMainMenuHamIconWrap>
                            </HeaderIcon>
                        }
                </HeaderWrap>
            </Header>
        </>
    )
}

export default Nav
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const FooterFooter = styled.div`
    width: 100%;
    height: 312px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        height: 155px;
    }
`
const FooterWrap = styled.div`
    font-family: nanumR;
    width: 83%;
    height: 100%;
    @media (min-width: 641px) and (max-width: 1024px) {
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 640px) {
        width: 98%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`
const FooterTop = styled.div`
    width: 100%;
    height: 30%;
    border-bottom: 2px solid white;
    @media (max-width: 640px) {
        height: 20%;
    }
`
const FooterCat = styled.ul`
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "100%"};
    display: flex;
    justify-content: ${(props) => props.justify || "space-between"};
    align-items: center;
    color: white;
    font-weight: ${(props) => props.fontWeight || "bold"};
    @media (min-width: 641px) and (max-width: 1024px) {
        li {
            padding: 5px 0;
        }
    }
    @media (max-width: 640px) {
        width: ${(props) => props.mwidth || "100%"};
        font-size: 12px ;
    }
`
const FooterBottom = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        font-size: 14px;
        img {
            width: 23%;
        }
    }
    @media (max-width: 640px) {
        font-size: 14px;
        img {
            display: none;
        }
    }
`
const FooterSnsLogoWrap = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
    @media (min-width: 641px) and (max-width: 1024px) {
        width: 120px;
    }
    @media (max-width: 640px) {
        width: 10%;
        height: 60%;
        flex-direction: column;
    }
`
const FooterSnsLogo = styled.div`
    width: 35px;
    height: 35px;
    background: ${(props) => props.url || "none"};
    background-size: cover;
    background-position: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        width: 30px;
        height: 30px;
    }
`
function Footer() {
    const IsDesktop = useMediaQuery({ query: "(min-width: 1025px"})
    const IsTablet = useMediaQuery({ query: "(min-width: 641px) and (max-width: 1024px)" });
    const IsMobile = useMediaQuery({ query: "(max-width: 640px)" });

    const [FooterNavs, setFooterNavs] = useState();
    useEffect(() => {
        axios.get('Nav.json').then((response) => {
            setFooterNavs(response.data)
        });
    }, []);
    return (
        <>
            <FooterFooter>
                <FooterWrap>
                    { IsDesktop &&
                        <FooterTop>
                            <FooterCat>
                            {
                                FooterNavs && FooterNavs.FooterNavsTop.map((e) => {
                                    return <li key={e.id}>{e.text}</li>
                                })
                            }
                            </FooterCat>
                        </FooterTop>
                    }
                    { IsMobile &&
                        <FooterTop>
                            <FooterCat>
                            {
                                FooterNavs && FooterNavs.FooterNavsTop.map((e) => {
                                    return <li key={e.id}>{e.text}</li>
                                })
                            }
                            </FooterCat>
                        </FooterTop>
                    }
                    <FooterBottom>
                        <img src="/images/footerlogo2.png" alt="footerLogo" />
                        <FooterCat width="55%" justify="center" style={{flexDirection: "column", marginLeft: "10px"}}>    
                            {
                                FooterNavs && FooterNavs.FooterNavsBottom.map((e) => {
                                    return <li style={{width: "100%", padding: "5px 0"}} key={e.id}>{e.text}</li>
                                })
                            }
                        </FooterCat>
                        <FooterSnsLogoWrap>
                            {
                                FooterNavs && FooterNavs.FooterSnsLogo.map((e) => {
                                    return <FooterSnsLogo key={e.id} url={e.src}></FooterSnsLogo>
                                })
                            }
                        </FooterSnsLogoWrap>
                    </FooterBottom>
                </FooterWrap>
            </FooterFooter>
        </>
    )
}

export default Footer
import React, { useState, useEffect, useRef } from 'react'
import { Navigation, Scrollbar, A11y, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
SwiperCore.use([Pagination, Autoplay, EffectFade]);

const SwiperSlidesBackground = styled.div`
    width: 100%;
    height: 100%;
    background: ${(props) => props.background || "none"};
    background-size: cover;
    background-position: center;
`
const ImageWrap = styled.div`
    position: absolute;
    top: 63%;
    left: 5%;
    z-index: 1;
    color: white;
    font-size: 30px;
    font-family: nanumR;
    span {
        font-weight: bold;
    }
    @media (min-width: 641px) and (max-width: 1024px) {
        top: 34%;
        font-size: 20px;
        img {
            width: 80%;
        }
    }
    @media (max-width: 640px) {
        top: 43%;
        font-size: 20px;
        img {
            width: 80%;
        }
    }
`
const ImageMouseScrollAnimation = keyframes`
    0% {
        top: 80%;
    }
    50% {
        top: 82%;
    }
    100% {
        top: 80%;
    }
`
const ImageMouseScroll = styled.div`
    position: absolute;
    top: 80%;
    left: 50%;
    width: 30px;
    height: 60px;
    z-index: 2;
    background: url("./Images/scrolliscon.png");
    background-size: cover;
    background-position: center;
    animation: ${ImageMouseScrollAnimation} 1.5s forwards infinite;
`
const MainBannerButtonWrap = styled.div`
    position: absolute;
    width: 250px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    top: 80%;
    left: 5%;
    @media (min-width: 641px) and (max-width: 1024px) {
        top: 48%;
        width: 180px;
    }
    @media (max-width: 640px) {
        top: 55%;
        width: 180px;
    }
`
const MainBannerButtonRect = styled.div`
    cursor: pointer;
    position: relative;
    width: 10px;
    height: 10px;
    background-color: #999;
    z-index: 3;
    transform: rotate(45deg);
    &.on {
        background-color: white;
    }
`
const circleLeft = keyframes`
    0% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const circleRight = keyframes`
    0% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const MainBannerButtonCircleLeft = styled.div`
    position: absolute;
    overflow: hidden;
    width: 20px;
    height: 40px;
    transform-origin: center right;
    transform: rotate(-45deg);
    top: -150%;
    left: -150%;
    &.on::after {
        content: "";
        transform: rotate(180deg);
        transform-origin: center right;
        position: absolute;
        width: 20px;
        height: 40px;
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        border: 1px solid;
        border-color: #fff;
        border-right: 0;
        animation: ${circleLeft} 1.5s forwards linear;
        animation-delay: 1.5s;
    }
`
const MainBannerbuttonCircleRight = styled.div`
    position: absolute;
    width: 20px;
    height: 40px;
    overflow: hidden;
    transform: rotate(-45deg);
    transform-origin: center left;
    top: -150%;
    left: 50%;
    &.on::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 40px;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        border: 1px solid;
        border-color: #fff;
        transform-origin: center left;
        transform: rotate(-45deg);
        border-left: 0;
        animation: ${circleRight} 1.5s forwards linear;
    }
`
const ContentMainMenu = styled.div`
    font-family: nanumR;
    width: 100%;
    height: ${(props) => props.height || "370px"};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: ${(props) => props.background || "none"};
    background-position: center;
    background-size: cover;
    flex-direction: row;
    @media (min-width: 641px) and (max-width: 1024px) {
        height: ${(props) => props.theight || "258px"};
    }
    @media (max-width: 640px) {
        height: ${(props) => props.mheight || "450px"};
        flex-direction: column;
    }
`
const ContentMainTitle = styled.p`
    width: 70%;
    height: 50px;
    font-size: 37px;
    @media (min-width: 641px) and (max-width: 1024px) {
        width: 90%;
        font-size: 23px;
    }
`
const ContentMainMenuItemWrap = styled.ul`
    width: 60%;
    height: 50%;
    display: flex;
    justify-content: ${(props) => props.justify || 'space-around'};
    align-items: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        width: 90%;
        img {
            width: 60% !important;
            height: auto !important;
        }
        p {
            font-size: 15px !important;
        }
    }
    @media (max-width: 640px) {
        width: 80%;
        height: 70%;
        flex-wrap: wrap;
        align-items: center;
        li {
            width: 30%;
            height: auto;
        }
        img {
            width: 60% !important;
            height: auto !important;
        }
        p {
            font-size: 15px !important;
        }
    }
`
const ContentCultureWrap = styled.div`
    width: 65%;
    height: 65%;
    margin-top: 20px;
    background-color: rgba(255,255,255,0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        width: 90%;
        height: 60%;
    }
    @media (max-width: 640px) {
        width: 100%;
        height: 60%;
    }
`
const ContentMainMenuItems = styled.li`
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .3s;
    img {
        margin-top: 20px;
    }
    p {
        margin-top: 5px;
        text-align: center;
        width: 100%;
        font-size: 22px;
    }
    &:hover {
        transform: translateY(-10%);
    }
`
const ContentCultureItemLeft = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        img {
            width: 70%;
        }
    }
    @media (max-width: 640px) {
        img {
            width: 80%;
        }
    }
`
const ContentCultureItemRight = styled.div`
    width: 50%;
    height: 60%;
    margin-right: 5%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        img {
            width: 100%;
        }
    }
`
const ContentCultureItemRightItemsWrap = styled.div`
    width: 80%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media (max-width: 640px) {
        height: 75%;
        justify-content: flex-start;
    }
`
const ContentCultureItemRightItems = styled.ul`
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    transition: all .3s;
    li{
        cursor: pointer;
        transition: all .3s;
        &:hover {
            color: #143b63;
            scale: 1.1;
        }
    }
    @media (min-width: 641px) and (max-width: 1024px) {
        font-size: 17px;
    }
    @media (max-width: 640px) {
        font-size: 17px;
        margin: 5px 0;
    }
`
const ContentNoticeLeftWrap = styled.div`
    width: 40%;
    height: 100%;
    background-color: #143b63;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 640px) {
        width: 100%;
        height: 80%;
    }
`
const ContentNoticeSwiperPaginationCustumWrap = styled.div`
    width: 70%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
`
const ContentNoticeSwiperPaginationCustum = styled.div`
    width: 120px;
`
const ContentNoticePaginationItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
    color: white;
    p {
        position: relative;
        &::after {
            content: "";
            position: absolute;
            top: -20%;
            left: 50%;
            transform: translateX(-50%);
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: white;
        }
    }
`
const progressBarAnimation = keyframes`
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
`
const ContentNoticePaginationProgressBar = styled.div`
    width: 100%;
    height: 3px;
    background-color: #999;
    position: relative;
    &::after {
        position: absolute;
        content: "";
        width: 0%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: white;
    }
    &.on::after {
        animation: ${progressBarAnimation} 3s linear forwards;
    }
`
const ContentMainBannerSwiperWrap = styled.div`
    width: 100%;
    height: 960px;
    @media (min-width: 641px) and (max-width: 1024px) {
        height: 568px;
    }
    @media (max-width: 1024px) {
        height: 680px;
    }
`
const ContentNoticeSwiperWrap = styled.div`
    position: relative;
    width: 70%;
    height: 430px;
    margin: 0 20px;
    &::after {
        top: -50px;
        left: -50px;
        text-align: center;
        line-height: 70px;
        content: "NEWS";
        position: absolute;
        width: 170px;
        height: 70px;
        background-color: white;
        z-index: 2;
        filter: drop-shadow(0px 0px 3px black);
        font-size: 27px;
    }
    @media (min-width: 641px) and (max-width: 1024px) {
        height: 245px;
        &::after {
            width: 97px;
            height: 39px;
            font-size: 16px;
            line-height: 39px;
            left: 0;
            top: -45px;
            font-weight: bold;
        }
    }
    @media (max-width: 640px) {
        width: 80%;
        height: 310px;
        &::after {
            display: none;
        }
    }
`
const ContentNoticeRightWrap = styled.div`
    width: 60%;
    height: 100%;
    background: url('./Images/backimage3.png');
    background-size: cover;
    background-position: center;
    @media (max-width: 640px) {
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
`
const ContentItemsWrap = styled.div`
    width: 100%;
    height: ${(props) => props.height || 0};
    background-color: ${(props) => props.backColor || "transparent"};
    display: flex;
    justify-content: ${(props) => props.justify || "center"};
    align-items: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        height: ${(props) => props.theight || 0};
    }
    @media (max-width: 640px) {
        margin-top: ${(props) => props.mMargin || 0};
    }
`
const ContentItemsTextWrap = styled.div`
    width: 80%;
    height: ${(props) => props.height || "40%"};
    p {
        font-size: ${(props) => props.pfontSize || "0px"};
    }
    @media (min-width: 641px) and (max-width: 1024px) {
        p {
            font-size: ${(props) => props.tfontSize || "16px"};
        }
    }
    @media (max-width: 640px) {
        width: 95%;
        p {
            font-size: ${(props) => props.tfontSize || "16px"};
        }
    }
    
`
const ContentItemsCatWrap = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    li {
        color: white;
        padding: 0 30px;
        position: relative;
        p {
            position: relative;
            width: 100%;
            &::after {
                content: "";
                position: absolute;
                width: 0%;
                height: 2px;
                background-color: white;
                top: 110%;
                left: 0;
                transition: all .3s;
            }
        }
        &.on, &:hover {
                p::after {
                    width: 100%;
                }
            }
    }
    @media (min-width: 641px) and (max-width: 1024px) {
        li {
            padding: 0 10px;
            p {
                font-size: 14px;
                &::after {
                    top: 100%;
                    height: 1px;
                }
            }
        }
    }
    @media (max-width: 640px) {
        width: 100%;
        justify-content: space-between;
        li {
            padding: 0 10px;
            width: fit-content;
            p {
                font-size: 18px;
            }
        }
    }
`
const ContentQnaCatWrap = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    li {
        width: fit-content;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 24px;
        position: relative;
        &::after {
            position: absolute;
            content: "";
            width: 0%;
            height: 2px;
            left: 0;
            top: 110%;
            background-color: #143B63;
            transition: all .5s;
        }
        &:hover::after {
            width: 100%;
        }
    }
    @media (min-width: 641px) and (max-width: 1024px) {
        li {
            font-size: 16px !important;
        }
    }
    @media (max-width: 640px) {
        li {
            font-size: 20px !important;
        }
        width: 100%;
        height: 100%;
    }
`
const ContentQnaCatDateWrap = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-right: 30px;
`
const ContentCurtainWrap = styled.div`
    display: table;
    table-layout: fixed;
    width: 100%;
    height: 100%;
    @media (max-width: 640px) {
        display: flex;
        flex-direction: column;
    }
`
const ContentCurtainItem = styled.div`
    display: table-cell;
    width: 33%;
    height: 100px;
    background: ${(props) => props.background || "none"};
    background-position: center;
    background-size: cover;
    transition: all .5s ease-in-out;
    &:hover {
        width: 43%;
        & > div {
            background-color: transparent;
            &::after,::before {
                width: 150px;
            }
            p {
                color: white;
            }
        }
    }
    @media (max-width: 640px) {
        width: 100%;
        height: 33%;
        &:hover {
            width: 100%;
        & > div {
            background-color: transparent;
            &::after,::before {
                width: 150px;
            }
        }
    }
    }
`
const ContentCurtainItemTextWrap = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 36px;
    background-color: rgba(255,255,255,0.4);
    transition: all .5s;
    p {
        margin: 15px 0;
    }
    &::after {
        position: absolute;
        content: "";
        top: 37%;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background-color: #143B63;
        transition: all .5s;
    }
    &::before {
        position: absolute;
        content: "";
        top: 65%;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background-color: #143B63;
        transition: all .5s;
    }
    @media (min-width: 641px) and (max-width: 1024px) {
        &::before {
            height: 2px;
        }
        &::after {
            height: 2px;
        }
    }
    @media (max-width: 640px) {
        p {
        margin: 0;
        }
        &::before {
            top: 85%;
            height: 3px;
        }
        &::after {
            top: 18%;
            height: 3px;
        }
    }
`
const ContentCurtainItemButton = styled.div`
    width: 130px;
    height: 45px;
    background-color: black;
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        width: 70px;
        height: 24px;
        p {
            font-size: 10px;
        }
    }
`
const ContentPortalWrap = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ContentPortalItems = styled.div`
    width: 200px;
    height: 50px;
    background: ${(props) => props.background || "none"};
    background-size: cover;
    background-position: center;
    @media (min-width: 641px) and (max-width: 1024px) {
        width: 140px;
        height: 37px;
    }
    @media (max-width: 640px) {
        width: 120px;
        height: 30px;
    }
`
function Main() {

    const IsDesktop = useMediaQuery({ query: "(min-width: 1025px"})
    const IsTablet = useMediaQuery({ query: "(min-width: 641px) and (max-width: 1024px)" });
    const IsMobile = useMediaQuery({ query: "(max-width: 640px)" });

    const [QnaCatItems, setQnaCatItems] = useState([]);
    const [CurtainItems, setCurtainItems] = useState([]);
    const [mainIcons, setMainIcons] = useState([]);
    const [mainCatNavs, setMainCatNavs] = useState([]);
    const [PortalItems, setPortalItems] = useState([]);
    const fetchUsers = async() => {
        const response = await axios.get(
            'Nav.json'
        );
        setCurtainItems(response.data.ContentCurtain);
        setQnaCatItems(response.data.QnaCatItems);
        setMainIcons(response.data.mainIcons);
        setMainCatNavs(response.data.mainCatNavs);
        setPortalItems(response.data.ContentPortal);
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const [isMainBannerIndex, setIsMainBannerIndex] = useState(0);
    const [isNewsSlideChanged, setIsNewsSlideChanged] = useState(false);
    const [isImgHover, setIsImgHover] = useState(false);
    const [isCatClicked, setIsCatClicked] = useState(0);

    const swiperRef = useRef(null);

    const toSlide = (num) => {
        swiperRef.current?.swiper.slideTo(num);
    };
        return (
        <>
            <ContentMainBannerSwiperWrap>
                <Swiper
                    ref={swiperRef}
                    onTransitionEnd={(e) => setIsMainBannerIndex(e.realIndex)}
                    modules={[ Navigation, Pagination, Scrollbar, A11y, EffectFade ]}
                    style={{ width: "100%", height: "100%"}}
                    slidesPerView={1}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    loopedSlides={0}
                    >
                    <SwiperSlide><SwiperSlidesBackground background="url('./Images/banner1.png')"/></SwiperSlide>
                    <SwiperSlide><SwiperSlidesBackground background="url('./Images/banner2.png')"/></SwiperSlide>
                    <SwiperSlide><SwiperSlidesBackground background="url('./Images/banner3.png')"/></SwiperSlide>
                    <SwiperSlide><SwiperSlidesBackground background="url('./Images/banner4.png')"/></SwiperSlide>
                </Swiper>
            </ContentMainBannerSwiperWrap>
            <ImageWrap>
                <p><span>국민</span>과 함께하는</p>
                <p>세계일류 <span>문화</span>매력국가</p>
                <img src='./Images/arrow1.png' alt='arrow' />
            </ImageWrap>
            {IsDesktop && <ImageMouseScroll></ImageMouseScroll>}
            <MainBannerButtonWrap>
                {
                    [0,1,2,3].map((e,index)=>{
                        return (
                            <MainBannerButtonRect key={index} onClick={() => toSlide(index+1)} className={isMainBannerIndex === index && "on"}><MainBannerButtonCircleLeft className={isMainBannerIndex === index && "on"}></MainBannerButtonCircleLeft><MainBannerbuttonCircleRight className={isMainBannerIndex === index && "on"}></MainBannerbuttonCircleRight></MainBannerButtonRect>
                        )
                    })
                }
            </MainBannerButtonWrap>

            <ContentMainMenu style={{flexDirection: "column"}}>
                {IsDesktop && <ContentMainTitle>주요메뉴</ContentMainTitle>}
                {IsTablet && <ContentMainTitle>주요메뉴</ContentMainTitle>}
                <ContentMainMenuItemWrap>
                    {
                        mainIcons.map((e) => {
                            return <ContentMainMenuItems key={e.id}><img style={{width: "80px", height: "80px"}} src={e.src} alt={e.text}/><p>{e.text}</p></ContentMainMenuItems>
                        })
                    }
                </ContentMainMenuItemWrap>
            </ContentMainMenu>

            <ContentMainMenu style={{flexDirection: "column"}} mheight="450px" theight="523px" height="820px" background="url('./Images/backimage1.png')">
                {IsDesktop && <ContentMainTitle>문화광장</ContentMainTitle>}
                {IsTablet && <ContentMainTitle>문화광장</ContentMainTitle>}
                <ContentCultureWrap>
                    <ContentCultureItemLeft>
                        <img
                            onMouseOver={() => setIsImgHover(true)}
                            onMouseOut={() => setIsImgHover(false)}
                            src={isImgHover ? './Images/c-hover.png' : './Images/c.png'}
                            alt='cultureC'
                        />
                    </ContentCultureItemLeft>
                    <ContentCultureItemRight>
                        <img src='./Images/CST.png' alt='CST' />
                        <ContentCultureItemRightItemsWrap>
                            <ContentCultureItemRightItems>
                                <li>문화</li>
                                <li>예술</li>
                                <li>체육</li>
                            </ContentCultureItemRightItems>
                            <ContentCultureItemRightItems>
                                <li>콘텐츠</li>
                                <li>미디어</li>
                            </ContentCultureItemRightItems>
                            <ContentCultureItemRightItems>
                                <li>관광</li>
                                <li>종교</li>
                                <li>홍보</li>
                            </ContentCultureItemRightItems>
                        </ContentCultureItemRightItemsWrap>
                    </ContentCultureItemRight>
                </ContentCultureWrap>
            </ContentMainMenu>

            <ContentMainMenu mheight="970px" theight="400px" height="710px" justify="flex-start">
                <ContentNoticeLeftWrap>
                    { IsDesktop &&                
                        <ContentNoticeSwiperPaginationCustumWrap>
                            <ContentNoticeSwiperPaginationCustum>
                                <ContentNoticePaginationItemWrap>
                                    <p style={{fontWeight: "bold"}}>01</p>
                                    <p style={{fontWeight: "bold"}}>02</p>
                                    <p style={{fontWeight: "bold"}}>03</p>
                                </ContentNoticePaginationItemWrap>
                                <ContentNoticePaginationProgressBar className={(isNewsSlideChanged === true) ? "on" : null}></ContentNoticePaginationProgressBar>
                            </ContentNoticeSwiperPaginationCustum>
                        </ContentNoticeSwiperPaginationCustumWrap>
                    }
                    { IsTablet &&                
                        <ContentNoticeSwiperPaginationCustumWrap>
                            <ContentNoticeSwiperPaginationCustum>
                                <ContentNoticePaginationItemWrap>
                                    <p style={{fontWeight: "bold"}}>01</p>
                                    <p style={{fontWeight: "bold"}}>02</p>
                                    <p style={{fontWeight: "bold"}}>03</p>
                                </ContentNoticePaginationItemWrap>
                                <ContentNoticePaginationProgressBar className={(isNewsSlideChanged === true) ? "on" : null}></ContentNoticePaginationProgressBar>
                            </ContentNoticeSwiperPaginationCustum>
                        </ContentNoticeSwiperPaginationCustumWrap>
                    }
                    <ContentNoticeSwiperWrap>
                        <Swiper
                            onSlideChangeTransitionStart={() => setIsNewsSlideChanged(!isNewsSlideChanged)}
                            onSlideChangeTransitionEnd={() => setIsNewsSlideChanged(!isNewsSlideChanged)}
                            style={{ width: "100%", height: "100%" }}
                            modules={[ Navigation, Pagination, Scrollbar, A11y, EffectFade ]}
                            slidesPerView={1}
                            scrollbar={{ draggable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            loopedSlides={1}>
                            <SwiperSlide style={{width: "100%", height: "100%", background: "url('./Images/small_banner1.png')", backgroundPosition: "center", backgroundSize: "100% 100%"}}></SwiperSlide>
                            <SwiperSlide style={{width: "100%", height: "100%", background: "url('./Images/small_banner2.png')", backgroundPosition: "center", backgroundSize: "100% 100%"}}></SwiperSlide>
                            <SwiperSlide style={{width: "100%", height: "100%", background: "url('./Images/small_banner3.jpg')", backgroundPosition: "center", backgroundSize: "100%"}}></SwiperSlide>
                        </Swiper>
                    </ContentNoticeSwiperWrap>
                </ContentNoticeLeftWrap>
                <ContentNoticeRightWrap>
                    { IsDesktop &&                  
                        <ContentItemsWrap theight= "110px" height="200px">
                            <ContentItemsTextWrap style={{fontFamily: "nanumR"}}>
                                <p style={{ fontSize: "42px", marginBottom: "15px", fontWeight: "bold"}}>알려드립니다.</p> 
                                <p style={{ fontSize: "20px"}}>문체부의 다양한 소식을 확인하세요.</p> 
                            </ContentItemsTextWrap>
                        </ContentItemsWrap>
                    }
                    { IsTablet &&        
                        <ContentItemsWrap theight= "110px" height="200px">          
                            <ContentItemsTextWrap>
                                <p style={{ fontSize: "15px"}}>문체부의 다양한 소식을 확인하세요.</p> 
                                <p style={{ fontSize: "23px", marginBottom: "3px", fontWeight: "bold"}}>알려드립니다.</p> 
                            </ContentItemsTextWrap>
                        </ContentItemsWrap>
                    }
                    <ContentItemsWrap mMargin="15px" theight= "40px" height="70px" backColor="#143b63" justify="flex-end">
                        <ContentItemsCatWrap>
                            {
                                mainCatNavs.map((e, index) => {
                                    return <li 
                                        key={e.id}
                                        onClick={() => setIsCatClicked(index)}
                                        className={isCatClicked === index ? 'on' : null}
                                        ><p>{e.text}</p></li>
                                })
                            }
                        </ContentItemsCatWrap>
                    </ContentItemsWrap>
                    <ContentItemsWrap theight= "250px" height="440px">
                        <ContentItemsTextWrap height="70%">
                            <ContentQnaCatWrap>
                                {
                                    QnaCatItems.map((e) => {
                                        return <li
                                        key={e.id}>
                                            <ContentQnaCatDateWrap>
                                                { IsDesktop && <p style={{fontSize: "36px", fontWeight: "bold"}}>{e.Ddate}</p> }
                                                { IsDesktop && <p style={{fontSize: "17px"}}>{e.YMdate}</p> }
                                                { IsTablet && <p style={{fontSize: "20px", fontWeight: "bold"}}>{e.Ddate}</p> }
                                                { IsTablet && <p style={{fontSize: "10px"}}>{e.YMdate}</p> }
                                                { IsMobile && <p style={{fontSize: "30px", fontWeight: "bold"}}>{e.Ddate}</p> }
                                                { IsMobile && <p style={{fontSize: "18px"}}>{e.YMdate}</p> }
                                            </ContentQnaCatDateWrap>{e.text}
                                        </li>
                                    })
                                }
                            </ContentQnaCatWrap>
                        </ContentItemsTextWrap>
                    </ContentItemsWrap>
                </ContentNoticeRightWrap>
            </ContentMainMenu>

            <ContentMainMenu mheight="740px" theight= "475px" height="880px">
                <ContentCurtainWrap>
                    {
                        CurtainItems.map((e) => {
                            return <ContentCurtainItem key= {e.id} background={e.src}>
                                    <ContentCurtainItemTextWrap>
                                        { IsDesktop &&<p style={{fontWeight: "bold"}}>{e.title}</p> }
                                        { IsDesktop &&<p style={{fontSize: "24px"}}>{e.subtitle}</p> }
                                        { IsTablet && <p style={{fontSize: "20px", fontWeight: "bold"}}>{e.title}</p> }
                                        { IsTablet && <p style={{fontSize: "13px"}}>{e.subtitle}</p> }
                                        { IsMobile &&<p style={{fontWeight: "bold"}}>{e.title}</p> }
                                        { IsMobile &&<p style={{fontSize: "24px"}}>{e.subtitle}</p> }
                                        <ContentCurtainItemButton><p>VIEW MORE</p></ContentCurtainItemButton>
                                    </ContentCurtainItemTextWrap>
                                </ContentCurtainItem>
                        })
                    }
                </ContentCurtainWrap>
            </ContentMainMenu>
            
            <ContentMainMenu mheight="135px" theight="135px" height="200px">
                <ContentPortalWrap>
                    <Swiper
                        breakpoints= {{
                            641: {
                                slidesPerView: 5
                            }
                        }}
                        style={{ width: "90%", height: "100%" }}
                        modules={[ Navigation, Pagination, Scrollbar, A11y ]}
                        slidesPerView={3}
                        scrollbar={{ draggable: true }}
                        loop={true}
                        loopedSlides={1}>
                    {
                        PortalItems.map((e) => {
                            return <SwiperSlide style={{width: "20%", height: "100%"}} key={e.id}><ContentPortalItems background={e.src}></ContentPortalItems></SwiperSlide>
                        })
                    }
                    </Swiper>
                </ContentPortalWrap>
            </ContentMainMenu>
        </>
    )
}

export default Main
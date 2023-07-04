import { useMemo, useState } from "react"

import Gravatar from "react-gravatar"
import { toast } from "react-toastify"
import { styled } from "styled-components"
import { nanoid } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import useClickOutside from "react-use-click-outside-hook"

import Logo from "../../extra/Logo"
import homeDark from "/icons/home-dark.svg"
import plusDark from "/icons/plus-dark.svg"
import plusLight from "/icons/plus-light.svg"
import homeLight from "/icons/home-light.svg"
import logoutRed from "/icons/logout-red.svg"
import premiumGold from "/icons/premium-gold.svg"
import exploreDark from "/icons/explore-dark.svg"
import exploreLight from "/icons/explore-light.svg"
import dropdownDark from "/icons/dropdown-dark.svg"
import dropdownLigh from "/icons/dropdown-light.svg"
import settingsDark from "/icons/settings-dark.svg"
import settingsLight from "/icons/settings-light.svg"
import bookmarkDark from "/icons/bookmark-dark.svg"
import bookmarkLight from "/icons/bookmark-light.svg"
import analyticsDark from "/icons/analytics-dark.svg"
import analyticsLight from "/icons/analytics-light.svg"
import notificationDark from "/icons/notification-dark.svg"
import notificationLight from "/icons/notification-light.svg"

import SilentLink from "../../extra/SilentLink"
import useApi from "../../../hooks/useApi"
import { switchAccount } from "../../../../store/authSlice"
import useCurrentSession from "../../../hooks/useCurrentSession"
import { isPathnameEqual, logoutHandler, sliceNumber, trimText } from "../../../functions"


const LeftSideBar = ({ }) => {
    // global states //
    const { theme } = useSelector(state => state.ui)
    const { sessions } = useSelector(state => state.auth)
    const { username, email, isProMember, notificationCount, bookmarkCount, image } = useCurrentSession()

    // Local states
    const [isAccountModalOpen, setAccount] = useState(false)

    // Hooks //
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { api } = useApi(true)
    const { sessionId } = useCurrentSession()

    // Local variables
    const buyPremiumHandler = () => {
        console.log("Buy premium");
    }

    const LogoutHandler = () => {
        logoutHandler(dispatch, api, sessionId)
    }

    const navItems = useMemo(() => (
        [
            {
                id: nanoid(),
                title: "Home",
                imgLight: homeLight,
                imgDark: homeDark,
                url: ""
            },
            {
                id: nanoid(),
                title: "Explore",
                imgLight: exploreLight,
                imgDark: exploreDark,
                url: '/explore'
            },
            {
                id: nanoid(),
                title: "Notifications",
                imgLight: notificationLight,
                imgDark: notificationDark,
                url: '/notification',
                hasCount: true,
                count: sliceNumber(notificationCount)
            },
            {
                id: nanoid(),
                title: "Bookmarks",
                imgLight: bookmarkLight,
                imgDark: bookmarkDark,
                url: '/bookmarks',
                hasCount: true,
                count: sliceNumber(bookmarkCount)
            },
            {
                id: nanoid(),
                title: "Analytics",
                imgLight: analyticsLight,
                imgDark: analyticsDark,
                url: '/analytics',
            },
            {
                id: nanoid(),
                title: "Settings",
                imgLight: settingsLight,
                imgDark: settingsDark,
                url: "/settings",
            },
        ]
    ), [email])

    const bottomNavItems = useMemo(() => {
        const temp = [
            {
                id: nanoid(),
                title: "Logout",
                imgLight: logoutRed,
                imgDark: logoutRed,
                action: LogoutHandler,
                className: "logout",
            },
        ]

        if (!isProMember) {
            temp.unshift({
                id: nanoid(),
                title: "Buy Premium",
                imgLight: premiumGold,
                imgDark: premiumGold,
                action: buyPremiumHandler,
                className: "golden-btn",
            })
        }

        return temp

    }, [email])

    const toggleDropdown = () => setAccount(false)

    // custom hooks //
    const accountModalRef = useClickOutside(toggleDropdown, "accountModalParent")


    const AccountsModal = ({ }) => {

        const handler = (Email = "") => {
            if (Email === email) {
                navigate(`/${username}`)
                
                return
            } else {
                dispatch(switchAccount({ email: Email }))
                navigate("/")
                toast.info("Account switched successfully")
                toggleDropdown()
            }
        }

        return (
            <ModalWrapper ref={accountModalRef}>
                {
                    sessions
                        ?.map((session) => (
                            <ModalItem
                                theme={theme}
                                key={session.sessionId}
                                onClick={() => handler(session.email)}
                            >
                                <div className="wrapper">
                                    {session.image ? (
                                        <img
                                            loading="lazy"
                                            className="profile" 
                                            src={session.image}
                                            alt=""
                                        />
                                    ) : (
                                        <Gravatar
                                            role="img"
                                            email={session.email}
                                        />
                                    )}
                                    <span>{trimText(session.username, 14)}</span>
                                </div>
                                <div className="switch">
                                    {session.email === email && <span className="round"></span>}
                                </div>
                            </ModalItem>
                        ))
                }
                <AddNew theme={theme}>
                    <div className="wrapper" onClick={e => navigate('/sign-in')}>
                        <div className="img-wrapper">
                            <img className="profile" src={theme === "DARK" ? plusLight : plusDark} alt="" />
                        </div>
                        <span>Add new </span>
                    </div>
                </AddNew>
            </ModalWrapper>
        )
    }


    return (
        <Container theme={theme}>
            <TopWrapper>
                <Head>
                    <SilentLink to="/">
                        <Logo />
                    </SilentLink>
                </Head>
                <Nav>
                    <Profile theme={theme}>
                        <div
                            className="wrapper"
                            onClick={e => navigate(`/${username}`)}
                        >
                            {image ? (
                                <img
                                    loading="lazy"
                                    className="profile"
                                    src={image}
                                    alt=""
                                />
                            ) : (
                                <Gravatar
                                    role="banner"
                                    email={email}
                                />
                            )}
                            <span>{trimText(username, 14)}</span>
                        </div>
                        <div
                            className="dropdown-wrapper"
                            onClick={() => setAccount(!isAccountModalOpen)}
                            id="accountModalParent"
                        >
                            <img
                                className="dropdown"
                                src={theme === "DARK" ? dropdownLigh : dropdownDark}
                                alt=""
                            />
                        </div>
                        {isAccountModalOpen && (
                            <AccountsModal />
                        )}
                    </Profile>
                    {
                        navItems.map(nav => (
                            <NavItem
                                key={nav.id}
                                className={isPathnameEqual(nav.url) ? "active" : ""}
                                theme={theme}
                                onClick={e => navigate(nav.url)}
                            >
                                <div className="wrapper">
                                    <div className="left">
                                        <img
                                            src={theme === "DARK" ? nav.imgLight : nav.imgDark}
                                            alt="icon"
                                        />
                                    </div>
                                    <span>{nav.title}</span>
                                </div>
                                {nav?.hasCount && (
                                    <span
                                        className="count"
                                    >
                                        {nav?.count}
                                    </span>
                                )}
                            </NavItem>
                        ))
                    }
                </Nav>
            </TopWrapper>
            <BottomWrapper>
                {
                    bottomNavItems.map(nav => (
                        <NavItem
                            key={nav.id}
                            className={[nav?.url ? (isPathnameEqual(nav?.url) ? "active " : " ") : " ", ` ${nav?.className}`]}
                            theme={theme}
                            onClick={e => nav?.action()}
                        >
                            <div className="wrapper">
                                <div className="left">
                                    <img
                                        src={theme === "DARK" ? nav.imgLight : nav.imgDark}
                                        alt="icon"
                                    />
                                </div>
                                <span>{nav.title}</span>
                            </div>
                        </NavItem>
                    ))
                }
            </BottomWrapper>
        </Container>
    )
}

export default LeftSideBar

const Container = styled.div`
    width: 18%;
    height: calc(100vh - 24px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 12px;
    border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"};
    /* border: 1px solid #222222; */
    box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
    transition: all 0.4s ease-in-out;
    padding: 28px 0;
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#00b90214"};
    /* background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#a0a0a045"}; */
`

const Head = styled.header`
    padding: 28px 26px;
    padding-top: 0;
`

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 1;
`

const Profile = styled.div`
    display: flex;
    z-index: 5;
    align-items: center;
    justify-content: space-between;
    padding: 12px 26px ;
    gap: 4px;
    user-select: none;
    margin-bottom: 24px;
    position: relative;

    .wrapper{
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px;
        cursor: pointer;
        border: 1px solid transparent;

        /* &:hover{
            border-radius: 6px;
            border-color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"};
        } */
        img.react-gravatar{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
        
        img.profile{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }

        span{
            font-size: 16px;
            /* font-weight: 600; */
            color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"};
        }
    }

    div.dropdown-wrapper{
        width: 35px;
        height: 35px;
        /* padding: 12px; */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &:hover{
            background: #8080801a;
            border: 1px solid ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"};
            border-radius: 20%;
            transition: border 0.3s ease-in-out;
        }
        img.dropdown{
            width: 14px ;
            display: inline-block;
        }

    }
`

const NavItem = styled.div`
    padding: 12px 0 ;
    margin: 0 26px;
    padding: 12px;
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    gap: 18px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.3s ease-in-out;
    border-radius: 8px;

    &:hover, 
    &.active{
        background:  ${({ theme }) => theme === "DARK" ? "#8080801a" : "#fff"};
        border-color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"};
    }


    &>.wrapper{
        margin: 0;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
        gap: 18px;

        .left{
            img{
                width: 18px;
            }
        }
        span{
            font-size: 15px;
            color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"};
        }
    }

    span.count{
        font-size: 14px;
        // color: red;
        font-weight: 600;
        /* color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"}; */
        /* color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"}; */
    }

    &.active{
        span{
            font-weight: 600;
        }
    }
    &.golden-btn{
        span{
            color: rgb(120,50,5);
        }

        &:hover{
            background-size: 150% 150%;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23),
                        inset 0 -2px 5px 1px #b17d10,
                        inset 0 -1px 1px 3px rgba(250,227,133,1);
            border: 1px solid rgba(165,93,7,.6);
            background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
        }
    }
    &.logout{
        span{
            color: red;
            font-size: 14px;
            font-weight: 600;
        }
    }
`
const TopWrapper = styled.div`
    
`

const BottomWrapper = styled(Nav)`
    
`

///////////  Accounts Modal ////////////

const ModalWrapper = styled.div`
    position: absolute;
    width: 94%;
    border-radius: 18px;
    top: 60px;
    left: 3%;
    padding: 12px;
    background: rgb(27 28 31);
    border: 1px solid #d9d7d7;
    /* border-radius: 20%; */
    /* transition: border 0.3s ease-in-out; */
    z-index: 10;
`

const ModalItem = styled(Profile)`
    padding: 0;
    margin: 0;
    margin-bottom: 1px;
    z-index: 10;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    flex-wrap: wrap;
    /* background-color: inhe; */

    .wrapper{
        margin: 0 ;
        /* padding: 0; */
        span{
            font-size: 14px;
            flex: 1;
        }
        .react-gravatar{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
    }
    .switch{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin: 0 !important;
        padding: 0 !important;
        border:1px solid#808080;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        span.round{
            padding: 0 !important;
            margin: 0 !important;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #808080;
        }
    }

    &:last-child{
        margin-bottom: 0;
    }
`

const AddNew = styled(ModalItem)`
    .wrapper .img-wrapper{
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        border-radius: 50%;

        img{
            width: 15px;
        }
    }
`
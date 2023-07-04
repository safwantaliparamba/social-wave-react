import { useEffect, useRef, useState } from "react"

import { useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import { styled } from "styled-components"

import ThemeToggle from "../../ToggleTheme"
import profile from "/images/profile-demo.jpg"
import searchDark from "/icons/search-dark.svg"
import searchLight from "/icons/search-light.svg"
import SearchResults from "../../../modals/main/SearchResults"
import useTabNavigation from "../../../hooks/useTabNavigation"


const Header = ({ }) => {
    // Global state
    const { theme } = useSelector(state => state.ui)

    // Local State
    const [isActive, setActive] = useState(false)
    const [searchInput, setSearch] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [results, setResults] = useState([
        {
            id: nanoid(),
            username: "safwantaliparamba",
            image: profile,
            isFollowing: false,
        },
        {
            id: nanoid(),
            username: "hiyas_usman",
            image: profile,
            isFollowing: false,
        },
        {
            id: nanoid(),
            username: "monkey_d_luffy",
            image: profile,
            isFollowing: true,
        },
        {
            id: nanoid(),
            username: "Zoro",
            image: profile,
            isFollowing: false,
        },
        {
            id: nanoid(),
            username: "Sanji",
            image: profile,
            isFollowing: true,
        },
        {
            id: nanoid(),
            username: "hiyas_usman",
            image: profile,
            isFollowing: false,
        },
        {
            id: nanoid(),
            username: "monkey_d_luffy",
            image: profile,
            isFollowing: true,
        },
        {
            id: nanoid(),
            username: "Zoro",
            image: profile,
            isFollowing: false,
        },
        {
            id: nanoid(),
            username: "Sanji",
            image: profile,
            isFollowing: true,
        },
    ])

    // hooks
    useTabNavigation("focusable")

    // functions
    const SearchHandler = () => {
        console.log("Search handler triggered");
    }

    // Effects 
    useEffect(() => {
        const searchInput = document.getElementById("search-input")
        const handleKeyDown = (event) => {
            if (event.key === "/" && document.activeElement !== searchInput) {
                event.preventDefault()
                setActive(true)
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const modalCloseHandler = () => setActive(false)

    const onSearchChange = (e) => setSearch(e.target.value)

    return (
        <HeaderContainer theme={theme}>
            <LeftContainer>
                <SearchBar
                    theme={theme}
                    className={isActive ? "active" : ""}
                    id="search-input"
                >
                    {isActive ? (
                        <input
                            type="text"
                            tabIndex={0}
                            autoFocus
                            onChange={onSearchChange}
                            value={searchInput}
                            placeholder='Search creators..'
                            className="focusable"
                        />
                    ) : (
                        <span
                            onClick={e => setActive(!isActive)}
                        >
                            Enter <kbd>/</kbd> to search
                        </span>
                    )}
                    <button onClick={SearchHandler}>
                        <img
                            src={theme === "DARK" ? searchLight : searchDark}
                            alt=""
                        />
                    </button>
                    {isActive && (
                        <SearchResults
                            closeHandler={modalCloseHandler}
                            isLoading={isLoading}
                            users={results}
                        />
                    )}
                </SearchBar>
            </LeftContainer>
            <RightContainer>
                <ThemeToggle />
            </RightContainer>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    /* height: 100px; */
    margin: 12px;
    margin-left: 0;
    padding: 19px 32px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
    transition: all 0.5s ease-in-out;
    border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"};
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#00b90214"};
    /* background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#a0a0a045"}; */

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LeftContainer = styled.div`
    width: 60%;
`

const RightContainer = styled.div`
    
`

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    /* justify-content: space-between; */
    /* gap: 24px; */
    width: 50%;
    padding: 10px 18px;
    border-radius: 15px;
    transition: all 0.4s ease-in-out;
    border: 1px solid ${({ theme }) => theme === "DARK" ? "#D9D9D9" : "#222"};

    &.active{
        width: 70%;
    }
    
    input,span{
        width: calc(100% - 42px);
        /* width: 80%; */
        font-size: 14px;
        letter-spacing: 1.2px;
        flex: 1;
        color: ${({ theme }) => theme === "DARK" ? "#EAEAEA" : "#222222"};
        
        &::placeholder{
            color: ${({ theme }) => theme === "DARK" ? "#EAEAEA" : "#222222"};
        }
    }

    span{
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;

        kbd{
            display: inline-grid;
            width: 12px;
            height: 16px;
            padding: 0;
            font-size: 12px;
            line-height: 1.3333333333;
            color: inherit;
            vertical-align: baseline;
            background: transparent;
            border: 1px solid #808080;
            border-radius: 3px;
            box-shadow: none;
            align-items: center;
            justify-content: center;
        }
    }

    button{
        padding: 0 8px;
        cursor: pointer;

        img{
            width: 20px;
        }
    }
`
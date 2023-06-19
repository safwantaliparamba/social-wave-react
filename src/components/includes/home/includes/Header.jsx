import { useSelector } from "react-redux"
import { styled } from "styled-components"

import ThemeToggle from "../../ToggleTheme"
import searchDark from "/icons/search-dark.svg"
import searchLight from "/icons/search-light.svg"


const Header = ({ }) => {
    const { theme } = useSelector(state => state.ui)

    const SearchHandler = ()=>{
        console.log("Search handler triggered");
    }

    return (
        <HeaderContainer theme={theme}>
            <LeftContainer>
                <SearchBar theme={theme}>
                    <input type="text" placeholder="Search creators..." />
                    <button onClick={SearchHandler}>
                        <img src={theme === "DARK" ? searchLight : searchDark} alt="" />
                    </button>
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
    /* justify-content: space-between; */
    /* gap: 24px; */
    width: 70%;
    padding: 10px 18px;
    border-radius: 18px;
    border: 1px solid ${({theme}) => theme === "DARK" ? "#D9D9D9": "#222"};
    
    input{
        width: calc(100% - 42px);
        /* width: 80%; */
        font-size: 14px;
        letter-spacing: 1.2px;
        flex: 1;
        color: ${({theme}) => theme === "DARK" ? "#EAEAEA":"#222222"};
        
        &::placeholder{
            color: ${({theme}) => theme === "DARK" ? "#EAEAEA":"#222222"};
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
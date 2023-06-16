import { styled } from "styled-components"
import ThemeToggle from "../../ToggleTheme"
import { useSelector } from "react-redux"


const Header = ({ }) => {
    const { theme } = useSelector(state => state.ui)

    return (
        <HeaderContainer theme={theme}>
            <ThemeToggle />
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    height: 100px;
    margin: 12px;
    margin-left: 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
    transition: all 0.5s ease-in-out;
    border: 1px solid ${({theme}) => theme === "DARK" ? "rgb(38,39,42)": "transparent"};
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#fff"};
`

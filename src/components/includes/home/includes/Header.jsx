import { styled } from "styled-components"
import ThemeToggle from "../../ToggleTheme"


const Header = ({ }) => {
    return (
        <HeaderContainer>
            <ThemeToggle />
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    height: 100px;
    border: 1px solid #111;
`

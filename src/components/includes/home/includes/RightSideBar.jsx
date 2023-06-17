import { useSelector } from "react-redux"
import { styled } from "styled-components"


const RightSideBar = ({ }) => {
    const { theme } = useSelector(state => state.ui)
    return (
        <RightSideBarContainer theme={theme}>

        </RightSideBarContainer>
    )
}

export default RightSideBar

const RightSideBarContainer = styled.div`
    width: 20%;
    margin: 12px;
    height: calc(100vh - 136px);
    margin-top: 0;
    margin-bottom: 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
    transition: all 0.5s ease-in-out;
    border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"};
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#a0a0a045"};
`
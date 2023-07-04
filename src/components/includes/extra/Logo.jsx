import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'


const Logo = ({ fontSize = 22, color = null }) => {
    const theme = useSelector(state => state.ui.theme)

    return (
        <Head
            fontSize={fontSize}
            theme={theme}
            color={color}
            className={color ? "color" : ""}
        >
            <span>Social</span>Waves
        </Head>
    )
}

export default Logo

const Head = styled.h1`
    font-size: ${({ fontSize }) => `${fontSize}px`};
    color: ${({ theme }) => theme === "DARK" ? "#fff" : "#111"};
    cursor: pointer;
    user-select:none;

    span{
        font-size:inherit;
        font-weight: 600;
        color:inherit;
    }

    &.color{
        color:${({ color }) => color}
    }
`
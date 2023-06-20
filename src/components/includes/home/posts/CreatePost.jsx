import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

import reelDark from "/icons/reel-dark.svg"
import reelLight from "/icons/reel-light.svg"
import shareDark from "/icons/share-dark.svg"
import shareLight from "/icons/share-light.svg"
import galleryDark from "/icons/gallery-dark.svg"
import galleryLight from "/icons/gallery-light.svg"


const CreatePost = () => {
    // Global states
    const { theme } = useSelector(state => state.ui)

    // local states
    const [isInputActive, setActive] = useState(false)

    const onChange = (e) => {
        const caption = e.target.value

        if (caption.length > 0) {
            setActive(true)
        }
    }

    return (
        <Wrapper>
            <Content theme={theme}>
                <Top theme={theme}>
                    <textarea
                        placeholder="Compose new post"
                        onChange={onChange}
                    />
                </Top>
                <Bottom>
                    <BottomLeftWrapper>
                        <Button>
                            <img src={theme === "DARK" ? galleryLight : galleryDark} alt="gallery" />
                            <span>Add Photo</span>
                        </Button>
                        <Button>
                            <img src={theme === "DARK" ? reelLight : reelDark} alt="reel" />
                            <span>Add Reel</span>
                        </Button>
                    </BottomLeftWrapper>
                    <BottomRightWrapper>
                        <ContinueButton className={isInputActive ? "active" : ""}>
                            <img src={theme === "DARK" ? shareLight : shareDark} alt="share" />
                        </ContinueButton>
                    </BottomRightWrapper>
                </Bottom>
            </Content>
        </Wrapper>
    )
}

export default CreatePost



const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
`

const Content = styled.div`
    width: 70%;
    background-color: #0F0F0F;
    border-radius: 18px;
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(22 22 25)" : "#fff"};
    border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"};
`
const Top = styled.div`
    padding: 24px;
    border-bottom: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"};

    textarea{
        display: block;
        margin: 0 auto;
        width: 100%;
        font-size: 17px;
        resize: none;
        color: #808080;
    }
`
const Bottom = styled.div`
    padding: 16px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
`

const Button = styled.button`
    cursor: pointer;
    display: flex;
    gap: 10px;
    align-items: center;
    
    img{
        width: 18px;
    }
    span{
        font-size: 15px;
        transition: all 0.2s ease-in-out;
    }

    &:hover{
        span{
            color: #EAEAEA;
        }
    }
`

const BottomLeftWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`
const BottomRightWrapper = styled.div`
    
`

const ContinueButton = styled.button`
    cursor: not-allowed;
    padding: 6px 18px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    border: 2px solid transparent;

    &:hover { 
        border-color: #808080;
    }

    img{
        width: 16px;
    }
    span{
        font-size: 16px;
    }

    &.active{
        cursor: pointer;
    }
`
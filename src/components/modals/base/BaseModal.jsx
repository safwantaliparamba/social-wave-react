import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import useHandleScroll from "../../hooks/useHandleScroll";


const portalElement = document.getElementById("modal")


const ModalWrapper = ({ children, onClose = () => { } }) => {
    return (
        <Wrapper onClick={onClose}>
            {children}
        </Wrapper>
    )
}

const BaseModal = ({ children, onClick = () => { } }) => {
    useHandleScroll()
    return (
        <>
            {createPortal(
                <ModalWrapper onClose={onClick}>{children}</ModalWrapper>
                , portalElement)}
        </>
    )
}

export default BaseModal


const popup = keyframes`
    0%{
        scale: 0.7;
        opacity: 0.7;
    }
    100%{
        scale: 1;
        opacity: 1;
    }
`


const Wrapper = styled.section`
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #534e4e76;
    z-index: 10;

    .modal{
        width: 420px;
        max-width: 96%;
        background: #fff;
        padding: 32px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        animation: ${popup} 0.4s ease-in-out;
    }
`
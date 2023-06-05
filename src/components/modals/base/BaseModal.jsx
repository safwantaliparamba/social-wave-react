import { createPortal } from "react-dom";
import styled from "styled-components";
import useHandleScroll from "../../hooks/useHandleScroll";


const portalElement = document.getElementById("modal")


const ModalWrapper = ({ children, onClose }) => {
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


const Wrapper = styled.section`
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #534e4e34;
    z-index: 10;
`
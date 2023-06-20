import React from 'react'
import BaseModal from '../modals/base/BaseModal'
import { keyframes, styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'


const Settings = () => {
    const navigate = useNavigate()

    const closeHandler = () => navigate("/")

    return (
        <BaseModal onClick={closeHandler}>
            <Modal>
                <h1>Settings</h1>
            </Modal>
        </BaseModal>
    )
}

export default Settings


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

const Modal = styled.main`
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
`
import React from 'react'
import { keyframes, styled } from 'styled-components'

import BaseModal from '../base/BaseModal'
import { Button } from './Emailverification'
import { useNavigate } from 'react-router-dom'

const SessionExpired = ({ closeHandler = () => { } }) => {
    const navigate = useNavigate()

    const loginHandler = () => {
        navigate('/sign-in/')
        closeHandler()
    }

    return (
        <BaseModal>
            <Modal>
                <Content>
                    <h1>Session Expired</h1>
                    <p>Your session has been expired. Please login</p>
                    <Button className='close' onClick={loginHandler}>
                        Login
                    </Button>
                </Content>
            </Modal>
        </BaseModal>
    )
}

export default SessionExpired


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

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* gap: 16px; */
    h1{
        font-size: 19px;
        font-weight: 600;
        color: #004c64;
    }
    p{
        max-width: 95%;
        text-align: center;
        margin: 14px 0 18px;
        font-size: 16px;
    }
`
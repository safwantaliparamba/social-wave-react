import React from 'react'
import { styled } from 'styled-components'

import BaseModal from '../BaseModal'
import emailIcon from '../../../assets/icons/email.svg'


const Emailverification = () => {
    return (
        <BaseModal>
            <Modal>
                <Top>
                    <img src={emailIcon} alt="" />
                </Top>
                <Content>
                    <h1>Verify your email</h1>
                    <p>Almost there! we sent a verification to saf***@**.com.
                        You need to verify your email address to log in to <span>SocialW    aves</span>.</p>
                </Content>
                <Actions>
                    <Button>Resend Email</Button>
                    <Button className='close'>Close</Button>
                </Actions>
            </Modal>
        </BaseModal>
    )
}

export default Emailverification


const Modal = styled.main`
    
`
const Top = styled.div`
    
`
const Content = styled.div`

`
const Actions = styled.div``

export const Button = styled.button`
    
`
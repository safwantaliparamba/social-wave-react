import React from 'react'
import BaseModal from '../base/BaseModal'
import { styled } from 'styled-components'
import Loader from '../../includes/loaders/Loader'

const GoogleAuthResult = ({ isLoading = false, error = "" }) => {
    return (
        <BaseModal>
            <Modal className='modal'>
                {isLoading && (
                    <Loader />
                )}
            </Modal>
        </BaseModal>
    )
}

export default GoogleAuthResult

const Modal = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
`
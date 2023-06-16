import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../modals/auth/Emailverification'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { logoutHandler } from '../functions'


const Home = () => {
    const dispatch = useDispatch()
    
    // const logoutHandler = ()=>{
    //     dispatch(logout())
    // }
    

    return (
        <Wrapper>
            <h1>Home</h1>
        </Wrapper>
    )
}

export default Home

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    h1{
        font-size: 28px;
        color: #fff;
    }
`
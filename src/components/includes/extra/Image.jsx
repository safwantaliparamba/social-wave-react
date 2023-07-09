import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { nanoid } from '@reduxjs/toolkit';
import { keyframes, styled } from 'styled-components';



const Image = ({ image = "", thumbImage = "" }) => {
    // const [isLoading, setIsLoading] = useState(true);

    const imgRef = useRef()
    const containerRef = useRef()

    useEffect(() => {
        const img = imgRef.current
        const container = containerRef.current

        const loaded = () => {
            container?.classList.add("loaded")
        }

        if (img?.complete) {
            loaded()
        } else {
            img?.addEventListener("load", loaded)
        }

        return () => {
            if (!img?.complete) img?.removeEventListener("load", loaded)
        }
    }, [])

    // const handleImageLoaded = () => {
    //     setIsLoading(false);
    // };

    return (
        <Wrapper
            bg={thumbImage}
            // className={!isLoading ? "loaded" : ""}
            ref={containerRef}
        >
            <img
                ref={imgRef}
                src={image}
                loading='lazy'
                alt="image"
            // onLoad={handleImageLoaded}
            />
            
        </Wrapper>
    );
};

Image.prototypes = {
    image: PropTypes.string.isRequired,
    thumbImage: PropTypes.string.isRequired
}


export default Image;


const pulse = keyframes`
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.1;
    }
    100% {
      opacity: 0;
    }
`

const Wrapper = styled.div`
    background: ${({ bg }) => `url(${bg}) `};
    background-repeat: no-repeat;
    background-size: cover;
    
    img{
        opacity: 0;
        transition: opacity 250ms ease-in-out;
    }
    
    &::before {
        filter: blur(10px);
        content: "";
        position: absolute;
        inset: 0;
        opacity: 0;
        animation: ${pulse} 2.5s infinite;
        background-color: white;
    }

    &.loaded{
        background: none;
        filter:none;
        img{
            opacity: 1;
        }
        &::before {
            animation: none;
            content: none;
        }
    }
`

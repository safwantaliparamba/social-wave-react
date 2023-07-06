import React, { useRef, useState } from "react";

import "cropperjs/dist/cropper.css";
import styled from "styled-components";
import { Cropper as Crop } from "react-cropper";
import { useSelector } from "react-redux";
import { Button } from "../../modals/auth/Emailverification";


const Cropper = ({ closeHandler = () => { }, submitHandler = (img = "") => { }, image = "" }) => {
    const [croppedImage, setImage] = useState("");

    const { theme } = useSelector(state => state.ui)

    const cropperRef = useRef();

    const onCrop = (e) => {
        setImage(cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL());
    };

    return (
        <Overlay>
            <Content theme={theme}>
                <CropWrapper>
                    <Crop
                        ref={cropperRef}
                        src={image}
                        aspectRatio={1 / 1}
                        crop={onCrop}
                    // width="100px"
                    // maxLength="90%"
                    />
                </CropWrapper>
                <SubmitWrapper>
                    <Button onClick={closeHandler}>Cancel</Button>
                    <Button
                        className="save"
                        onClick={() => {
                            submitHandler(croppedImage)
                        }}
                    >
                        Done
                    </Button>
                </SubmitWrapper>
            </Content>
        </Overlay>
    );
};

export default Cropper;

const Overlay = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    background-color: #80808072;
`;

const Content = styled.main`
    width: 600px;
    max-height: 80vh;
    padding: 18px;
    border-radius: 16px;
    box-shadow: 0px 4px 22px rgb(0 0 0 / 10%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;

    background-color: ${({ theme }) => theme === "DARK" ? "rgb(22 22 25)" : "#fff"};
    border: 1px solid ${({ theme }) => theme === "DARK" ? "#D9D9D9a6" : "#222"};
`;

const CropWrapper = styled.div`
    width: 100%;
    max-width: 100%;
    max-height: 600px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .cropper-crop {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100% !important;
        height: 100% !important;
    }

    * {
        /* width: 100%; */
        max-height: 500px;
    }
    /* .cropper-face, .cropper-line, .cropper-point{
        width: 100% ;
        height: 100% !important;
    } */
`;

const SubmitWrapper = styled.footer`
    display: flex;
    justify-content: flex-end;
    gap: 24px;
`;
// const Button = styled.button`
//     padding: 14px 32px;
//     font-size: 16px;
//     font-weight: 600;
//     background-color: #32bcad;
//     color: #fff;
//     border-radius: 8px;
//     cursor: pointer;
// `;

const CancelButton = styled(Button)`
    background: none;
    border: 1px solid #32bcad;
    color: #32bcad;
`;

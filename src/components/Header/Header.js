import React from "react";
import styled from 'styled-components';

const HeaderWrapper=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;    
    align-items: center;
    background-color: #71babf;
`
const TitleWrapper=styled.p`
    color: white;
    font-size: calc(10px + 3vmin);
    height:64px;    
    letter-spacing: 5px;
    text-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.22);
    padding-top:22px;
    font-weight: bold;
`;
const ImgWrapper=styled.img`
    margin: auto;
    width: 100%;
    height: auto;
`;
const AddButton = styled.div`
    cursor: pointer;
    padding: 2px;
    margin-left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(217, 158, 187, 0.89);
    opacity: 0.5;
    box-shadow: 8px 8px 15px rgba(0,0,0,0.5);
`;

const Header = ({title, onShowForm}) => {
    return(
        <HeaderWrapper>
            <TitleWrapper>{title}</TitleWrapper>
            <AddButton onClick={onShowForm}>
                <ImgWrapper src={"../../assets/plus.png"} alt={"not found"}/>
            </AddButton>
        </HeaderWrapper>
    )
};

export default Header;
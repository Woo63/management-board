import React from "react";
import styled from 'styled-components';

const HeaderWrapper=styled.h1`
    color: white;
    background-color: #5d7be8;
    font-size: calc(10px + 2vmin);
    height:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Header = ({title}) => {
    return(
        <HeaderWrapper>
            {title}
        </HeaderWrapper>
    )
};

export default Header;
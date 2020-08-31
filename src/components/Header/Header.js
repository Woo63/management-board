import React from "react";
import styled from 'styled-components';

const HeaderWrapper=styled.p`
    color: white;
    background-color: #71babf;
    font-size: calc(10px + 3vmin);
    height:64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    letter-spacing: 5px;
    text-shadow: 0 2px 2px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.22);
`;

const Header = ({title}) => {
    return(
        <HeaderWrapper>
            {title}
        </HeaderWrapper>
    )
};

export default Header;
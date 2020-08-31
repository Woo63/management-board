import React from "react";
import styled from "styled-components";

const TicketWrapper=styled.div`
    border-top: 1px solid #9b9d9e;
    padding: 20px;    
    text-align: left;
    &:not(:last-child) {
        margin-bottom: 5%;
    }
`;
const Title=styled.h4`
    text-align: center;    
    padding:2%;
`;
const Body=styled.p`
    // width: 100%;
`;
const Ticket=({title, body})=>{
    return(
        <TicketWrapper>
            <Title>{title}</Title>
            <Body>{body}</Body>
        </TicketWrapper>
    )
}

export default Ticket;
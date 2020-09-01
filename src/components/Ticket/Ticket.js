import React from "react";
import styled from "styled-components";

const TicketWrapper=styled.div`
    border-top: 1px solid #9b9d9e;
    padding: 20px;    
    text-align: left;
    &:not(:last-child) {
        margin-bottom: 5%;
        margin-right: ${props => !!props.marginRight ? '1%' : '0'};
    }
`;
const Title=styled.h4`
    text-align: center;    
    padding:2%;
`;
const Body=styled.p`
    // width: 100%;
`;
const Ticket=({ticket, marginRight, onDragStart})=>{
    return(
        <TicketWrapper
            draggable
            onDragStart={e=> onDragStart(e, ticket.id)}
            marginRight={marginRight}>
            <Title>{ticket.title}</Title>
            <Body>{ticket.body}</Body>
        </TicketWrapper>
    )
}

export default Ticket;
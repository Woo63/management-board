import React from "react";
import styled from 'styled-components';
import Table from "../components/Table/Table";
import withDataFetching from "../withDataFetching";

const BoardWrapper=styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    margin:20px 0px 30px;
    flex-wrap:wrap;
    padding:0 15px;
`;

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            tickets: [],
        };
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({tickets: this.props.data});
        }
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    };
    onDragOver = e => {
        e.preventDefault();
    };
    onDrop = (e, tableId) => {
        const id = e.dataTransfer.getData('id');
        const tickets = this.state.tickets.filter(ticket => {
            if (ticket.id === id) {
                ticket.lane = tableId;
            }
            return ticket;
        });
        this.setState({
            ...this.state,
            tickets,
        });
    };

    render() {
        const {tables, loading, error} = this.props;
        return (
            <BoardWrapper>
                {
                    tables.map(item => (
                        <Table
                            key={item.id}
                            tableId={item.id}
                            title={item.title}
                            loading={loading}
                            onDragStart={this.onDragStart}
                            onDragOver={this.onDragOver}
                            onDrop={this.onDrop}
                            error={error}
                            tickets={this.state.tickets.filter(ticket => ticket.lane === item.id)}
                        />
                    ))
                }
            </BoardWrapper>
        );
    }
}

export default withDataFetching(Board);
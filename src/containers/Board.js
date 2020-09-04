import React, {Fragment} from "react";
import styled from 'styled-components';
import Table from "../components/Table/Table";
import withDataFetching from "../withDataFetching";
import NewTicket from "./NewTicket";

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
            tickets: []
        };
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ tickets: this.props.data});
        }
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    };
    onDragOver = e => {
        e.preventDefault();
    };
    onDrop = (e, laneId) => {
        const id = e.dataTransfer.getData('id');

        const tickets = this.state.tickets.filter(ticket => {
            if (ticket.id === parseInt(id)) {
                ticket.lane = laneId;
            }
            return ticket;
        });

        this.setState({
            ...this.state,
            tickets
        });
    };


    render() {
        const {tables, loading, error} = this.props;
        return (
            <Fragment>
                {/*eslint-disable-next-line*/}
                <NewTicket id={this.state.tickets.length}/>
                <BoardWrapper>
                    {
                        tables.map(item => (
                            <Table
                                key={item.id}
                                tableId={item.id}
                                title={item.title}
                                loading={loading}
                                error={error}
                                onDragStart={this.onDragStart}
                                onDragOver={this.onDragOver}
                                onDrop={this.onDrop}
                                tickets={this.state.tickets.filter(ticket => ticket.lane === item.id)}
                            />
                        ))
                    }
                </BoardWrapper>
            </Fragment>
        );
    }
}

export default withDataFetching(Board);
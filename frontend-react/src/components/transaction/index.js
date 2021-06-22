import React, { Component } from "react";
import TransactionDataService from "../../services/transaction.service";

export default class IndexTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            date: Date.now(),
            income: 0,
            outflow: 0,
            description: "",

            submitted: false
        };
    }
    render() {
        return (<div>Index Transaction</div>)
    }
}
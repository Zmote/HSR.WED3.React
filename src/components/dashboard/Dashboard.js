import React from "react";
import Payment from "./Payment";
import Transactions from "./Transactions";
import TransactionService from "../../services/TransactionService";

class Dashboard extends React.Component {
    state = {
        transactions: [],
    };

    constructor(props: any) {
        super(props);
        this.transactionService = TransactionService.instance();
    }

    componentDidMount() {
        this.updateTransactions();
    }

    updateTransactions = () => {
        this.transactionService.loadTransactions(this.props.token).then(response => {
            this.setState({transactions: response.result});
        });
    };

    render() {
        const {transactions} = this.state;
        return (
            <div className="ui three column padded stackable grid">
                <div className="row">
                    <div className="four wide column">
                        <Payment token={this.props.token} loadTransactionCallback={this.updateTransactions.bind(this)}/>
                    </div>
                    <div className="twelve wide column">
                        <Transactions transactions={transactions} title={"Letzte Transaktionen"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
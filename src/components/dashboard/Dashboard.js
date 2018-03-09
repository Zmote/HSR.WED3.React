import React from "react";
import Payment from "./Payment"
import LastTransactions from "./LastTransactions"
import {getTransactions} from "../../api";

class Dashboard extends React.Component {
    state = {
        transactions: [],
    };

    componentDidMount() {
        this.loadTransactions(this.props.token);
    }

    loadTransactions = () => {
        getTransactions(this.props.token, "", "", 15).then(response => {
            this.setState({transactions: response.result});
        });
    };

    render() {
        const {transactions} = this.state;
        return (
            <div className="ui three column padded stackable grid">
                <div className="row">
                    <div className="four wide column">
                        <Payment token={this.props.token} loadTransactionCallback={this.loadTransactions.bind(this)}/>
                    </div>
                    <div className="twelve wide column">
                        <LastTransactions transactions={transactions}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
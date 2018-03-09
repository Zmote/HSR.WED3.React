import React from "react"
import {Link} from "react-router-dom"
import Moment from "moment/moment";
import {} from "moment/locale/de"

class LastTransactions extends React.Component {

    componentDidMount(){
        Moment.locale("de");
    }

    render() {
        const transactions = this.props.transactions;
        return (
            <div>
                <h1 className="ui top attached block header">Letze Transaktionen</h1>
                <div className="ui bottom attached segment form vertically padded">
                    <table className="ui striped table">
                        <thead>
                        <tr>
                            <th>Quelle</th>
                            <th>Ziel</th>
                            <th>Betrag [CHF]</th>
                            <th>Balance [CHF]</th>
                            <th>Datum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            transactions.map((transaction, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{transaction.from}</td>
                                        <td>{transaction.target}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.total}</td>
                                        <td>{Moment(transaction.date).format("d MMMM, YYYY [um] hh:mm")}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                    <div className="field">
                        <Link
                            className="ui button primary"
                            to={"/transactions"}
                        >
                            Alle Transaktionen
                        </Link>
                    </div>
                </div>
            </div>);
    }
}

export default LastTransactions;
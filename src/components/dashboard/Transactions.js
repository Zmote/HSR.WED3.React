import React from "react";
import {Link} from "react-router-dom";
import Moment from "moment/moment";
import {} from "moment/locale/de";

class Transactions extends React.Component {

    componentDidMount() {
        Moment.locale("de");
    }

    render() {
        const transactions = this.props.transactions;
        return (
            <div>
                {this.props.title &&
                <h1 className="ui top attached block header">
                    {this.props.title}
                </h1>
                }
                <div className={"ui form vertically padded" + (this.props.title? " bottom attached segment": "")}>
                    <table className="ui striped table">
                        <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Quelle</th>
                            <th>Ziel</th>
                            <th>Betrag [CHF]</th>
                            <th>Balance [CHF]</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            transactions.map((transaction, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{Moment(transaction.date).format("DD MMMM, YYYY [um] hh:mm")}</td>
                                        <td>{transaction.from}</td>
                                        <td>{transaction.target}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.total}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                    {!this.props.removeButton &&
                    <div className="field">
                        <Link
                            className="ui button primary"
                            to={"/transactions"}
                        >
                            Alle Transaktionen
                        </Link>
                    </div>
                    }
                </div>
            </div>);
    }
}

export default Transactions;
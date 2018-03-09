import React from "react";
import {getAccountDetails} from "../api"

class Dashboard extends React.Component {
    state = {
        accountNr: "",
        amount: "",
        owner: undefined,
        targetAmount: "",
        targetAccountError: undefined,
        targetAmountError: undefined,
        transferAmount: ""
    };

    componentDidMount() {
        getAccountDetails(this.props.token).then(response => {
            this.setState(response);
        });
        // If targetAccountNr and targetAmount initialized empty, show notifications on component load
        this.checkTargetAccount(undefined);
        this.checkTransferAmount(undefined);
    }

    handleTargetAccountChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            const targetAmount = event.target.value;
            if (targetAmount) {
                this.setState({targetAmount});
            } else {
                this.setState({targetAmount: ""});
            }
            this.checkTargetAccount(targetAmount);
        }
    };

    handleTransferAmountChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            const transferAmount = event.target.value;
            if (transferAmount) {
                this.setState({transferAmount});
            } else {
                this.setState({transferAmount: ""});
            }
            this.checkTransferAmount(transferAmount);
        }
    };

    checkTargetAccount = (accountNr: Number) => {
        if (!accountNr) {
            this.setState({targetAccountError: {message: "Geben Sie eine gültige Kontonummer an"}})
        } else {
            this.setState({targetAccountError: undefined});
        }
    };

    checkTransferAmount = (transferAmount: Number) => {
        if (!transferAmount) {
            this.setState({targetAmountError: {message: "Geben Sie einen gültigen Betrag an"}})
        } else {
            this.setState({targetAmountError: undefined});
        }
    };

    render() {
        const {targetAccountError, targetAmountError} = this.state;
        return (
            <div className="ui three column padded grid">
                <div className="row">
                    <div className="four wide column">
                        <h1 className="ui top attached block header">Neue Zahlungen</h1>
                        <form className="ui bottom attached segment form vertically padded grid">
                            <div className="row">
                                <div className="column">
                                    <div className="field">
                                        <label>Von:</label>
                                        <input
                                            disabled
                                            placeholder="Von"
                                            value={this.state.accountNr + " [" + this.state.amount + " CHF]"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <div className="field">
                                        <label>Zu:</label>
                                        <input
                                            type="number"
                                            onChange={this.handleTargetAccountChanged}
                                            placeholder="Zielkontennummer"
                                        />
                                    </div>
                                    {targetAccountError &&
                                    <div className="ui pointing basic label">
                                        {targetAccountError.message}
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <div className="field">
                                        <label>Betrag [CHF]:</label>
                                        <input
                                            type="number"
                                            onChange={this.handleTransferAmountChanged}
                                            placeholder="Betrag in CHF"
                                        />
                                    </div>
                                    {targetAmountError &&
                                    <div className="ui pointing basic label">
                                        {targetAmountError.message}
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <div className="field">
                                        <button
                                            onClick={event => {
                                                event.preventDefault();
                                            }}
                                            className="ui button primary">Zahlen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="twelve wide column">
                        <h1 className="ui top attached block header">Letze Transaktionen</h1>
                        <div className="ui bottom attached segment form vertically padded">
                            <table className="ui striped table">
                                <thead>
                                <tr>
                                    <th>Quelle</th>
                                    <th>Ziel</th>
                                    <th>Betrag [CHF]</th>
                                    <th>Balance [CHF]</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                            <div className="field">
                                <button
                                    className="ui button primary">
                                    Alle Transaktionen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
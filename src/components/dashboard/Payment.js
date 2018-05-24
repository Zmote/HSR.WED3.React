import React from "react";
import {getAccount, getAccountDetails, transfer} from "../../api";

//TODO: Hilfsfunktionen in Service auslagern
class Payment extends React.Component {
    state = {
        accountNr: "",
        amount: "",
        owner: undefined,
        targetAccountNr: "",
        targetAccountMessage: undefined,
        targetAmountMessage: undefined,
        transferAmount: "",
        targetAccountExists: false,
        paymentExecuted: false,
        canPay: true,
        needsTargetAccountReminder: false,
        needsTransferAmountReminder: false
    };

    componentDidMount() {
        getAccountDetails(this.props.token).then(response => {
            this.setState(response);
        });
        // If targetAccountNr and targetAmount initialized empty, show notifications on component load
        //this.checkTargetAccount(undefined);
        //this.checkTransferAmount(undefined);
    }

    handleTargetAccountChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            const targetAccountNr = event.target.value;
            if (targetAccountNr) {
                this.setState({targetAccountNr});
            } else {
                this.setState({targetAccountNr: ""});
            }
            this.checkTargetAccount(targetAccountNr);
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

    performTransfer = () => {
        this.checkTargetAccount(Number(this.state.targetAccountNr));
        this.checkTransferAmount(Number(this.state.transferAmount));

        if (this.state.targetAccountNr && this.state.targetAccountExists
            && this.state.transferAmount && Number(this.state.transferAmount) >= 1) {
            console.log(Number(this.state.transferAmount));
            transfer(Number(this.state.targetAccountNr), Number(this.state.transferAmount), this.props.token).then(response => {
                this.setState({amount: response.total});
                this.props.loadTransactionCallback();
                this.setState({paymentExecuted: true})
            })
        } else {
            if (!this.state.targetAccountNr || !this.state.targetAccountExists) {
                this.setState({needsTargetAccountReminder: true});
            }
            if (!this.state.transferAmount || Number(this.state.transferAmount) < 1) {
                this.setState({needsTransferAmountReminder: true});
            }
        }
    };

    queryTargetAccount = (accountNr) => {
        getAccount(Number(accountNr), this.props.token)
            .then(response => {
                this.setState({
                    targetAccountMessage: {message: response.owner.firstname + " " + response.owner.lastname},
                    targetAccountExists: true
                });
            })
            .catch(error => {
                this.setState({targetAccountMessage: {message: "Konto nicht gefunden"}, targetAccountExists: false});
            });
    };

    checkTargetAccount = (accountNr: Number) => {
        if (!accountNr) {
            this.setState({targetAccountMessage: {message: "Geben Sie eine gültige Kontonummer an"}})
        } else {
            this.queryTargetAccount(accountNr);
        }
        if (this.state.owner && accountNr === this.state.owner.accountNr) {
            this.setState({canPay: false});
        } else {
            this.setState({canPay: true});
        }
        this.setState({needsTargetAccountReminder: false});
    };

    checkTransferAmount = (transferAmount: Number) => {
        if (!transferAmount || Number(transferAmount) < 1) {
            this.setState({targetAmountMessage: {message: "Geben Sie einen gültigen Betrag an"}})
        } else {
            this.setState({targetAmountMessage: undefined});
        }
        this.setState({needsTransferAmountReminder: false});
    };

    clearPaymentExecuted = () => {
        this.setState({paymentExecuted: false, targetAccountNr: "", transferAmount: ""});
        this.setState({targetAccountMessage: undefined, targetAmountMessage: undefined});
        //this.checkTargetAccount(undefined);
        //this.checkTransferAmount(undefined);
    };

    render() {
        const {paymentExecuted} = this.state;
        if (!paymentExecuted) {
            const {targetAccountMessage, targetAmountMessage, canPay, needsTargetAccountReminder, needsTransferAmountReminder} = this.state;
            return (
                <div>
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
                                {targetAccountMessage &&
                                <div className={"ui pointing basic label " + (needsTargetAccountReminder ? "red" : "")}>
                                    {targetAccountMessage.message}
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
                                        placeholder="Betrag in CHF und >= 1"
                                    />
                                </div>
                                {targetAmountMessage &&
                                <div
                                    className={"ui pointing basic label " + (needsTransferAmountReminder ? "red" : "")}>
                                    {targetAmountMessage.message}
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
                                            this.performTransfer();
                                        }}
                                        disabled={!canPay}
                                        className="ui button primary twelve wide column">Zahlen
                                    </button>
                                </div>
                                {!canPay &&
                                <div className="ui red basic label">
                                    Überweisung auf eigenes Konto nicht möglich!
                                </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            )
        } else {
            const {transferAmount, targetAccountNr, amount} = this.state;
            return (
                <div>
                    <h1 className="ui top attached block header">Transaktion erfolgreich!</h1>
                    <div className="ui bottom attached segment form vertically padded grid">
                        <p className="sixteen wide column">
                            Ihre Zahlung von {transferAmount} CHF wurde erfolgreich an das Konto mit der
                            Nummer {targetAccountNr} übertragen.<br/><br/>
                            Neue Balance: {amount}
                        </p>
                        <button className="ui button primary" onClick={this.clearPaymentExecuted}>Neue Zahlung
                            beginnen
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default Payment;
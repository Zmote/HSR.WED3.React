import React from "react";
import Transactions from "./Transactions";
import TransactionService from "../../services/TransactionService";
import Moment from "moment"
import {} from "moment/locale/de";

class TransactionsOverview extends React.Component {
    state = {
        transactions: [],
        selectedYear: Moment().format("Y"),
        selectedMonth: Moment().format("M") - 1
    };

    constructor(props: any) {
        super(props);
        this.transactionService = TransactionService.instance();
        Moment.locale("de");
    }

    componentDidMount() {
        this.transactionService.loadTransactions(this.props.token, 10000).then(response => {
            this.setState({transactions: response.result});
        });
    }

    filterTransactions(year: Number, month: Number) {
        const fromDate = new Date(Number(year), Number(month));
        const toDate = new Date(Number(year), Number(month) + 1);
        console.log(fromDate,toDate);
        this.transactionService.loadTransactions(this.props.token, 10000, fromDate, toDate).then(response => {
            this.setState({transactions: response.result});
        });
    };

    yearSelectionChanged = (event: Event) => {
        if (event.target instanceof HTMLSelectElement) {
            this.setState({selectedYear: event.target.value}, () => {
                this.filterTransactions(this.state.selectedYear, this.state.selectedMonth);
            });
        }
    };

    monthSelectionChanged = (event: Event) => {
        if (event.target instanceof HTMLSelectElement) {
            this.setState({selectedMonth: event.target.value}, () => {
                this.filterTransactions(this.state.selectedYear, this.state.selectedMonth);
            });
        }
    };

    render() {
        const {transactions, selectedYear, selectedMonth} = this.state;
        return (
            <div className="ui three column padded stackable grid">
                <div className="row">
                    <div className="sixteen wide column">
                        <h1 className="ui top attached block header">Alle Transaktionen</h1>
                        <div className="ui bottom attached segment">
                            <div className="sixteen wide column">
                                <form className="ui form">
                                    <div className="ui vertically padded grid">
                                        <div className="six wide column">
                                            <div className="field">
                                                <label>Jahr auswählen:</label>
                                                <select name="years" value={selectedYear}
                                                        onChange={this.yearSelectionChanged}>
                                                    {[0].map(()=>{
                                                        let years = [];
                                                        for(let i = Moment().format("Y");i >= 2000;i-- ){
                                                            years.push(<option value={i} key={i}>{i}</option>);
                                                        }
                                                        return years;
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="ten wide column">
                                            <div className="field">
                                                <label>Monat auswählen:</label>
                                                <select name="months" value={selectedMonth}
                                                        onChange={this.monthSelectionChanged}>
                                                    <option value="0">Januar</option>
                                                    <option value="1">Februar</option>
                                                    <option value="2">März</option>
                                                    <option value="3">April</option>
                                                    <option value="4">Mai</option>
                                                    <option value="5">Juni</option>
                                                    <option value="6">Juli</option>
                                                    <option value="7">August</option>
                                                    <option value="8">September</option>
                                                    <option value="9">Oktober</option>
                                                    <option value="10">November</option>
                                                    <option value="11">Dezember</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="row">
                                <div className="sixteen wide column">
                                    <Transactions transactions={transactions} removeButton/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransactionsOverview;
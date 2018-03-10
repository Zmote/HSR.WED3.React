import {getTransactions} from "../api";

const singleton = Symbol();
const singletonEnforcer = Symbol();

class TransactionService {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }
    }

    static instance() {
        if (!this[singleton]) {
            this[singleton] = new TransactionService(singletonEnforcer);
        }
        return this[singleton];
    }

    loadTransactions = (token, count = 3, from = "", to= "") => {
        return getTransactions(token, from, to, count).then(response => {
            return response;
        });
    };
}

export default TransactionService;
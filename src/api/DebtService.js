import axios from "axios";
import { API_URL } from "./constant";

class DebtService {
    /**
     *  used to decline a bill for a debtor
     * @param {*} bid the bid of the bill
     * @param {*} status the status of the debt of the bill
     * @returns axios response
     */
    declineDebt(bid, status) {
        return axios({
            url: `${API_URL}/debts/decline/${bid}`,
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "status": status,
            },
        });
    }

    /**
     * used to update the debt status of a bill for a debtor,
     * which means 'unaccept' will become 'unpaid', 'unpaid' will 'checking'
     * @param {*} bid the bid of the bill
     * @param {*} status  the status of the debt of the bill
     * @returns axios response
     */

    updateDebt(bid, status) {
        return axios({
            url: `${API_URL}/debts/${bid}`,
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "status": status,
            },
        });
    }
}

export default new DebtService();

import axios from 'axios'
import { API_URL } from './constant'

class CreateBillService {

    createBill = (DataForm) => {
        axios({
            url: API_URL,
            method: "post",
            headers: {
                'content-type': 'multipart/form-data'
            },
            data: DataForm,
            
        })

        axios.post(url,,config ={headers:, par})
    }



}
export default new CreateBillService();
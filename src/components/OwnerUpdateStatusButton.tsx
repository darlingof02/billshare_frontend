import { IonButton, IonIcon, useIonAlert } from "@ionic/react"
import axios from "axios"
import { API_URL } from "../api/constant"
import { checkmarkCircleOutline} from 'ionicons/icons';

// interface DebtInfo {
//     debtStatus: number,
//     role: string,
// } 

/* status in debt:
 * status in bill: 
 * -1. declined                 dark
 *  0. unaccepted               medium
 *  1. unpaid                   danger
 *  2. confirm                  success         able
 *  3. settled                  success
*/
const getButtonAttr = (debtStatus: number, role:string|null) => {
    switch(debtStatus){
        case -1:
            return {color:"dark", disabled:true, text: "declined"}
        case 0:
            return {color:"medium", disabled:true, text: "unaccepted"}
        case 1:
            return {color:"danger", disabled:true, text: "unpaid"}
        case 2:
            if(role === "owner")
                return {color:"primary", disabled:false, text: "confirm"}
            return {color:"success", disabled: true, text: "paid"}
        case 3:
            return {color:"success", disabled:true, text: "settled"}
    }
    return {color:"primary", disabled:true, text: "undefined"}
}

export const UpdateDebtStatusButton = (props:{debtStatus:number, bid: number, did:number, dname:string, refresh:Function, role:string|null}) => {
    const buttonAttr = getButtonAttr(props.debtStatus,props.role)
    const [present] = useIonAlert();
    const confirmPayment = () => {
        present({
            cssClass: 'my-css',
            header: 'Confirm Payment',
            message: `Did you recieve the payment from ${props.dname}?`,
            buttons: [
              'Cancel',
              { text: 'Confirm', handler: (d) => axios({
                    url: API_URL+`/bills/${props.bid}/${props.did}`,
                    method:"PUT",
                }).then((response)=>props.refresh(response.data)).catch(()=>{console.log("更新失败")})
            }],
            onDidDismiss: (e) => console.log('did dismiss'),
        })
    }
    return (<IonButton fill={buttonAttr.disabled?"outline":"solid"} slot="end" color={buttonAttr.color} disabled ={buttonAttr.disabled}
            onClick={confirmPayment}>{buttonAttr.text}{props.debtStatus===3 && <IonIcon icon={checkmarkCircleOutline}/>}</IonButton>)
}
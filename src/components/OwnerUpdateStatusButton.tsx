import { IonButton } from "@ionic/react"
import axios from "axios"
import { API_URL } from "../api/constant"

/**
 * status in bill: 
 * -1. declined                 dark
 *  0. unaccepted               medium
 *  1. unpaid                   danger
 *  2. confirm                  success         able
 *  3. settled                  success
 * 
 * status in debt:
 * -1. declined                 medium
 *  0. accept/decline           success/danger  able
 *  1. pay                      primary         able
 *  2. unconfirmed              success
 *  3. settled                  success
 * 
 * status in other debt:
 * -1. declined     light
 *  0. unaccepted   medium
 *  1. unpaid       danger
 *  2. paid         primary
 *  3. settled      success
 */

interface DebtInfo {
    debtStatus: number,
    role: string,
} 

/* status in debt:
 * status in bill: 
 * -1. declined                 dark
 *  0. unaccepted               medium
 *  1. unpaid                   danger
 *  2. confirm                  success         able
 *  3. settled                  success
*/
const getButtonAttr = (debtStatus: number) => {
    switch(debtStatus){
        case -1:
            return {color:"dark", disabled:true, text: "declined"}
        case 0:
            return {color:"medium", disabled:true, text: "unaccepted"}
        case 1:
            return {color:"danger", disabled:true, text: "unpaid"}
        case 2:
            return {color:"primary", disabled:false, text: "confirm"}
        case 3:
            return {color:"success", disabled:true, text: "settled"}
    }
    return {color:"primary", disabled:true, text: "undefined"}
}


// implement debtors' first

export const UpdateDebtStatusButton = (props:{debtStatus:number, bid: number, did:number, refresh:Function}) => {
    const buttonAttr = getButtonAttr(props.debtStatus)
    const confirmPayment = () => {
        axios({
            url: API_URL+`/bills/${props.bid}/${props.did}`,
            method:"PUT",
        }).then(props.refresh())
        .catch(()=>{console.log("更新失败")})
    }


    return (<IonButton slot="end" color={buttonAttr.color} disabled ={buttonAttr.disabled}
            onClick={confirmPayment}>{buttonAttr.text}</IonButton>)
}
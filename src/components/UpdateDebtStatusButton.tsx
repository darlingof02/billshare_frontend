import { IonButton } from "@ionic/react"

/**
 * status in bill: 
 * -2. unpaid                   danger
 * -1. declined                 dark
 *  0. unaccepted               medium
 *  1. unpaid                   danger
 *  2. confirm/not Receive      success/warn    able
 *  2. not recive               warn            able
 *  3. settled                  success
 * 
 * status in debt:
 * -2. repay                    warn
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
 * 
 * @param props 
 * @returns 
 */

interface DebtInfo {
    debtStatus: number,
    role: string,
} 

const ownerStatusColorMap = {
    "-2": "danger",
    "-1": "dark", 
    "0": "danger",
    "1": "dark", 
    "2": "danger",
    "3": "dark", 
}


const buttonColor = (debtInfo: DebtInfo) => {
    if(debtInfo.role === "owner"){
        switch(debtInfo.debtStatus){
            case -2:
                return "danger"
            case -1:
                return "dark"
        }
    }

}


export const UpdateDebtStatusButton = (props:DebtInfo) => {


    return (<IonButton >

    </IonButton>)
}
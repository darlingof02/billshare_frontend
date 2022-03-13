import { IonCol, IonRow } from "@ionic/react";
import DebtorDeclineButton from './DebtorDeclineButton'
import DebtorAcceptButton from './DebtorAcceptButton'
import DebtorPayButton from "./DebtorPayButton";

// interface DebtStatus {
//     status: number,
//     bid: number,
// }

const DebtorUpdateStatusButton = (props:{status: number, bid: number}) => {
    // let [present] = useIonAlert();
    console.log("status: " + props.status)
    console.log("bid: " + props.bid)
    
    if ( props.status == 0) {
        return (
            
            <IonRow>
                <IonCol size="6">
                <DebtorDeclineButton status={props.status} bid={props.bid}/>
                </IonCol>
                <IonCol size="6">
                <DebtorAcceptButton status={props.status} bid ={props.bid}/>
                </IonCol>
            </IonRow>
        )
    }
    else if (props.status == 1) {
        return (

                <DebtorPayButton status={props.status} bid={props.bid}/>

        )
    }
    
    console.log("Here should be the button" + props.status)
    return null
}

export default DebtorUpdateStatusButton;
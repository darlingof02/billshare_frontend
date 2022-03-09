import { IonButton, useIonAlert } from "@ionic/react";
import { useHistory } from "react-router";
import DebtService from "../api/DebtService";

const DebtorPayButton = (props:{status: number, bid: number}) => {
    let [present] = useIonAlert();
    const history = useHistory();

    return (

        <IonButton
          expand="block"
          color="success"
          onClick={() =>
            present({
              header: 'Pay',
              message: 'Have you confirmed your Payment',
              buttons: [
                'Cancel',
                { text: 'confirm', handler: () => {
                    DebtService.updateDebt(props.bid, props.status);
                    history.push("/home")
                  }
                 },
              ],
              onDidDismiss: (e) => console.log('did dismiss'),
            })
          }
        >
          Pay the debt
        </IonButton>
    )
}

export default DebtorPayButton;
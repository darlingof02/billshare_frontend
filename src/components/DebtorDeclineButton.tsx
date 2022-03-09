import { IonButton, useIonAlert } from "@ionic/react";
import { useHistory } from "react-router";
import DebtService from "../api/DebtService";

const DebtorDeclineButton = (props:{status: number, bid: number}) => {
    let [present] = useIonAlert();
    const history = useHistory();

    return (
        

        <IonButton
          expand="block"
          color="danger"
          onClick={() =>
            present({
              header: 'Decline',
              message: 'Do you confirm you will decline this debt',
              buttons: [
                'Cancel',
                { text: 'Confirm', handler: () => {
                    DebtService.declineDebt(props.bid, props.status);
                    history.push("/home")
                }
                },
              ],
              onDidDismiss: (e) => console.log('did dismiss'),
            })
          }
        >
          Decline
        </IonButton>
    )
}

export default DebtorDeclineButton;
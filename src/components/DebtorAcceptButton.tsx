import { IonButton, useIonAlert } from "@ionic/react";
import { useHistory } from "react-router";
import DebtService from "../api/DebtService";

const DebtorDeclineButton = (props:{status: number, bid: number}) => {
    let [present] = useIonAlert();
    const history = useHistory();

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <IonButton
          expand="block"
          color="primary"
          onClick={() =>
            present({
              header: 'Accept',
              message: 'Do you confirm you will accept this debt',
              buttons: [
                'Cancel',
                { text: 'confirm', handler: () =>  {
                    DebtService.updateDebt(props.bid, props.status);
                    history.push("/home")
                    }
                },
              ],
              onDidDismiss: (e) => console.log('did dismiss'),
            })
          }
        >
          Accept
        </IonButton>
    )
}

export default DebtorDeclineButton;
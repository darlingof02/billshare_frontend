import React, { useState, useRef } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonPopover,
  IonText,
  useIonAlert
} from '@ionic/react';
import { calendar } from 'ionicons/icons';

const TestPage: React.FC = () => {
  const [present] = useIonAlert();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonButton
          expand="block"
          onClick={() =>
            present({
              cssClass: 'my-css',
              header: 'Alert',
              message: 'alert from hook',
              inputs: [
                {
                  name: 'date',
                  type: 'date',
                  handler: (e) => console.log("input", e)
                }
              ],
              buttons: [
                'Cancel',
                { text: 'Ok', handler: (d) => console.log('ok pressed') },
              ],
              onDidDismiss: (e) => console.log('did dismiss'),
            })
          }
        >
          Show Alert
        </IonButton>
        <IonButton
          expand="block"
          onClick={() => present('hello with params', [{ text: 'Ok' }])}
        >
          Show Alert using params
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
export default TestPage;
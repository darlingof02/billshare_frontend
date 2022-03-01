/* Using with IonAlert Component */

import React, { useState } from 'react';
import { IonAlert, IonButton, IonContent, useIonAlert } from '@ionic/react';
import axios from 'axios';
import { API_URL } from '../api/constant';

export const AddPayerModelTest: React.FC = () => {


  const [showAlert4, setShowAlert4] = useState(false);

  const [present] = useIonAlert();
    return (
      <IonContent>
        <IonButton onClick={() => setShowAlert4(true)} expand="block">Show Alert 4</IonButton>

 
        <IonAlert
          isOpen={showAlert4}
          onDidDismiss={() => setShowAlert4(false)}
          cssClass='my-custom-class'
          header={'Prompt!'}
          inputs={[
            {
              name: 'email',
              type: 'email',
              placeholder: "input payer's email"
            }
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: 'Add',
              handler: () => {
                axios({
                    url: API_URL + "/test/string/auth",
                    method: "get",
                    params:{
                        email: ''
                    }
                })
                
                console.log('Confirm Add');
              }
            }
          ]}
        />


    <IonButton
          expand="block"
          onClick={() =>
            present({
              cssClass: 'my-css',
              header: 'Alert',
              message: 'alert from hook',
              inputs: [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: "input payer's email",
                    
                }
              ],
              buttons: [
                'Cancel',
                { text: 'Add', handler: (d) => { 
                    console.log(d);
                    axios.get(API_URL+"/test/string/a",{params:d})
                    console.log('ok pressed')
                }},
              ],
              onDidDismiss: (e) => {console.log(e);console.log('did dismiss')},
            })
          }
        >
          Show Alert
        </IonButton>
      </IonContent>
    );
}

export default AddPayerModelTest;

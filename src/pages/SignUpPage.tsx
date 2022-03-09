import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import Authentication from '../api/Authentication';
import { useHistory } from "react-router-dom";


const SignUpPage: React.FC = () => {
    
    let history = useHistory()
    const [userInfo, setUserInfo] = useState({
        'email': '',
        'password':'',
        'firstname':'',
        'lastname':'',
        'nickname':'',
        'tel': 0,
    })
    const [isIncorrect, setIncorrect] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    // const [present, dismiss] = useIonToast();

    const info = userInfo;

    const signup = (userInfo:Object) => {
        Authentication.register(userInfo)
        .then((response) => {
            if(response.status === 200)
                history.push('/login')
            else{
                setErrorMessage(response.data)
                setIncorrect(true)
                // present(response.data, 2000)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    return (
    <IonPage >
        <IonHeader>
            <IonToolbar>
                <IonTitle>SignUp</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className='ion-content'>

                {/* {isIncorrect && <IonItem lines="none" color='danger'><IonLabel class='ion-text-center'>{errorMessage}</IonLabel></IonItem>} */}
                <IonList>
                    <IonItem>
                        <IonLabel position='stacked'>nick name: </IonLabel>
                        <IonInput name = 'nickname' type='text' value={userInfo.nickname} onIonChange={(event) => {
                            info.nickname = String(event.detail.value);
                            setUserInfo(info); }}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>first name: </IonLabel>
                        <IonInput name = 'firstname' type='text' value={userInfo.firstname} onIonChange={(event) => {
                            info.firstname = String(event.detail.value);
                            setUserInfo(info); }}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>last name: </IonLabel>
                        <IonInput name = 'lastname' type='text' value={userInfo.lastname} onIonChange={(event) => {
                            info.lastname = String(event.detail.value);
                            setUserInfo(info); }}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Email</IonLabel>
                        <IonInput name = 'email' type='text' value={userInfo.email} onIonChange={(event) => {
                                info.email = String(event.detail.value);
                                setUserInfo(info); 
                            }}></IonInput>
                    </IonItem>
                    
                    <IonItem>
                        <IonLabel position='stacked'>Password: </IonLabel>
                        <IonInput name = 'password' type='password' value={userInfo.password} onIonChange={(event) => {
                            info.password = String(event.detail.value);
                            setUserInfo(info); }}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Telephone</IonLabel>
                        <IonInput name = 'telephone' type='text' placeholder='xxx-xxx-xxxx' onIonChange={(event) => {
                            info.tel = Number(event.detail.value);
                            setUserInfo(info); }}></IonInput>
                    </IonItem>

                </IonList>
                <IonButton expand='block' type='submit' onClick={() => {console.log(userInfo);signup(userInfo)}}>Sign Up</IonButton>
                <IonButton expand='block' color='danger' onClick={() => {history.goBack()}}>Cancel</IonButton>

                <IonToast
                    isOpen={isIncorrect}
                    onDidDismiss={() => setIncorrect(false)}
                    message= {errorMessage}
                    duration={2000}
                    position='top'
                    color='danger'
                />
        </IonContent>

    </IonPage>
    
  );
};


export default SignUpPage;
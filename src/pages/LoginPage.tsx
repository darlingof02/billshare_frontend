import { IonContent, IonHeader, IonInput, IonItem, IonLabel,  IonTitle, IonToolbar,  IonList, IonButton, IonPage} from '@ionic/react';
import React, { useState } from 'react'
import './LoginPage.css'
import Authentication from '../api/Authentication';
import { useLocalStorage } from '../api/MyHooks';
import { useHistory } from "react-router-dom";



const LoginPage: React.FC = (props:any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isIncorrect, setIncorrect] = useState(false)
    // const naviagte = useNavigate();
    // eslint-disable-next-line
    let [localEmail, setLocalEmail] = useLocalStorage('localEmail', '')
    let history = useHistory();

    let login = (email:string, password:string) => {
        // console.log(email + " : " + password)
        Authentication
        .executeJWTAuthService(email, password)
        .then((response) => {
            console.log(email)
            setLocalEmail(email)
            Authentication.setupAxiosIntercetors('Bearer ' + response.data.token)
            history.push('/home')
        })
        .catch(
            (error) => {
            setIncorrect(true);
            setTimeout(()=>{setIncorrect(false)},2000)
        }
        )
    }

    return (
        <IonPage >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-content'>
                    {isIncorrect && <IonItem lines="none" color='danger'><IonLabel class='ion-text-center'>Incorrect username or password</IonLabel></IonItem>}
                    {/* {!isIncorrect && <IonItem lines="none" color='white'><IonLabel class='ion-text-center'></IonLabel></IonItem>} */}

                    <IonList>
                        <IonItem>
                            <IonLabel position='floating'>Email</IonLabel>
                            <IonInput type='text' value={email} onIonChange={(event) => setEmail(String(event.detail.value))}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position='floating'>Password: </IonLabel>
                            <IonInput type='password' value={password} onIonChange={(event) => setPassword(String(event.detail.value))}></IonInput>
                        </IonItem>
                    </IonList>
                    <IonButton expand='block' onClick={() => login(email,password)}>Login</IonButton>
                    <IonButton expand='block' color="secondary" onClick={() => history.push('/signup')} > SignUp</IonButton>
            </IonContent>
        </IonPage>
    ); 
};

export default LoginPage;

// function useNavigate() {
//     throw new Error('Function not implemented.');
// }


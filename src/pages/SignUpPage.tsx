import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
// import { useFormik, Field, Form } from 'formik';
// import SignUpService from '../api/SignUpService';
// import TestFileUpComponent from './TestFileUp'
import { API_URL } from '../api/constant';

const SignUpPage: React.FC = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
//   const formik = useFormik({
//     initialValues: {
//         usernamne: '',
//         password: '',
//         email: '',
//         nickname: '',
//         avatar: null,

//     },
//     onSubmit: values => {
//         // alert(JSON.stringify(values, null, 2));
//         SignUpService.register(values).then(response=>alert(response)).catch(error=>console.log(error))
//     },
//   });

    // const[email, setEmail] = useState('')
    // const[password, setPassword] = useState('')
    // const[firstName, setFirstName] = useState('')
    // const[lastName, setLastName] = useState('')
    // const[nickName, setNickName] = useState('')

    const[userInfo, setUserInfo] = useState({
        'email': '',
        'password':'',
        'firstName':'',
        'lastName':'',
        'nickName':'',
        'tel': 0,



    })

    let signup = () => {

    }
    // let handleChange = (event: ) => {
    //     setUserInfo({[event.detail.name]: event.detail.value})
    // }
    // const[avatar, setAvatar] = useState('')

    return (
    <IonPage >
        <IonHeader>
            <IonToolbar>
                <IonTitle>SignUp</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className='ion-content'>
                <IonList>
                    
                    <IonItem>
                        <IonLabel position='stacked'>nick name: </IonLabel>
                        <IonInput name = 'nickName' type='password' value={userInfo.nickName} onIonChange={(event) => {
                            
                            setUserInfo({['nickName']: String(event.detail.value)
                        }) }}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>first name: </IonLabel>
                        <IonInput name = 'nickName' type='password' value={userInfo.firstName} onIonChange={(event) => setFirstName(String(event.detail.value))}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>last name: </IonLabel>
                        <IonInput name = 'nickName' type='password' value={userInfo.lastName} onIonChange={(event) => setLastName(String(event.detail.value))}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Email</IonLabel>
                        <IonInput name = 'nickName' type='text' value={userInfo.email} onIonChange={(event) => setEmail(String(event.detail.value))}></IonInput>
                    </IonItem>
                    
                    <IonItem>
                        <IonLabel position='stacked'>Password: </IonLabel>
                        <IonInput name = 'nickName' type='password' value={userInfo.password} onIonChange={(event) => setPassword(String(event.detail.value))}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Telephone</IonLabel>
                        <IonInput name = 'nickName' type='text' value={userInfo.tel} onIonChange={(event) => setEmail(String(event.detail.value))}></IonInput>
                    </IonItem>
                    {/* <IonItem>
                        <IonLabel position='stacked'>avatar: </IonLabel>
                        <IonInput type='password' value={avatar} onIonChange={(event) => setAvatar(String(event.detail.value))}></IonInput>
                    </IonItem> */}
                </IonList>
                <IonButton expand='block' onClick={() => console.log("hello world")}>Sign Up</IonButton>
        </IonContent>
    </IonPage>
    // <form action={`${API_URL}/create_user`} 
    //     method = 'post'
    //     className = "form" 
    //     // onSubmit={formik.handleSubmit} 
    //     encType="multipart/form-data">
            
    //     <fieldset>
    //         <label>firstnamne:</label>
    //         <input name = "firstname" type="text"
    //         placeholder = "input username" onChange={formik.handleChange}></input>
    //     </fieldset>

    //     <fieldset>
    //         <label>lastnamne:</label>
    //         <input name = "lastname" type="text"
    //         placeholder = "input username" onChange={formik.handleChange}></input>
    //     </fieldset>


    //     <fieldset>
    //         <label>password:</label>
    //         <input name = "password" type="password"
    //             onChange={formik.handleChange}></input>
    //     </fieldset>
    //     <fieldset>
    //         <label>email:</label>
    //         <input name = "email" type="email"
    //         placeholder = "email" onChange={formik.handleChange} value={formik.values.email}></input>
    //     </fieldset>
    //     <fieldset>
    //         <label>nickname:</label>
    //         <input name = "nickname" type="text"
    //         placeholder = "nickname" onChange={formik.handleChange}></input>
    //     </fieldset>
  
    //     <fieldset>
    //         <input type="file" name="avatar" accept="image/png, image/jpeg"></input>
    //     </fieldset>
    //     <button type="submit" className='btn-success'>Submit</button>
    // </form>
    
  );
};


export default SignUpPage;
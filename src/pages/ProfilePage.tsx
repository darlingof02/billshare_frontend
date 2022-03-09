import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonNote, IonPage, IonTitle, IonToolbar, useIonModal } from "@ionic/react"
import { createOutline } from 'ionicons/icons';
import { useEffect, useState } from "react";
import { UserInfo } from "./HomePage"
import UserSevice from "../api/UserService"
import "./ProfilePage.css"
import axios from "axios";
import { API_URL } from "../api/constant";


/**
 * 
 * @param props 
 * 
 * export interface UserInfo {
    firstName: string,
    lastName: string,
    nickName: string,
    email: string,
    tel: number,
    avatar: string|null,
    uid: number,
}
 * @returns 
 */

interface UserForm {
    firstname: string,
    lastname: string,
    nickname: string,
    email: string,
    tel: number,
}

const EditProfile: React.FC<{
    userInfo: UserInfo;
    setUserInfo: (e:any) => void;
    onDismiss: () => void;
  }> = ({userInfo, setUserInfo, onDismiss }) => (
    <>
    <IonHeader translucent>
        <IonToolbar>
            <IonTitle>Edit profile</IonTitle>
            <IonButton fill="clear" slot="end" onClick={() => onDismiss()}>
                Close
            </IonButton>
        </IonToolbar>
    </IonHeader>

        <IonContent>
            <IonItem>
            <IonCol><IonNote slot="" color="dark">Nick Name: </IonNote></IonCol>
            <IonCol><IonInput className="nickName" slot="" placeholder={userInfo?.nickName} onIonChange={(e)=>{userInfo.nickName = String(e.detail.value);setUserInfo(userInfo); }}></IonInput></IonCol>
            </IonItem>
            
            <IonItem>
            <IonCol><IonNote slot="" color="dark"> Email: </IonNote></IonCol>
            <IonCol><IonInput  className="email" slot="" placeholder={userInfo?.email}
            onIonChange={(e)=>{userInfo.email = String(e.detail.value);setUserInfo(userInfo); }}></IonInput></IonCol>
            </IonItem>

            <IonItem>
            <IonCol><IonNote slot="" color="dark"> Last Name: </IonNote></IonCol>
            <IonCol><IonInput className="lastName"  slot="" placeholder={userInfo?.lastName}
            onIonChange={(e)=>{userInfo.lastName = String(e.detail.value);setUserInfo(userInfo); }}></IonInput></IonCol>
            </IonItem>

            <IonItem>
            <IonCol><IonNote slot="" color="dark"> First Name: </IonNote></IonCol>
            <IonCol><IonInput className="firstName" slot="" placeholder={userInfo?.firstName} 
            onIonChange={(e)=>{userInfo.firstName = String(e.detail.value);setUserInfo(userInfo); }}></IonInput></IonCol>
            {/* <IonIcon slot="end" icon={createOutline}/> */}
            </IonItem>

            <IonItem>
            <IonCol><IonNote slot="" color="dark"> TelePhone: </IonNote></IonCol>
            <IonCol><IonInput className="tel" slot=""  placeholder={String(userInfo?.tel)}
            onIonChange={(e)=>{userInfo.tel = Number(e.detail.value);setUserInfo(userInfo); }}></IonInput></IonCol>
            </IonItem>

            <IonButton className="submit-button" fill="solid" onClick={() => {
                const userForm:UserForm = {
                    email: userInfo.email,
                    nickname: userInfo.nickName,
                    firstname: userInfo.firstName,
                    lastname: userInfo.lastName,
                    tel: userInfo.tel,
                };
                axios({
                    url: API_URL + "/edit-profile",
                    method: "PUT",
                    data: userForm
                })
                onDismiss()
            }}>
                Submit
            </IonButton>
        </IonContent>
    </>
  );

const ProfilePage:React.FC = (props:any) => {
    const [userInfo, setUserInfo] = useState<UserInfo>()
    
    const handleDismiss = () => {
        dismiss();
    };
    const handleSubmit = () => {
        dismiss();
    };

    const [present, dismiss] = useIonModal(EditProfile, {
        userInfo,
        onDismiss: handleDismiss,
        onIncrement: handleSubmit,
      });
    

    useEffect(()=>{
        UserSevice.getUserBasicInfo()
        .then((response) => {
            console.log(response.data);
            setUserInfo(response.data);
          }).catch((e) => {
              console.log(e)
          })
    },[])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                    <IonIcon size="large" slot="end" icon={createOutline} 
                    onClick={() => {
                        present({cssClass: 'my-class',});
                    }}/>

                </IonToolbar>
            </IonHeader>
            {/* <IonItem> */}
                <IonAvatar className="image-center">
                    <IonImg style = {{height:"80px", width:"80px"}} src="https://source.unsplash.com/gySMaocSdqs/600x300" alt="cat" />
                </IonAvatar>
            {/* </IonItem> */}
            <IonContent>
                <IonGrid>
                    {/* <IonRow> */}
                        <IonItem>
                        <IonCol><IonNote slot="" color="dark">Nick Name: </IonNote></IonCol>
                        <IonCol><IonInput  slot="">{userInfo?.nickName}</IonInput></IonCol>
                        {/* <IonIcon slot="end" button-name="nickName" icon={createOutline}/> */}
                        </IonItem>
                    {/* </IonRow> */}
                    {/* <IonRow> */}
                        <IonItem>
                        <IonCol><IonNote slot="" color="dark"> Email: </IonNote></IonCol>
                        <IonCol><IonInput  button-name="email" slot="">{userInfo?.email}</IonInput></IonCol>
                        {/* <IonIcon slot="end"  icon={createOutline} /> */}
                        </IonItem>
                    {/* </IonRow> */}

                    {/* <IonRow> */}
                        <IonItem>
                        <IonCol><IonNote slot="" color="dark"> Last Name: </IonNote></IonCol>
                        <IonCol><IonInput button-name="lastName"  slot="">{userInfo?.lastName}</IonInput></IonCol>
                        {/* <IonIcon slot="end" icon={createOutline}/> */}
                        </IonItem>
                    {/* </IonRow> */}
                    {/* <IonRow> */}
                        <IonItem>
                        <IonCol><IonNote slot="" color="dark"> First Name: </IonNote></IonCol>
                        <IonCol><IonInput button-name="firstName" slot="" >{userInfo?.firstName}</IonInput></IonCol>
                        {/* <IonIcon slot="end" icon={createOutline}/> */}
                        </IonItem>
                    {/* </IonRow> */}
                    {/* <IonRow> */}
                        <IonItem>
                        <IonCol><IonNote slot="" color="dark"> TelePhone: </IonNote></IonCol>
                        <IonCol><IonInput button-name="tel" slot="" >{userInfo?.tel}</IonInput></IonCol>
                        {/* <IonIcon slot="end" icon={createOutline} onClick = {(e)=>{}}/> */}
                        </IonItem>
                    {/* </IonRow> */}
    
                </IonGrid>
            </IonContent>



        </IonPage>
    )
}

export default ProfilePage
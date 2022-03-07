import { IonHeader, IonPage, IonToast, IonToolbar } from "@ionic/react"
import { UserInfo } from "./HomePage"

const ProfilePage = (props:{userInfo: UserInfo}) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    
                </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}

export default ProfilePage
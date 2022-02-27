import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import React from "react";

const HomePage: React.FC = () => {

    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    HomePage
                </IonToolbar>
            </IonHeader>
            <IonContent>
                Next Part
            </IonContent>

        </IonPage>
    )
}

export default HomePage
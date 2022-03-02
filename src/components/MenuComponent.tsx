import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonAvatar, IonLabel, IonRow, IonCol, IonIcon } from '@ionic/react';
import './MenuComponent.css'

const MenuComponent: React.FC = () => (
  <>
    <IonMenu side="start" menuId="first" contentId="main">
      <IonHeader>
        <IonToolbar >
          <IonTitle> Account </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow className="vertical-align-content" style={{height: "15%"}}>
            <IonCol size='6'>
                <IonAvatar className='item-avatar'>
                    <img src="https://source.unsplash.com/gySMaocSdqs/600x300" alt="cat" />
                </IonAvatar>
            </IonCol>
            <IonCol size='6' style={{padding: 40}}>
                Name
            </IonCol>

        </IonRow>
        <IonItem />
            

        <IonList>
            <IonItem>
                <IonIcon name='person' slot='start' />
                <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem>Activity</IonItem>
            <IonItem>Notification</IonItem>
            <IonItem>Setting</IonItem>
            <IonItem>Logout</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>


    
    <IonRouterOutlet id='main'></IonRouterOutlet>
  </>
);

export default MenuComponent;
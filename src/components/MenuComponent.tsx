import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonAvatar, IonLabel, IonRow, IonCol, IonIcon, IonButton, IonFooter } from '@ionic/react';
import './MenuComponent.css'
import { notifications, person, reader, settings } from 'ionicons/icons';
import Authentication from '../api/Authentication';
import { useLocalStorage } from '../api/MyHooks';

const MenuComponent: React.FC = () => (



  <>
    <IonMenu side="start" menuId="first" contentId="main">
      <IonHeader>
        <IonToolbar >
          <IonTitle className='ion-text-center'> Account </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
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
        
            

        <IonList>
          {/* <IonItem /> */}
            <IonItem routerLink={`/profile/${localStorage.getItem('email')}`}>
                <IonIcon icon={person} slot='start' />
                <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem routerLink={`/activity/${localStorage.getItem('email')}`}>
                <IonIcon icon={reader} slot='start' />
                <IonLabel>Activity</IonLabel>
            </IonItem>
            <IonItem routerLink={`/notification/${localStorage.getItem('email')}`}>
                <IonIcon icon={notifications} slot='start' />
                <IonLabel>Notification</IonLabel>
            </IonItem>
            <IonItem routerLink={`/Setting/${localStorage.getItem('email')}`}>
                <IonIcon icon={settings} slot='start' />
                <IonLabel>Setting</IonLabel>
            </IonItem>
        </IonList>
        
      </IonContent>
      <IonFooter>
          <IonButton expand='block'>Logout</IonButton>
        </IonFooter>
    </IonMenu>


    
    <IonRouterOutlet id='main'></IonRouterOutlet>
  </>
);

export default MenuComponent;
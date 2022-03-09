import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonAvatar, IonLabel, IonRow, IonCol, IonIcon, IonButton, IonFooter, IonImg } from '@ionic/react';
import './MenuComponent.css'
import { notifications, person, reader, settings } from 'ionicons/icons';
import Authentication from '../api/Authentication';
// import { useLocalStorage } from '../api/MyHooks';
import { useHistory } from 'react-router';
import { UserInfo } from "../pages/HomePage";




const MenuComponent = (props:{userInfo: UserInfo|undefined}) => {
  
  let history = useHistory();
  const logout = () => {
    Authentication.logout();
    history.replace('/login')
  }

  return (
  <>
    <IonMenu side="start" menuId="first" contentId="main">
      <IonHeader>
        <IonToolbar >
          <IonTitle className='ion-text-center'> Account </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonRow className="vertical-align-content" style={{height: "18%"}}>
            <IonCol size='4'>
                <IonAvatar className='item-avatar'>
                    <IonImg src="https://source.unsplash.com/gySMaocSdqs/600x300" alt="cat" />
                </IonAvatar>
            </IonCol>
            <IonCol size='8' style={{padding: 40}}>
                {/* {typeof(props.userInfo) === undefined ? null : props.userInfo?.nickName} */}
                {props.userInfo?.nickName}
            </IonCol>

        </IonRow>
        
            

        <IonList>
          {/* <IonItem /> */}
            <IonItem routerLink={`/profile/${localStorage.getItem('localEmail')}`}>
                <IonIcon icon={person} slot='start' />
                <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem routerLink={`/activity/${localStorage.getItem('localEmail')}`}>
                <IonIcon icon={reader} slot='start' />
                <IonLabel>Activity</IonLabel>
            </IonItem>
            <IonItem routerLink={`/notification/${localStorage.getItem('localEmail')}`}>
                <IonIcon icon={notifications} slot='start' />
                <IonLabel>Notification</IonLabel>
            </IonItem>
            <IonItem routerLink={`/Setting/${localStorage.getItem('localEmail')}`}>
                <IonIcon icon={settings} slot='start' />
                <IonLabel>Setting</IonLabel>
            </IonItem>
        </IonList>
        
      </IonContent>
      <IonFooter>
          <IonButton className='logout-button' onClick={logout}>Logout</IonButton>
        </IonFooter>
    </IonMenu>


    
    <IonRouterOutlet id='main'></IonRouterOutlet>
  </>
  )
};

export default MenuComponent;
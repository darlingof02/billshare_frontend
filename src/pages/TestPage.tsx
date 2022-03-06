import { IonAccordion, IonAlert, IonBadge, IonBreadcrumb, IonButton, IonButtons, IonChip, IonContent, IonDatetime, IonFab, IonFabButton, IonFabList, IonIcon, IonicSlides, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading, IonNote, IonPage, IonPicker, IonSegment, IonSegmentButton, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import {search,menu, ellipsisHorizontal, ellipsisVertical, add, calendar, logoFacebook, logoTwitter, logoYoutube, heart, trash, star, archive } from 'ionicons/icons';

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../api/constant";


// goal: finish the button to change status!
// put it into ../components/
type Props = {
    bid: number,
}

const ManangeBillButtonComponent = (props : Props) => {
    // const handleUpgradeStatus = () => {
    //     console.log(props.bid)
    //     axios({
    //         url: API_URL + `/debt/${props.bid}`,
    //         method: "PUT",
    //         data: {"bid" : props.bid},
    //     })
    // }
    return (<IonContent>
        <IonFab vertical="center" horizontal="center">
          <IonFabButton>Share</IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={logoFacebook} />
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={logoTwitter} />
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={logoYoutube} />
            </IonFabButton>
          </IonFabList>
        </IonFab>

        <IonBreadcrumb>Hello</IonBreadcrumb>
        {/* <IonAlert>Hello</IonAlert> */}
        <IonDatetime color="success">2012-11-12</IonDatetime>
        {/* <IonSpinner></IonSpinner> */}
        <IonBadge>11</IonBadge>
        <IonChip color="primary">13</IonChip>
        <IonItemSliding>
    <IonItemOptions side="start">
      <IonItemOption color="danger" expandable>
        Delete
      </IonItemOption>
    </IonItemOptions>

    <IonItem>
      <IonLabel>Expandable Options</IonLabel>
    </IonItem>

    <IonItemOptions side="end">
      <IonItemOption color="tertiary" expandable>
        Archive
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>


  <IonItemSliding id="item100">
    <IonItem href="#">
      <IonLabel>
        <h2>HubStruck Notifications</h2>
        <p>A new message in your network</p>
        <p>Oceanic Next has joined your network</p>
      </IonLabel>
      <IonNote slot="end">
        10:45 AM
      </IonNote>
    </IonItem>

    <IonItemOptions side="start">
      <IonItemOption>
        <IonIcon slot="icon-only" icon={heart} />
      </IonItemOption>
    </IonItemOptions>

    <IonItemOptions side="end">
      <IonItemOption color="danger">
        <IonIcon slot="icon-only" icon={trash} />
      </IonItemOption>
      <IonItemOption>
        <IonIcon slot="icon-only" icon={star} />
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>



  <IonItemSliding>
    <IonItem>
      <IonLabel>
        Sliding Item, Icons Start
      </IonLabel>
    </IonItem>
    <IonItemOptions>
      <IonItemOption color="primary">
        <IonIcon slot="start" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
        More
      </IonItemOption>
      <IonItemOption color="secondary">
        <IonIcon slot="start" icon={archive} />
        Archive
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>

  <IonItemSliding>
    <IonItem>
      <IonLabel>
        Sliding Item, Icons Top
      </IonLabel>
    </IonItem>
    <IonItemOptions>
      <IonItemOption color="primary">
        <IonIcon slot="top" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
        More
      </IonItemOption>
      <IonItemOption color="secondary">
        <IonIcon slot="top" icon={archive} />
        Archive
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>




        </IonContent>
        )
}

export default ManangeBillButtonComponent;
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import {search,menu, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import MenuComponent from "../components/MenuComponent";

import React, { useState } from "react";

const HomePage: React.FC = () => {
    
    const example1: string[] = [
        "first line",
        "second line",
        "third line",
        "forth line",
        "fifth line"
    ]
    const example2: string[] = [
        "1st line",
        "2nd line",
        "3rd line",
        "4th line",
        "5th line"
    ]
    const [items, setItems] = useState<string[]>(example1)
    const [selected, setSelected] = useState<string>('bill')
    const showBill = () => {
        // request bills
        setSelected("bill")
        setItems(example1)
        
    }

    const showDebt = () => {
        // request indebts
        setSelected("indebt")
        setItems(example2)
        
    }
    return (
        <>
        
        <IonPage >

            <MenuComponent />
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>HomePage</IonTitle>
            </IonToolbar>

            <IonSegment value={selected}>
                <IonSegmentButton value="bill" onClick={showBill}><IonLabel>bill</IonLabel></IonSegmentButton>
                <IonSegmentButton value="indebt" onClick={showDebt}><IonLabel>indebt</IonLabel></IonSegmentButton>
            </IonSegment>


            <IonContent>
                
                <IonList>
                    {items.map((item) => <IonItem key={item}><IonLabel>{item}</IonLabel></IonItem>)}
                </IonList>
            </IonContent>

 
        </IonPage>
        </>
    )
}

export default HomePage
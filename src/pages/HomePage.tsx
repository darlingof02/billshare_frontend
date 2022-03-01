import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import {search,menu, ellipsisHorizontal, ellipsisVertical, add } from 'ionicons/icons';

import React, { useState } from "react";
import { useHistory } from "react-router";

const HomePage: React.FC = () => {
    
    const history = useHistory()
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
        <IonPage>

            <IonToolbar>
                <IonButtons slot="secondary">
                    <IonButton >
                        <IonIcon slot="icon-only" icon={menu} />
                    </IonButton>
                    <IonButton >
                        <IonIcon slot="icon-only" icon={search} />
                    </IonButton>
                </IonButtons>
                <IonButtons slot="primary">
                    <IonButton>
                        <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
                    </IonButton>
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
            <IonFab vertical="center" horizontal="end" slot="fixed">
                <IonFabButton onClick={e=>history.push('./create_bill')}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

 
        </IonPage>
    )
}

export default HomePage
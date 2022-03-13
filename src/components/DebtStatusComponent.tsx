import { IonHeader, IonLabel, IonList, IonNote, IonProgressBar } from "@ionic/react"

let getChipStatus = (st: number) => {
    console.log("fuck",st)
    if (st == -1) {
        return {color: "dark", statusName: "declined"};
    }
    else if (st == 0) {
        return {color: "medium", statusName: "unaccept"};
    }
    else if (st == 1) {
        return {
            color: "warning",
            statusName: "unpaid"
        }
    }
    else if (st == 2) {
        return {
            color: "secondary",
            statusName: "checking",
        }
    }
    else if (st == 3) {
        return {
            color: "success",
            statusName: "paid"
        }
    }
    else return {
        color: "danger",
        statusName: "Unknown Status"
    };
};

const DebtStatusComponent = (props : {status: number}) => {

    const {color, statusName} = getChipStatus(props.status)

    return (
        <>
            {
                props.status === -1 ?
                <IonNote>
                    <IonProgressBar color={color}></IonProgressBar>
                    <IonList>
                        <IonHeader className='ion-text-center'>
                            <IonLabel>{statusName}</IonLabel>
                        </IonHeader>
                    </IonList>
                </IonNote>
                :
                <IonNote>
                    <IonProgressBar color={color} value={props.status / 3}></IonProgressBar>
                    <IonList>
                        <IonHeader className='ion-text-center'>
                            <IonLabel>{statusName}</IonLabel>
                        </IonHeader>
                    </IonList>
                </IonNote>
            }
        </>
    )
};

export default DebtStatusComponent;
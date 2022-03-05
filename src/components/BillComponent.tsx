import { IonCard, IonCardHeader } from "@ionic/react";
interface Props {
    billInfo: any
}

const BillComponent: React.FC<Props> = (props) => {
    return (
        
        <IonCard>
            <img src="https://source.unsplash.com/random/300x100" className="center"/>
            <IonCardHeader>
                Created by {props.billInfo.ownerNickName}
            </IonCardHeader>
            
        </IonCard>
    )
}

export default BillComponent;
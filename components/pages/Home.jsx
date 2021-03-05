import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonMenuButton,
  } from '@ionic/react';
import Notifications from './Notifications';
import { SliderHome } from '../ui/Slider';
import { notificationsOutline } from 'ionicons/icons';
import { useState } from 'react';
import Store from '../../store';
import * as selectors from '../../store/selectors';


const Home = () => {

    const [showNotifications, setShowNotifications] = useState(false);
    const notifications = Store.useState(selectors.getNotifications);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>VOID Insights</IonTitle>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton  onClick={() => setShowNotifications(true)}>
                        <span className="badge rounded-full px-2 py-1 text-center object-right-top text-sm mr-1"> 
                            <IonIcon icon={notificationsOutline}  slot="start"/> 
                            {notifications.length}
                        </span>
                    </IonButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Home</IonTitle>
                </IonToolbar>
                </IonHeader>
                <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />
                <SliderHome/>
            </IonContent>
        </IonPage>
    );
}

export default Home;
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


const Home = () => {

    const [showNotifications, setShowNotifications] = useState(false);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>VOID Insights</IonTitle>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton onClick={() => setShowNotifications(true)}>
                    <IonIcon icon={notificationsOutline} />
                    </IonButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen class="ion-padding">
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
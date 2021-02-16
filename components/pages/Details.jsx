import {Article} from '../ui/Article';
import {normalizer} from '../config/articles';
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
  useIonViewWillEnter,
} from '@ionic/react';
import Notifications from './Notifications';
import { useState, useEffect } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import {getNewsById} from '../config/articles';
import Loader from '../Loader/Loader';

const Details = ({match}) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [item, setItem] = useState({});
    const { lang, id } = match.params;
    const [isLoading, setIsLoading] = useState(true);
  

    useIonViewWillEnter(() => {
        getNewsById(id, lang)
        .then(res => {
          const data = normalizer(res.data);
          setItem(data[0]);
          setIsLoading(false);
        })
        .catch(e => {
          console.log(e);
        });
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Article</IonTitle>
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
            <IonContent className="ion-padding" fullscreen>
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Article</IonTitle>
                </IonToolbar>
                </IonHeader>
                <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />

                {isLoading  &&
                <Loader
                    callback={() => setIsLoading(false)}
                    isOpen={isLoading}
                    message={'Chargement...'}
                />
                }
                {
                    !isLoading && <Article {...item}/>
                }
            </IonContent>
        </IonPage>
    );
}

export default Details;
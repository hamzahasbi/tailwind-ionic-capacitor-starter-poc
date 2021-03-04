import Card from '../ui/Card';
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
  IonFab,
  IonFabButton,
  IonLabel,
  IonItem
} from '@ionic/react';
import Notifications from './Notifications';
import { useState, useRef } from 'react';
import { notificationsOutline, arrowUpOutline, heartDislikeSharp, reader, alertCircleSharp } from 'ionicons/icons';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import {removeFromFavoris} from '../../store/actions';

const EmptyPage = () => {
  return (
    <div class="flex justify-center my-14 align-text-middle items-center">
      <div class="rounded-lg">
        <div class="w-96 border-t-8 rounded-lg flex">
          <div class="w-1/3 pt-6 flex justify-center">
            <IonIcon icon={alertCircleSharp} size="large"></IonIcon>
          </div>
          <div class="w-full py-9 pr-4">
            <h3 class="font-bold text-lg">Liste Vide?</h3>
            <p class="py-4 text-lg text-gray-400">Vous pouvez remplir votre liste des favoris à partir de notre sélection d'articles !</p>
          </div>
        </div>
        <IonButton routerLink={`/tabs/feed`} expand="full" shape="round" strong="true" fill="solid" className="dark:text-gray-100 text-s">
            <IonIcon icon={reader} slot="start"></IonIcon> {'Articles'}
          </IonButton>
      </div>
    </div>

  )
}
const FeedCard = ({ title, category, excerpt, author, logo, image, langcode, id }) => {
  return (
    <Card className="my-4 mx-auto">
      <div>
        <img loading="lazy" className="rounded-t-xl h-32 w-full object-cover" src={image} />
      </div>
      <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
        <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{category}</h4>
        <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
        <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">
          {excerpt}
        </p>

        <div className="flex items-center justify-between my-2 mx-4">
          <IonButton routerLink={`/tabs/${langcode}/news/${id}`} shape="round" fill="outline" className="dark:text-gray-100 text-s">
            <IonIcon icon={reader} slot="start"></IonIcon> {'Lire plus'}
          </IonButton>
          <IonButton shape="round" fill="outline" className="dark:text-gray-100 text-s" onClick={() => removeFromFavoris(id)}>
          <IonIcon icon={heartDislikeSharp} slot="start"></IonIcon>{'Unstar'}
          </IonButton>
        </div>
        <div className="flex items-center space-x-4 mt-3">
          <img src={logo} className="rounded-full w-10 h-10" />
          <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{author}</h3>
        </div>
      </div>
    </Card>
  );
};

const Favoris = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const items = Store.useState(selectors.getFavoris);
  const contentRef = useRef(null);
  const scrollToTop= () => {
      contentRef.current && contentRef.current.scrollToTop(300);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favoris</IonTitle>
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
      <IonContent className="ion-padding" ref={contentRef} fullscreen scrollEvents={true}>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton fill="outline" onClick={()=>scrollToTop()}>      
            <IonIcon icon={arrowUpOutline} />
          </IonFabButton>
        </IonFab>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Favoris</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />

        {items.length > 0 && 
          items.map((item, i) => <FeedCard {...item} key={i} />)
        }
        {items.length === 0 && <EmptyPage/>}
      </IonContent>
    </IonPage>
  );
};

export default Favoris;

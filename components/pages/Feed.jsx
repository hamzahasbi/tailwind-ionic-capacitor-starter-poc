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
  useIonViewWillEnter,
} from '@ionic/react';
import Notifications from './Notifications';
import { useState, useEffect } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import { getHomeItems } from '../../store/selectors';
import Store from '../../store';
import {getNewsNodes, getThematique} from '../config/articles';

const FeedCard = ({ title, category, excerpt, author, authorAvatar, image, ...rest }) => {
  console.log(rest);
  return (
    <Card className="my-4 mx-auto">
      <div>
        <img className="rounded-t-xl h-32 w-full object-cover" src={image} />
      </div>
      <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
        <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{category}</h4>
        <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
        <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">{excerpt}</p>
        <div className="flex items-center space-x-4">
          <img src={authorAvatar} className="rounded-full w-10 h-10" />
          <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{author}</h3>
        </div>
      </div>
    </Card>
  );
};

const Feed = () => {
  const homeItems = Store.useState(getHomeItems);
  const [showNotifications, setShowNotifications] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState('all');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [filters, setFilters] = useState([
    {
      id: 'all',
      name: 'Toutes',
    },
  ]);

  useIonViewWillEnter(() => {
    getThematique(currentLanguage)
      .then(data => {
        const terms = data.data.map(el => {
          return {
            ...el,
            id: el.drupal_internal__tid,
          };
        });
        setFilters(filters => [].concat(filters, terms));
        console.log(filters);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);


  const fetchData = () => {
    setIsLoading(true);
    getNewsNodes(currentLanguage, selectedTerm, offset)
      .then(res => {
        let nodes = res.data.map(el => {
          const alias = '/' + currentLanguage + el.path.alias;
          return {
            ...el,
            path: {
              ...el.path,
              alias: alias,
            },
          };
        });
        setItems(items => [].concat(items, nodes));
        setHasMore(!!res.links.next);
        setIsLoading(false);
        console.log(items);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTerm, offset]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Insights</IonTitle>
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
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />
        {items.length && 
          normalizer(items).map((item, i) => (
            <FeedCard {...item} key={item.id} />)
        )}
      </IonContent>
    </IonPage>
  );
};

export default Feed;

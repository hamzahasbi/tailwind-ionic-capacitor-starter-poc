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
import {getNewsNodes, getThematique} from '../config/articles';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import Loader from '../Loader/Loader';
import {SelectFilters} from '../Filters/select';


const FeedCard = ({ title, category, excerpt, author, logo, image, langcode, id }) => {
  return (
    <Card className="my-4 mx-auto">
      <div>
        <img className="rounded-t-xl h-32 w-full object-cover" src={image} />
      </div>
      <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
        <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{category}</h4>
        <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
        <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-2 mx-6">
          <a href={`/${langcode}/news/${id}`} className="text-blue-500 text-s ml-20 my-1">{'Lire plus'}</a>
        </div>
        <div className="flex items-center space-x-4">
          <img src={logo} className="rounded-full w-10 h-10" />
          <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{author}</h3>
        </div>
      </div>
    </Card>
  );
};

const Feed = () => {
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

  const handleScroll = () => {
    const selected = pageNumber + 1;
    const newOffset = Math.ceil(selected * 10);
    setPageNumber(selected);
    setOffset(newOffset);
  }

  const handleChange = (tid) => {
    setItems([]);
    setOffset(0);
    setPageNumber(0);
    setSelectedTerm(tid);
  }
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
      })
      .catch(e => {
        console.log(e);
      });
  }, []);


  const fetchData = () => {
    setIsLoading(true);
    getNewsNodes(currentLanguage, selectedTerm, offset)
      .then(res => {
        let nodes = normalizer(res.data);
        setItems(olditems => [].concat(olditems, nodes));
        setHasMore(!!res.links.next);
        setIsLoading(false);
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
        <SelectFilters filters={filters} selectedTerm={selectedTerm} handleChange={handleChange}/>

        {isLoading  &&
          <Loader
            callback={() => setIsLoading(false)}
            isOpen={isLoading}
            message={'Chargement...'}
          />
        }
        {items.length > 0 && 
          items.map((item, i) => <FeedCard {...item} key={i} />)
        }
        <InfiniteScroll disabled={!hasMore} callback={handleScroll} loadingText={"Loading...."}/>
      </IonContent>
    </IonPage>
  );
};

export default Feed;

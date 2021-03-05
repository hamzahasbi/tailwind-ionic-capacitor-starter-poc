import Card from '../ui/Card';
import {normalizer} from '../config/articles';
import {
  IonPage,
  IonHeader,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  useIonViewWillEnter,
  IonFab,
  IonFabButton
} from '@ionic/react';
import Notifications from './Notifications';
import { useState, useEffect, useRef } from 'react';
import { notificationsOutline, arrowUpOutline, starOutline, reader, heartDislikeSharp } from 'ionicons/icons';
import {getNewsNodes, getThematique} from '../config/articles';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import Loader from '../Loader/Loader';
import {SelectFilters} from '../Filters/select';
import {setFavoris, setNotifications} from '../../store/actions';
import {getFavoris, getSettings, getNotifications} from '../../store/selectors';
import Store from '../../store';
import { Plugins } from '@capacitor/core';
import 'fancy-notifications';


const { LocalNotifications, FancyNotifications } = Plugins;

const updateBadgeCount = async (count) => {
  const check = await FancyNotifications.hasPermission();
  if (check.value){
    if (count === 0) await FancyNotifications.clearBadgeCount();
    else await FancyNotifications.setBadgeCount({ count });
  } else {
    const request = await FancyNotifications.requestPermission();
    if (request.value){
      if (count === 0) await FancyNotifications.clearBadgeCount();
      else await FancyNotifications.setBadgeCount({count});
    }
  }
}
const FeedCard = ({ title, category, excerpt, author, logo, image, langcode, id }) => {


  return (
    <Card routerLink={`/tabs/${langcode}/news/${id}`} className="my-4 mx-auto">
      <div>
        <img loading="lazy" className="rounded-t-xl h-32 w-full object-cover" src={image} />
      </div>
      <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
        <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{category}</h4>
        <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
        <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">
          {excerpt}
        </p>

        <div className="flex items-center space-x-4 mt-3">
          <img src={logo} className="rounded-full w-10 h-10" />
          <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{author}</h3>
        </div>
      </div>
    </Card>
  );
};

const Feed = () => {

  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = Store.useState(getNotifications);
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
  const contentRef = useRef(null);
  const scrollToTop= () => {
      contentRef.current && contentRef.current.scrollToTop(300);
  };
  const handleScroll = () => {
    const selected = pageNumber + 1;
    const newOffset = Math.ceil(selected * 4);
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
        setFilters([].concat([
          {
            id: 'all',
            name: 'Toutes',
          },
        ], terms));
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
            <IonButton  onClick={() => setShowNotifications(true)}>
              <span className="badge rounded-full px-2 py-1 text-center object-right-top text-sm mr-1"> 
                <IonIcon icon={notificationsOutline}  slot="start"/> 
                {notifications.length}
                </span>
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

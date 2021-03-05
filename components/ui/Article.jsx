import sanitizeHtml from 'sanitize-html';
import {IonButton, IonCol, IonGrid, IonIcon, IonRow} from "@ionic/react";
import { heartOutline, heartSharp, starOutline } from 'ionicons/icons';
import {setFavoris, setNotifications, removeFromFavoris} from '../../store/actions';
import {getFavoris, getSettings, getNotifications} from '../../store/selectors';
import Store from '../../store';


export const Article = ({title, author, body, category, logo, date, image}) => {
    return (
        <div className="mx-auto px-4 py-4 max-w-xl my-4">
            <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide" >
                <div className="md:flex-shrink-0">
                    <img loading='lazy' src={image} alt="article image" className="w-full h-64 rounded-lg rounded-b-none"/>
                    <div className="flex items-center justify-between py-1 px-3 bg-gray-400" >
                        <h6 className='bg-gray-800 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-gray-700'>{category}</h6>
                    </div>
                </div>
                <div className="px-4 py-2 mt-2">
                    <h2 className="font-bold text-2xl text-gray-800 tracking-normal">{title}</h2>
                        <p className="text-sm text-gray-700 px-2 mr-1" dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}/>
                        
                    <div className="author flex items-center -ml-3 my-3">
                        <div className="user-logo">
                            <img className="w-12 h-12 object-cover rounded-full mx-4  shadow" src={logo} alt="avatar"/>
                        </div>
                        <h2 className="text-sm tracking-tighter text-gray-900">
                            <a href="https://void.fr">{author}</a> <span className="ml-2 text-gray-600">{date}</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const ArticleV2 = ({title, author, excerpt, body, category, langcode, logo, date, image, id}) => {

    const settings = Store.useState(getSettings);
    const favoris = Store.useState(getFavoris);

    const handleFavorite = async () => {
      if (favoris.findIndex((el) => el.id === id) === -1) {
        setFavoris({ title, category, excerpt, author, logo, image, langcode, id });
        if (settings.enableNotifications) {
            setNotifications({ id: id, title: "Article ajouté au favoris", body: `l'article "${title}" a été ajouté à votre liste des favoris!` });
           
        }
      } else {
          removeFromFavoris(id);
      }

    }
  
  
    return (
        <div className='max-w-xl my-4 mx-auto'>
            <div>
                <img loading="lazy" className="rounded-t-xl h-32 w-full object-cover" src={image} />
            </div>
                <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">
                                    {category}
                                </h4>
                            </IonCol>

                            <IonCol>
                                <IonButton fill="clear" className="dark:text-gray-100 text-s ml-24 py-0" onClick={() => handleFavorite()}>
                                    {favoris.findIndex((el) => el.id === id) !== -1 ? <IonIcon size="large" icon={heartSharp} slot="end"></IonIcon> : <IonIcon  size="large" icon={heartOutline} slot="end"></IonIcon> }
                                </IonButton>
                            </IonCol>
                           
                        </IonRow>
                    </IonGrid>
                    
                    <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
                    <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}>
                    </p>

                    <div className="flex items-center space-x-4 mt-3">
                    <img src={logo} className="rounded-full w-10 h-10" />
                    <h2 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">
                        <a href="https://void.fr">{author}</a> <span className="ml-2 text-gray-600">{date}</span>   
                    </h2>
                </div>
            </div>
            
        </div>
    );
}
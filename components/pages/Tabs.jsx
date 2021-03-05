import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cog, flash, home, starSharp} from 'ionicons/icons';

import Feed from './Feed';
import Home from './Home';
import Details from './Details';
import Settings from './Settings';
import Favoris from './Favoris';
const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/feed" component={Feed} exact={true} />
        <Route
              path="/tabs/home"
              render={(props) => <Home {...props} language="fr" />}
        />
        <Route
              path="/tabs/:lang/news/:id"
              render={(props) => <Details {...props} language="fr" />}
        />

        <Route path="/tabs/settings" component={Settings} exact={true} />
        <Route path="/tabs/favoris" component={Favoris} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/home" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/home">
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/feed">
          <IonIcon icon={flash} />
          <IonLabel>Feed</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/favoris">
          <IonIcon icon={starSharp} />
          <IonLabel>Favoris</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;

import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cog, flash, home } from 'ionicons/icons';

import Feed from './Feed';
import Home from './Home';
import Details from './Details';
import Settings from './Settings';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/feed" component={Feed} exact={true} />
        <Route path="/home" component={Home} exact={true} />
        <Route
              path="/tabs/:lang/news/:id"
              render={(props) => <Details {...props} language="fr" />}
            />
        <Route path="/tabs/settings" component={Settings} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/home" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/feed">
          <IonIcon icon={flash} />
          <IonLabel>Feed</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;

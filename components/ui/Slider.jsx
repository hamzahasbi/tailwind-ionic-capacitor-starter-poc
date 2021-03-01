import React from 'react';
import { IonSlides, IonSlide, IonButton, IonIcon } from '@ionic/react';
import { arrowForward} from 'ionicons/icons';

const slideOpts = {
    initialSlide: 0,
    speed: 400
  };

export const SliderHome = ({}) => {
    return(
        <IonSlides pager={false} options={slideOpts}>
            <IonSlide>
            <div className="slide">
                <img src="/img/slide-1.png" className="pb-1" loading="lazy"/>
                <h2>AGENCE DIGITALE</h2>
                <p>VOID accompagne de grandes entreprises locales et internationales dans leur transformation numérique : de la stratégie de communication à la création de campagnes, de la production d’expériences cross canal jusqu’au développement et à l’animation de leur plateformes digitales.</p>
            </div>
            </IonSlide>

            <IonSlide>
            <div className="slide">
                <img src="/img/slide-2.png" loading="lazy"/>
                <h2>VOID Insights</h2>
                <p>Ancienement appelé Digital.africa est une plateforme de blogging créée par l'agence VOID pour la publication périodique et régulière de ces articles en relation avec la production digitale.</p>
                <IonButton fill="clear" routerLink={'/tabs/feed'}> Découvrir <IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>

            </div>
            </IonSlide>

            
        </IonSlides>
    );
};


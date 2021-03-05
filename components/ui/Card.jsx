import classNames from 'classnames';
import {IonCard, IonItem} from "@ionic/react";
const Card = ({ children, className, ...props }) => (
  <IonCard {...props} className={classNames('max-w-xl', className)}>
    <div className="bg-white shadow-md rounded-b-xl dark:bg-black">{children}</div>
  </IonCard>
);

export default Card;

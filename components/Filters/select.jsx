import React, { useState, useEffect } from 'react';
import {
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonItem,
    IonList,
  } from '@ionic/react';

export const SelectFilters = ({filters, handleChange, selectedTerm}) => {

    const customOptions = {
        header: 'Choisir une thématique',
        translucent: true
    };
    return (
        <IonList className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
            <IonItem className='rounded-b-xl'>
                {/* <IonLabel>{"Thématiques"}</IonLabel> */}
                <IonSelect
                    className='item-native'
                    interfaceOptions={customOptions}
                    interface="action-sheet"
                    placeholder="Thématique"
                    cancel-text="Annuler"
                    ok-text="Confirmer"
                    onIonChange={e => handleChange(e.detail.value)}
                    value={selectedTerm}
                >
                    {
                        filters.map(filter => {
                            return (
                                <IonSelectOption key={filter.id} value={filter.id}>{filter.name}</IonSelectOption>
                            );
                        })
                    }
                </IonSelect>
            </IonItem>

        </IonList>
    );
};

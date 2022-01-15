import React, { useEffect, useState } from 'react';

import {
  ButtonBack,
  AddressButton,
  AddressButtonLabel,
  Container,
  Title,
  Description,
} from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, ScrollView } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useTheme } from 'styled-components/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../../store/types';
import { GetCurrentUser } from '../../../services/firestore/userMethods';
import { SetUser } from '../../../store/ducks/user/actions';

interface IUserCityModal {
  setModalUserCityVisible: any;
}

const SetCityModal = ({ setModalUserCityVisible }: IUserCityModal) => {
  const {
    user: { id, name, photoUrl },
  } = useSelector((state: AppStore) => state);

  const dispatch = useDispatch();

  const { COLORS } = useTheme();
  const [myCity, setMyCity] = useState<String | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleMyCity = async () => {
    setLoading(true);
    await firestore()
      .collection('USER')
      .doc(id)
      .update({ formatted_city: myCity })
      .then(() => {
        console.log('USER UPDATED');
      })
      .catch((e) => {
        console.log(e);
      });

    const reduxUser = await GetCurrentUser(id);

    dispatch(SetUser(reduxUser));
    console.log('REDUX USER UPDATED :', reduxUser);
    setModalUserCityVisible(false);
  };

  return (
    <>
      <Container>
        <MaterialIcons name={'local-fire-department'} size={48} />
        <Title>seja bem-vindo {`\n`} ao flup</Title>
        <Description>
          Preencha o campo abaixo para podermos achar os melhores spots para
          você!
        </Description>
        <GooglePlacesAutocomplete
          placeholder="Qual sua cidade?"
          query={{
            key: 'AIzaSyD8oNI5P5nkaW_go0J4IXq_MUE6hIInKuM',
            language: 'pt-br',
          }}
          onPress={(data, details = null) => {
            setMyCity(details?.formatted_address);
          }}
          enablePoweredByContainer
          fetchDetails
          minLength={2}
          styles={{
            container: {
              height: 56,
            },
            textInputContainer: {
              width: '100%',
              backgroundColor: '#000',
            },
            textInput: {
              height: 56,
              color: '#000000',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: { height: 300 },
          }}
        />
      </Container>
      <AddressButton onPress={handleMyCity}>
        {!loading ? (
          <AddressButtonLabel>Confirmar</AddressButtonLabel>
        ) : (
          <ActivityIndicator size="small" color={COLORS.PRIMARY_900} />
        )}
      </AddressButton>
    </>
  );
};

export default SetCityModal;

import Photo from '../../../components/Photo';
import { AppStore } from '../../../store/types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firestore from '@react-native-firebase/firestore';

import storage, { firebase } from '@react-native-firebase/storage';

import { MaterialIcons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import {
  ButtonLabel,
  Description,
  Form,
  Header,
  HeaderBoxLeft,
  InputGroup,
  InputGroupHeader,
  Label,
  Label2,
  MaxCharacters,
  MessageContainer,
  Title,
} from './styles';
import Input from '../../../components/input';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'styled-components/native';

interface ISetModalNewSpot {
  setOpenModalNewSpot: React.Dispatch<boolean>;
}

const SetModalNewSpot = ({ setOpenModalNewSpot }: ISetModalNewSpot) => {
  const {
    user: { id },
  } = useSelector((state: AppStore) => state);

  const { COLORS } = useTheme();

  const [spotBanner, setSpotBanner] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();

  const [loading, setLoading] = useState(false);

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setSpotBanner(result.uri);
      }
    }
  }

  const handleSaveDetails = async () => {
    if (name.length < 1) {
      Alert.alert('Nome', 'Preencha o nome da pista!');
      return;
    }

    if (description.length < 1) {
      Alert.alert('Descrição', 'Preencha uma breve descrição do local!');
      return;
    }

    if (latitude.length < 5) {
      Alert.alert('Latitude', 'Preencha uma latitude válida!');
      return;
    }
    if (longitude.length < 5) {
      Alert.alert('Longitude', 'Preencha uma longitude válida!');
      return;
    }

    setLoading(true);

    const reference = storage().ref(`/new_spots_photo/${id}.png`);
    await reference.putFile(spotBanner);
    const photo_url = await reference.getDownloadURL();

    await firestore()
      .collection('SPOTS')
      .add({
        name: name,
        description: description,
        spotPhotos: [photo_url],
        location: new firebase.firestore.GeoPoint(
          Number(latitude),
          Number(longitude)
        ),
        formatted_city: '',
        status: 2,
      })
      .then(() => {
        console.log('SPOT UPLOADED');
        Alert.alert(
          'Enviado com Sucesso',
          'Nós agradecemos por colaborar com a comunidade Flup! Vamos analisar seu envio e logo logo retornaremos uma resposta.'
        );
        setName('');
        setDescription('');
        setLatitude('');
        setLongitude('');
        setSpotBanner('');
        setLoading(false);
      })
      .catch((e) => {
        Alert.alert('Lamentamos', 'Não foi possivel enviar o pico...');
        setLoading(false);
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Header>
        <HeaderBoxLeft>
          <TouchableOpacity>
            <MaterialIcons
              name={'arrow-back'}
              size={24}
              onPress={() => setOpenModalNewSpot(false)}
            />
          </TouchableOpacity>
        </HeaderBoxLeft>
      </Header>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{ flex: 1 }}
      >
        <MessageContainer>
          <TouchableOpacity
            style={{ width: '100%', height: 432 }}
            onPress={handleImagePicker}
          >
            <Image
              source={{
                uri: spotBanner
                  ? spotBanner
                  : 'https://www.ochch.org/wp-content/themes/mast/images/empty-photo.jpg',
              }}
              style={{ flex: 1, resizeMode: 'cover' }}
            />
          </TouchableOpacity>
          <Title>Achou um pico?</Title>
          <Description>
            Capture para que mais pessoas possam visita-lo.
          </Description>
        </MessageContainer>

        <Form>
          <InputGroup>
            <InputGroupHeader>
              <Label>Nome</Label>
              <MaxCharacters>{name.length} de 40 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input
              onChangeText={setName}
              value={name}
              maxLength={40}
              placeholder="Qual o nome do pico?"
              selectionColor={COLORS.PRIMARY_900}
              style={{ height: 56 }}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Breve Descrição</Label>
              <MaxCharacters>
                {description.length} de 120 caracteres
              </MaxCharacters>
            </InputGroupHeader>
            <Input
              onChangeText={setDescription}
              value={description}
              maxLength={120}
              placeholder={'Descreva brevemente sobre o pico'}
              style={{ height: 56 }}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader style={{ marginBottom: 16 }}>
              <Label>Localização exata</Label>
              <Label>?</Label>
            </InputGroupHeader>
            <Label2>Latitude</Label2>
            <Input
              onChangeText={setLatitude}
              value={latitude}
              keyboardType="number-pad"
              placeholder={'Latitude'}
              placeholderTextColor={'#dadada'}
              style={{ height: 56 }}
            />
            <Label2>Longitude</Label2>
            <Input
              onChangeText={setLongitude}
              value={longitude}
              keyboardType="numeric"
              placeholder={'Longitude'}
              placeholderTextColor={'#dadada'}
              style={{ height: 56 }}
            />
          </InputGroup>
        </Form>
      </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={handleSaveDetails}
        style={[
          styles.buttonConfirm,
          {
            backgroundColor: '#000',
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator size={'small'} color={COLORS.SUCCESS_900} />
        ) : (
          <ButtonLabel>Salvar</ButtonLabel>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  boxBase: {
    width: 164,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
  },
  textBase: {
    fontSize: 12,
    fontFamily: 'DMSans_Bold',
    textTransform: 'uppercase',
  },
  buttonConfirm: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SetModalNewSpot;

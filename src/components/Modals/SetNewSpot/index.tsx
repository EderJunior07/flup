import Photo from '../../../components/Photo';
import { AppStore } from '../../../store/types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firestore from '@react-native-firebase/firestore';

import { MaterialIcons } from '@expo/vector-icons';

import {
  ButtonLabel,
  Container,
  Description,
  Form,
  Header,
  HeaderBoxLeft,
  HeaderBoxRight,
  HeaderTitle,
  InputGroup,
  InputGroupHeader,
  Label,
  MaxCharacters,
  MessageContainer,
  Title,
  ToggleBox,
} from './styles';
import Input from '../../../components/input';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'styled-components/native';

interface ISetModalNewSpot {
  setOpenModalNewSpot: React.Dispatch<boolean>;
}

const SetModalNewSpot = ({ setOpenModalNewSpot }: ISetModalNewSpot) => {
  const {
    user: { id, name, photoUrl, formatted_city, description },
  } = useSelector((state: AppStore) => state);

  const { COLORS } = useTheme();
  const dispatch = useDispatch();

  const [biography, setBiography] = useState('');

  const [actives, setActives] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const handleSaveDetails = async () => {
    if (biography.length < 1) {
      Alert.alert('Biografia', 'Preencha sua biografia!');
      return;
    }

    if (actives.length < 1) {
      Alert.alert('Base', 'Preencha sua base para continuar!');
      return;
    }

    setLoading(true);
    await firestore()
      .collection('SPOTS')
      .doc(id)
      .update({ description: biography, base_at_skate_type: actives })
      .then(() => {
        console.log('SPOT UPLOADED');
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <>
      <Header>
        <HeaderBoxLeft>
          <TouchableOpacity>
            <MaterialIcons name={'arrow-back'} size={24} />
          </TouchableOpacity>
        </HeaderBoxLeft>

        <HeaderBoxRight>
          <TouchableOpacity>
            <Text>?</Text>
          </TouchableOpacity>
        </HeaderBoxRight>
      </Header>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          style={{ flex: 1 }}
        >
          <MessageContainer>
            <Image
              source={{
                uri: 'https://www.ochch.org/wp-content/themes/mast/images/empty-photo.jpg',
              }}
              style={{ width: '100%', height: 232 }}
            />
            <Title>Cadastrar pico</Title>
            <Description>
              Falta só mais um pouquinho para você dar seus rolês por aí,
              complete seu perfil.
            </Description>
          </MessageContainer>

          <Form>
            <InputGroup>
              <Label>Nome</Label>

              <Input
                onChangeText={setBiography}
                value={biography}
                maxLength={60}
                placeholder="Qual o nome da pista?"
                selectionColor={COLORS.PRIMARY_900}
                style={{ height: 56 }}
              />
            </InputGroup>

            <InputGroup>
              <InputGroupHeader>
                <Label>Breve Descrição</Label>
                <MaxCharacters>
                  {biography.length} de 60 caracteres
                </MaxCharacters>
              </InputGroupHeader>
              <Input
                onChangeText={setBiography}
                value={biography}
                maxLength={60}
                placeholder={'Descreva brevemente sobre o pico'}
                style={{ height: 56 }}
              />
            </InputGroup>

            <InputGroup>
              <InputGroupHeader>
                <Label>Localização Exata</Label>
                <Label>?</Label>
              </InputGroupHeader>
              <Input
                onChangeText={setBiography}
                value={biography}
                maxLength={60}
                placeholder={'Latitude'}
                placeholderTextColor={'#dadada'}
                style={{ height: 56 }}
              />
              <Input
                onChangeText={setBiography}
                value={biography}
                maxLength={60}
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
    bottom: 8,
    height: 56,
    width: '92%',
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SetModalNewSpot;

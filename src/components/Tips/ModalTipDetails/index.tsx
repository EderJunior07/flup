import React, { useEffect, useState } from 'react';

import {
  Description,
  ImageContainer,
  Title,
  TitleBox,
  Header,
  HeaderBoxLeft,
  HeaderTitle,
  HeaderBoxRight,
  BadgeTitle,
} from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useTheme } from 'styled-components/native';
import { ITips } from '../../../screens/tips';

interface IModalTipDetails {
  setModalTipDetailsVisible: any;
  id: string;
}

const ModalTipDetails = ({
  setModalTipDetailsVisible,
  id,
}: IModalTipDetails) => {
  const { COLORS } = useTheme();
  const [loading, setLoading] = useState<any>();
  const [tip, setTip] = useState<ITips>();

  async function fetchTip() {
    setLoading(true);
    const response = await firestore()
      .collection('FLUP_TIPS')
      .doc(id)
      .get()
      .then((response) => {
        setLoading(false);
        return response.data();
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Consulta', 'Não foi possível realizar a consulta.');
      });

    setTip(response as ITips);
  }

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.BACKGROUND,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ alignSelf: 'center' }}
          />
        </View>
      ) : (
        <>
          <ScrollView style={{ flex: 1 }}>
            <Header>
              <HeaderBoxLeft>
                <TouchableOpacity
                  onPress={() => setModalTipDetailsVisible(false)}
                >
                  <MaterialIcons name={'arrow-back'} size={24} />
                </TouchableOpacity>
              </HeaderBoxLeft>
              <HeaderTitle>Flup Tips</HeaderTitle>
              <HeaderBoxRight>
                <TouchableOpacity>
                  <MaterialIcons name={'chat-bubble-outline'} size={24} />
                </TouchableOpacity>
              </HeaderBoxRight>
            </Header>

            <ImageContainer>
              <Image
                style={{ flex: 1, backgroundColor: '#000' }}
                source={{
                  uri: tip
                    ? tip?.cover
                    : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
                }}
              />
            </ImageContainer>

            <BadgeTitle>{tip?.type}</BadgeTitle>

            <TitleBox>
              <Title>{tip?.title}</Title>
            </TitleBox>

            <Description>
              {tip?.description
                ? tip?.description
                : 'Desculpe ainda estamos pensando nisso.'}
            </Description>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default ModalTipDetails;

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  ContainerOfTitle,
  Header,
  HeaderBoxRight,
  HeaderTitle,
  LabelContainerOfTitle,
  TipsTitleContainer,
  TipsTitleLabel,
  TitleContainer,
} from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { useTheme } from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ModalTipDetails from '../../components/Tips/ModalTipDetails';

export interface ITips {
  id: string;
  title: string;
  description: string;
  cover: string;
  videos: string[];
  type: string;
  status: 0 | 1 | 2;
}

const Tips = () => {
  const { COLORS } = useTheme();

  const [tipsType, setTypsType] = useState<
    'Básico' | 'Intermediário' | 'Avançado'
  >('Básico');
  const [hasTips, setHasTips] = useState(false);
  const [allTips, setAllTips] = useState<ITips[]>([]);
  const [tipSelected, setTipSelected] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const trackTips = async () => {
    const tipsCollectionRef = await firestore()
      .collection('FLUP_TIPS')
      .where('status', '==', 1)
      .get();

    if (tipsCollectionRef.empty) {
      console.log('No matching documents for TRACK FLUP TIPS.');
      setHasTips(false);
      return;
    }
    setHasTips(true);

    let response: any = [];

    tipsCollectionRef.forEach((doc) => {
      response.push(doc.data());
      return doc.data();
    });

    setAllTips(response);
    return response;
  };

  useEffect(() => {
    trackTips();
  }, []);

  const handleTipSelected = (id: string) => {
    setTipSelected(id);
    setModalVisible(true);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalTipDetails
          setModalTipDetailsVisible={setModalVisible}
          id={tipSelected}
        />
      </Modal>
      <Container>
        <Header>
          <HeaderTitle>Flup Dicas</HeaderTitle>
          <HeaderBoxRight>
            <TouchableOpacity>
              <MaterialIcons name={'filter-list-alt'} size={24} />
            </TouchableOpacity>
          </HeaderBoxRight>
        </Header>

        <ContainerOfTitle>
          <TitleContainer>
            <LabelContainerOfTitle>{tipsType}</LabelContainerOfTitle>
          </TitleContainer>
        </ContainerOfTitle>

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => trackTips()}
            />
          }
          data={allTips}
          refreshing={refreshing}
          onRefresh={() => trackTips()}
          style={{ flex: 1, marginHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleTipSelected(item.id)}
                style={{
                  width: '100%',
                  minHeight: 253,
                  zIndex: 999,
                  justifyContent: 'center',
                  alignItems: 'center',

                  marginBottom: 8,
                }}
              >
                <Image
                  source={{ uri: item.cover }}
                  style={{
                    width: '100%',
                    height: 324,
                    resizeMode: 'cover',
                  }}
                />

                <TipsTitleContainer>
                  <TipsTitleLabel>{item.title}</TipsTitleLabel>
                </TipsTitleContainer>
              </TouchableOpacity>
            );
          }}
        />
      </Container>
    </>
  );
};

export default Tips;

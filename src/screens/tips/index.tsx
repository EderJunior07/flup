import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
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
  TitleContainer,
} from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../store/types';
import { useTheme } from 'styled-components';

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
  const dispatch = useDispatch();
  const { COLORS } = useTheme();
  const {
    user: { id },
  } = useSelector((state: AppStore) => state);

  const [tipsType, setTypsType] = useState<
    'Básico' | 'Intermediário' | 'Avançado'
  >('Básico');
  const [hasTips, setHasTips] = useState(false);
  const [allTips, setAllTips] = useState<ITips[]>([]);

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

    console.log('AA', response);
    setAllTips(response);
    return response;
  };

  useEffect(() => {
    trackTips();
  }, []);

  return (
    <>
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
                // onPress={() => handleModalUserSelected(item.id)}
                activeOpacity={0.9}
                style={{
                  flex: 1,
                  borderRadius: 132,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: item.cover }}
                  style={{
                    width: '100%',
                    height: 324,
                    resizeMode: 'cover',
                    marginBottom: 8,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </Container>
    </>
  );
};

export default Tips;

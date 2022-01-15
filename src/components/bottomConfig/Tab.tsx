import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Text } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/types';

const Container = styled.TouchableWithoutFeedback``;

const Background = styled(Transitioning.View)`
  flex: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  margin: 6px;
`;

function Tab({ label, accessibilityState, onPress }: any) {
  const {
    user: { id, photoUrl, name},
  } = useSelector((state: AppStore) => state);

  const focused = accessibilityState.selected;

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="scale" durationMs={30} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="scale" durationMs={30} />
    </Transition.Sequence>
  );

  const ref = useRef();

  return (
    <Container
      onPress={() => {
        ref?.current?.animateNextTransition();
        onPress();
      }}
    >
      <Background
        focused={focused}
        label={label}
        ref={ref}
        transition={transition}
      >
        {label === 'Eu' ? (
          <Image
            style={{ width: 32, height: 32, borderRadius: 32 }}
            source={{
              uri: photoUrl
                ? photoUrl
                : `https://ui-avatars.com/api/?size=128&length=1&background=FF2424&color=FFF&name=${name}`,
            }}
          />
        ) : label === 'Explorar' ? (
          <MaterialIcons
            name={'local-fire-department'}
            size={24}
            color="#000"
          />
        ) : label === 'Comprar' ? (
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../../../assets/images/shopping_bag.png')}
          />
        ) : (
          <Image
            style={{ width: 24, height: 24, resizeMode: 'cover' }}
            source={require('../../../assets/images/role.png')}
          />
        )}
        {focused && (
          <Text
            style={{
              color: '#000',
              fontWeight: '600',
              marginLeft: 12,
              marginTop: 4,
              fontFamily: 'DMSans_Medium',
            }}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Text>
        )}
      </Background>
    </Container>
  );
}

export default Tab;

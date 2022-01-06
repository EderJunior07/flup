import { useAuth } from '../../hooks/auth';
import React, { useEffect } from 'react';
import { Container } from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { Button, Text, View } from 'react-native';

import { Modalize } from 'react-native-modalize';
import { useTheme } from 'styled-components';

const Home = () => {
  const modal = React.createRef();
  const {COLORS} = useTheme()
  const { signOut } = useAuth();

  const renderContent = () => (
    <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
      <Text>{'Introduction'.toUpperCase()}</Text>
      <Text>Always open modal!</Text>

    </View>
  );

  return (
    <>
      <Container>
        <Modalize
          ref={() => modal}
          modalStyle={{ marginHorizontal: 8, borderRadius: 0 }}
          modalHeight={500}
          alwaysOpen={100}
          velocity={2}
          handlePosition="outside"
          handleStyle={{backgroundColor: COLORS.PRIMARY_BUTTON, borderRadius: 0}}
        >
          {renderContent()}
        </Modalize>
      </Container>
    </>
  );
};

export default Home;

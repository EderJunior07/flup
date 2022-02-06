import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Explore from '@screens/Explore';
import TabComponent from '../components/bottomConfig/Tab';
import HomeStack from './stackHome/home.routes';
import PerfilStack from './stackPerfil/perfil.routes';
import TipsStack from './stackTips/tips.routes';
import ExploreStack from './stackExplore/explore.routes';

const Tab = createBottomTabNavigator();

const BottomNav = () => {


  return (
  
      <Tab.Navigator
      screenOptions={
        {
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFF',
            height: 64,
            borderTopColor: '#DDD',
            elevation: 15
          }
        }
      }
      > 
        <Tab.Screen
          name="Role"
          component={HomeStack}
          options={{
            tabBarButton: (props) => <TabComponent label="Rolê" {...props} />,
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreStack}
          options={{
            tabBarButton: (props) => <TabComponent label="Explorar" {...props} />,
          }}
        />
         <Tab.Screen
          name="Dicas"
          component={TipsStack}
          options={{
            tabBarButton: (props) => <TabComponent label="Dicas" {...props} />,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilStack}
          options={{
            tabBarButton: (props) => (
              <TabComponent label="Eu" {...props} />
            ),
          }}
        />
      
       
      </Tab.Navigator>
    
  );
};

export default BottomNav;
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Explore from '@screens/Explore';
import TabComponent from '../components/bottomConfig/Tab';
import HomeStack from './stackHome/home.routes';
import PerfilStack from './stackPerfil/perfil.routes';

const Tab = createBottomTabNavigator();

const BottomNav = () => {


  return (
  
      <Tab.Navigator
      screenOptions={
        {
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0E0E0E',
            height: 72,
            borderTopColor: '#131313',
            elevation: 15
          }
        }
      }
      > 
        <Tab.Screen
          name="Projetos"
          component={HomeStack}
          options={{
            tabBarButton: (props) => <TabComponent label="Projetos" {...props} />,
          }}
        />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarButton: (props) => <TabComponent label="Discover" {...props} />,
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
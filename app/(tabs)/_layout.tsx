// src/layout/Layout.tsx
import { Tabs } from 'expo-router';
import { Home, Settings } from 'lucide-react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingHorizontal: 10, 
          paddingVertical: 10,   
          height: 70,           
        },
        tabBarLabelStyle: {
          fontSize: 10,         
        },
        tabBarIconStyle: {
          marginTop: 5,      
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Início',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: 'Configurações',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

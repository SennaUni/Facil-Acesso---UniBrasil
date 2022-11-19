import { createDrawerNavigator } from '@react-navigation/drawer';

import { FontAwesome } from '@expo/vector-icons';

import { ScreenA } from '../screens/screenA';
import { ScreenB } from '../screens/screenB';

import { Principal } from '../screens/Principal';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';
import { UpdateUser } from '../screens/UpdateUser'
import { UpdatePassword } from '../screens/UpdatePassword'
import { ForgotPassword } from '../screens/ForgotPassword'
import { RegisterComment } from '../screens/RegisterComment'
import { RegisterAccessibility } from '../screens/RegisterAccessiblity'

import { CustomDrawer } from '../components/CustomDrawer';

const { Screen, Navigator, Group } = createDrawerNavigator();

export function DrawerRoutes() {
    return (
        <Navigator 
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{ 
                headerShown: false,
                drawerActiveBackgroundColor: '#FFF',
                drawerActiveTintColor: '#6441A5',
                drawerInactiveTintColor: '#FFF',
                drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
            }}
        >
            <Screen 
                name='register'
                component={Register} 
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />,
                    title: 'Tela de Registro'
                }}
            />
            <Screen 
                name='login' 
                component={Login} 
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />
                }}
            />
            <Screen 
                name='updateUser' 
                component={UpdateUser} 
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />
                }}
            />
            <Screen 
                name='updatePassword' 
                component={UpdatePassword} 
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />
                }}
            />
            <Screen 
                name='forgotPassword' 
                component={ForgotPassword} 
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />
                }}
            />
            <Screen 
                name='registerComment' 
                component={RegisterComment} 
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />
                }}
            />
            <Screen 
                name='registerAccessibility' 
                component={RegisterAccessibility} 
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />
                }}
            />
            <Screen 
                name='screenA'
                component={ScreenA}
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />
                }}
            />
            <Screen 
                name='screenB'
                component={ScreenB}
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />
                }}
            /> 
            <Screen 
                name='principal'
                component={Principal}
                options={{
                    drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />
                }}
            /> 
        </Navigator>
    )
}
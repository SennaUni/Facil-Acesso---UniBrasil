import { createDrawerNavigator } from '@react-navigation/drawer';

import { FontAwesome } from '@expo/vector-icons';

import { Principal } from '../screens/Principal';
import { Register } from '../screens/Register';
import { Login } from '../screens/Login';
import { Profile } from '../screens/Profile';
import { UpdateUser } from '../screens/UpdateUser'
import { UpdatePassword } from '../screens/UpdatePassword'
import { ForgotPassword } from '../screens/ForgotPassword'
import { RegisterComment } from '../screens/RegisterComment'
import { MyComments } from '../screens/MyComments'
import { MyFavorites } from '../screens/MyFavorites'

import { CustomDrawer } from '../components/CustomDrawer';

import { useAuth } from '../hooks/auth';

const { Screen, Navigator, Group } = createDrawerNavigator();

export function DrawerRoutes() {

    const { dataAuth } = useAuth(); 

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
            { dataAuth.uid ? (
                <>
                    <Screen 
                        name='principal'
                        component={Principal}
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="home" size={22} color={color} />,
                            title: 'Home'
                        }}
                    /> 
                    <Screen 
                        name='perfil' 
                        component={Profile} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="user" size={22} color={color} />,
                            title: 'Meu perfil'
                        }}
                    />
                    <Screen 
                        name='updateUser' 
                        component={UpdateUser} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="edit" size={22} color={color} />,
                            title: 'Atualizar perfil'
                        }}
                    />
                    <Screen 
                        name='updatePassword' 
                        component={UpdatePassword} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="unlock" size={22} color={color} />,
                            title: 'Alterar senha'
                        }}
                    />
                    <Screen 
                        name='forgotPassword' 
                        component={ForgotPassword} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="envelope" size={22} color={color} />,
                            title: 'Esqueci minha senha'
                        }}
                    />
                    <Screen 
                        name='registerComment' 
                        component={RegisterComment} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="plus" size={22} color={color} />,
                            title: 'Realizar coment??rio'
                        }}
                    />
                    <Screen 
                        name='myComments' 
                        component={MyComments} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="file-text" size={22} color={color} />,
                            title: 'Meus coment??rios'
                        }}
                    />
                    <Screen 
                        name='myFavorites' 
                        component={MyFavorites} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="heart" size={22} color={color} />,
                            title: 'Coment??rios favoritos'
                        }}
                    />
                </>
            ) : (
                <>
                    <Screen 
                        name='principal'
                        component={Principal}
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="home" size={22} color={color} />,
                            title: 'Home'
                        }}
                    /> 
                    <Screen 
                        name='register'
                        component={Register} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="user-plus" size={22} color={color} />,
                            title: 'Crie sua conta'
                        }}
                    />
                     <Screen 
                        name='login' 
                        component={Login} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="sign-in" size={22} color={color} />,
                            title: 'Acesse sua conta'
                        }}
                    />
                     <Screen 
                        name='forgotPassword' 
                        component={ForgotPassword} 
                        options={{
                            drawerIcon: ({ color }) => <FontAwesome name="envelope" size={22} color={color} />,
                            title: 'Esqueci minha senha'
                        }}
                    />
                </>
            )}
        </Navigator>
    )
}
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ScreenA } from '../screens/screenA';
import { ScreenB } from '../screens/screenB';

import { Register } from '../screens/Register';
import { Login } from '../screens/Login';
import { UpdateUser } from '../screens/UpdateUser'
import { UpdatePassword } from '../screens/UpdatePassword'
import { ForgotPassword } from '../screens/ForgotPassword'
import { RegisterComment } from '../screens/RegisterComment'
import { RegisterAccessibility } from '../screens/RegisterAccessiblity'

const { Screen, Navigator, Group } = createDrawerNavigator();

export function DrawerRoutes() {
    return (
        <Navigator>
            <Screen 
                name='register' 
                component={Register} 
            />
            <Screen 
                name='login' 
                component={Login} 
            />
            <Screen 
                name='updateUser' 
                component={UpdateUser} 
            />
            <Screen 
                name='updatePassword' 
                component={UpdatePassword} 
            />
            <Screen 
                name='forgotPassword' 
                component={ForgotPassword} 
            />
            <Screen 
                name='registerComment' 
                component={RegisterComment} 
            />
            <Screen 
                name='registerAccessibility' 
                component={RegisterAccessibility} 
            />
            <Screen 
                name='screenA'
                component={ScreenA}
            />
            <Screen 
                name='screenB'
                component={ScreenB}
            />
        </Navigator>
    )
}
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ScreenA } from '../screens/screenA';
import { ScreenB } from '../screens/screenB';

const { Screen, Navigator, Group } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator>
            <Screen 
                name='screenA'
                component={ScreenA}
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                name='screenB'
                component={ScreenB}
                options={{
                    title: 'Screen B com parâmetro',
                    headerTitleAlign: 'center',
                }}
            />
        </Navigator>
    )
}
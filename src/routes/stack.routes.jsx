import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Principal } from '../screens/Principal';

const { Screen, Navigator, Group } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator>
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
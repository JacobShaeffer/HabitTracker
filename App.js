import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './Screens/ListScreen';
import NewReminderScreen from './Screens/NewReminderScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

function App() {
	return (
		<SafeAreaProvider>
			<PaperProvider>
				<NavigationContainer>
				{/* <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}> */}
					<Stack.Navigator>
						<Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
						<Stack.Screen name="NewReminder" component={NewReminderScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</SafeAreaProvider>
	);
}

export default App;
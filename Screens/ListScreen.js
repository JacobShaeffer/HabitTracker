import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, NativeModules } from 'react-native';
import { Button, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const SharedStorage = NativeModules.SharedStorage;

const storageKey = '@Daily_Reminders_storage_key';

function ListScreen({ navigation, route }) {
	const [habits, setHabits] = useState([
		'this is a test', 
		'this is the second one',
		{name: 'Go for a run', time: '', halfCredit: ''}
	]);

	useEffect(() => {
		if(route.params?.post){
			var newReminder = route.params?.post
			const currentReminders = habits;
			currentReminders.push(newReminder);
			setHabits(currentReminders);
		}
	}, [route.params?.post]);

	const storeData = async (value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(storageKey, jsonValue);
		} catch (e) {
			// handle failed set
		}
	}

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem(storageKey)
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			// handle failed get
		}
	}

	getData().then((value) => {
		if(value != null){
			setHabits(value)
		}
		console.log('data gotten: ', habits);
	});

	const setWidgetText = () => {
		SharedStorage.set(
			JSON.stringify({text: 'this came from expo'})
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ScrollView>
				{habits.map((reminder, idx) => {
					return(
						<Text key={idx}>{reminder}</Text>
					);
				})}
				<Text>{route.params?.post}</Text>
				{/* <FloatingActionButton onPress={() => navigation.navigate('NewReminder')}/>	 */}
			</ScrollView>
			<Button onPress={setWidgetText}>notification</Button>
			<FAB style={styles.fab} icon='plus' label='' onPress={() => navigation.navigate('NewReminder')}/>
			{/* <StatusBar style='auto'/> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 20,
		right: 0,
		bottom: 0,
	},
});

export default ListScreen;
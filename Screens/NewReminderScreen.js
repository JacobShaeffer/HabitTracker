import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

function ListScreen({ navigation, route }) {
	const [postText, setPostText] = useState(null);

	return (
		<SafeAreaView>
			<TextInput label={'Memo'} value={postText} onChangeText={setPostText}/>	
			<Button 
				mode='contained'
				onPress={() => {
					navigation.navigate({
						name: 'List',
						params: { post: postText},
						merge: true, //TODO: what does this do?
					})
				}} 
			>
				Post	
			</Button>
		</SafeAreaView>
	);
}

export default ListScreen;
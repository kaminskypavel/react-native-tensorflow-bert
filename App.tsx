import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
    data?: string;
}
export default function App(props: Props) {
    return (
        <View style={styles.container}>
            <Text>Please Share a Link (Via The Share Menu on Android) To This App</Text>
            <Text>data : {JSON.stringify(props)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

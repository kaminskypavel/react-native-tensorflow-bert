import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as qna from '@tensorflow-models/qna'

type Props = {
    sharedText?: string;
}

type State = {
    model: any,
    isTFReady: boolean,
    isQnAModelReady: boolean

}


export default class App extends React.Component<Props, State> {
    state = {
        model: null,
        isTFReady: false,
        isQnAModelReady: false
    }


    async componentDidMount() {
        console.log('loading-tf', new Date());

        await tf.ready()
        this.setState({isTFReady: true})

        console.log('done loading-tf', new Date());
        console.log('loading-qna', new Date());

        const model = await qna.load();
        this.setState({isQnAModelReady: true})

        console.log('done loading-qna', new Date());
        this.setState({model})
    }

    render() {
        const {sharedText} = this.props;
        const {isQnAModelReady, isTFReady, model} = this.state

        return (
            <View style={styles.container}>
                {!sharedText &&
                <Text>Please Share a Link (Via The Share Menu on Android)</Text>}
                {!isTFReady && <Text>Loading TensorFlow, Please Wait...</Text>}
                {isTFReady && !isQnAModelReady && <Text>Loading BERT Model, Please Wait...</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

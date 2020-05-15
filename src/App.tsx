import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as qna from '@tensorflow-models/qna'
import QnA from "./components/QnA";
import axios from "axios";

type Props = {
    sharedText?: string;
}

type State = {
    model: any,
    isTFReady: boolean,
    isQnAModelReady: boolean,
    data: string | null

}

export default class App extends React.Component<Props, State> {
    state = {
        model: null,
        isTFReady: false,
        isQnAModelReady: false,
        data: null
    }


    async componentDidMount() {
        console.log(this.state);
        console.log('loading-tf', new Date());

        await tf.ready()
        this.setState({isTFReady: true})

        console.log('done loading-tf', new Date());
        console.log('loading-qna', new Date());

        const model = await qna.load();
        this.setState({isQnAModelReady: true})

        console.log('done loading-qna', new Date());
        this.setState({model})

        console.log("loading data from url");
        const {sharedText} = this.props;
        if (!sharedText)
            return;

        const {data} = await axios.get(`http://boilerpipe-web.appspot.com/extract?url=${encodeURI(sharedText)}&extractor=ArticleExtractor&output=text&extractImages=&token=`);
        this.setState({data})

    }

    render() {
        const {isQnAModelReady, isTFReady, model, data} = this.state

        return (
            <View style={styles.container}>
                {!isQnAModelReady && <ActivityIndicator size="large" color="purple"/>}
                {!isTFReady && <Text>Loading TensorFlow, Please Wait...</Text>}
                {isTFReady && !isQnAModelReady && <Text>Loading BERT Model, Please Wait...</Text>}
                <QnA model={model} data={data}/>
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

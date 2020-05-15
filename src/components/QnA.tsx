import {QuestionAndAnswer} from "@tensorflow-models/qna";
import React from "react";
import {ActivityIndicator, Alert, Button, ScrollView, Text, TextInput, View} from "react-native";

type Props = {
    model: QuestionAndAnswer | null,
    data: string | undefined | null
}

type State = {
    question: string,
    answer: string,
    showModal: boolean
}

export default class QnA extends React.Component<Props, State> {
    state = {
        answer: "",
        question: "Who is Elon Musk?",
        showModal: false
    }

    async componentDidMount() {
        const {model, data} = this.props;
        if (!data || !model)
            return;
    }

    askQuestion = async () => {
        this.setState({
            answer: this.state.question,
            showModal: true
        })

        const {answer, question} = this.state;
        const {model, data} = this.props;

        try {
            console.log(data, question);
            const answers = await model!.findAnswers(question, data!)
            const mostCommonsAnswer = answers.sort((a, b) => b.score - a.score)[0];
            console.log('answers', answers);
            this.setState({answer: mostCommonsAnswer.text})
        } catch (e) {
            console.log(e);
            Alert.alert("Ooops an error occurred, see logs")
        }

    }

    render() {
        const {answer, question, showModal} = this.state
        const {data, model} = this.props;


        if (!model) {
            return <Text>Model is Loading</Text>
        }

        if (!data)
            return (
                <View>
                    <ActivityIndicator size="large" color="green"/>
                    <Text>
                        Loading Data....
                    </Text>
                </View>)


        return <View style={styles.container}>
            <ScrollView style={styles.article}>
                <Text>{data}</Text>
            </ScrollView>

            <View style={styles.answer}>
                <Text>
                    {answer}
                </Text>
            </View>
            <View style={styles.question}>
                <TextInput placeholder={"enter a question"}
                           defaultValue={question}
                           onChangeText={(question) => this.setState({question})}/>

                <Button onPress={() => this.askQuestion()} title="Ask!"/>
            </View>
        </View>
    }
}

const styles = {
    container: {
        flex: 1,
        width: "100%",
        padding: 10
    },
    article: {
        flexGrow: .8

    },
    answer: {
        flexGrow: .1,
        backgroundColor: "#fff2c1"

    },
    question: {
        flexGrow: .1

    }
}

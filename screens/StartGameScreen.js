import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert, useWindowDimensions, ScrollView} from "react-native";
import { useState } from "react";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPickNumber}){

    const [enteredNumber, setEnteredNumber] = useState("");

    //This is for useWindowDimension for making responseive while rotating the phone
    const {width,height} = useWindowDimensions();

    function numberImputHandler(enteredText){
        setEnteredNumber(enteredText)
    }

    function resetInputHandler(){
        setEnteredNumber("");
    }

    function confirmInputHandler(){
        const choosenNumber = parseInt(enteredNumber);

        if(isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99 ){
            Alert.alert("Invalid number!", "Number should be between 1 and 99",[{text:"Okay", style:"destructive", onPress:resetInputHandler}])
            return;
        }
        onPickNumber(choosenNumber);

    }

    const marginTopDistance = height < 380 ? 30 : 60;

    return(
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'} style={styles.screen}>
                <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a Number</InstructionText>

                        <TextInput style={styles.numberInput} maxLength={2} keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
                        autoCapitalize="none" autoCorrect={false} onChangeText={numberImputHandler}
                        value={enteredNumber} 
                        ></TextInput>
                            <View style={styles.buttonsContainer}>
                                <View style={styles.buttonContainer} >
                                    <PrimaryButton onPressButton={resetInputHandler} >Reset</PrimaryButton>
                                </View>
                                <View style={styles.buttonContainer} >
                                <   PrimaryButton onPressButton={confirmInputHandler}>Confirm</PrimaryButton>
                                </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>


    );
}

export default StartGameScreen;

//const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    rootContainer:{
        flex:1,
        //marginTop: deviceHeight < 380 ? 30 : 60,
        alignItems:"center",
        textAlign:"center"

    },
    numberInput:{
        height:50,
        fontSize:32,
        width:50,
        borderBottomColor:Colors.accent5000,
        borderBottomWidth:2,
        color:'#ddb52f',
        marginVertical:8,
        fontWeight:"bold",
        textAlign:"center"
    },
    buttonsContainer:{
        flexDirection:"row"
    },
    buttonContainer:{
        flex: 1
    },
   
})
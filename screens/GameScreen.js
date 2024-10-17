import { View, Text , StyleSheet, Alert, FlatList, ScrollView, useWindowDimensions} from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect, useMemo } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import {Ionicons} from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomNumber(min,max,exclude){
    const rndNum = Math.floor(Math.random() * (max-min)) + min;

    if(rndNum === exclude){

        return generateRandomNumber(min,max,exclude);
    }else{
        return rndNum;
    }
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({userNumber, onGameOver}){


    //const initialGuess = generateRandomNumber(minBoundry,maxBoundry,userNumber)

    const initialGuess = useMemo(() => generateRandomNumber(minBoundry, maxBoundry, userNumber), [minBoundry, maxBoundry, userNumber]);

    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])
    const {width,height} = useWindowDimensions();

    useEffect(() =>{
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    },[currentGuess,userNumber,onGameOver])

    useEffect(() => {
        minBoundry=1,
        maxBoundry=100
    },[])
    

    function nextGuessHandler(direction){
        if(
            (direction === "lower" && currentGuess < userNumber) ||
            (direction === "greater" && currentGuess > userNumber)) {
                Alert.alert("Don't lie", "Not a corect direction!", [{text:"Sorry!", style:"cancel"}])
                return;
        }
        if(direction === "lower"){
            maxBoundry = currentGuess;
            
        }else{
            minBoundry= currentGuess;
        }
        const newRndNumber = generateRandomNumber(minBoundry,maxBoundry,currentGuess)
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
    }

    const guessRoundListLength = guessRounds.length;
    let content =   <> 
                        <NumberContainer>{currentGuess}</NumberContainer>
                        <Card>
                            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
                            <View style={styles.buttonsContainer}>
                                <View style={styles.buttonContainer}>
                                    <PrimaryButton onPressButton={nextGuessHandler.bind(this,"greater")}>
                                        <Ionicons name="add" size={24} color="white" />
                                    </PrimaryButton>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <PrimaryButton  onPressButton={nextGuessHandler.bind(this,'lower')}>
                                        <Ionicons name="remove" size={24} color="white"></Ionicons>    
                                    </PrimaryButton>
                                </View>
                            </View>
                        </Card>   
                    </>

    if(width > 500){
        content = <>
                    <View style={styles.buttonsContainerWide}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPressButton={nextGuessHandler.bind(this,"greater")}>
                                <Ionicons name="add" size={24} color="white" />
                           </PrimaryButton>
                        </View>
                        <NumberContainer>{currentGuess}</NumberContainer>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton  onPressButton={nextGuessHandler.bind(this,'lower')}>
                                        <Ionicons name="remove" size={24} color="white"></Ionicons>    
                                    </PrimaryButton>
                        </View>
                     </View>
                    </>

    }

    return(
        
    <View style={styles.screen}>
    
        <Title>Opponent's Guess</Title>
            {content}

                <View style={styles.listContainer}>
                    {/*guessRounds.map(guessRound =>{
                        return(
                        <Text key={guessRound}>{guessRound}</Text>
                        )
                    })*/
                    <FlatList data={guessRounds}  keyExtractor={(item) => item} renderItem={(itemData) =>{
                        return(
                        //<Text>{itemData.item}</Text>
                        <GuessLogItem guess={itemData.item} roundNumber={guessRoundListLength - itemData.index}></GuessLogItem>
                        )
                    }}
                    nestedScrollEnabled={true}

                    >

                    </FlatList>
                    }
                </View>  
             
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create( {
    screen: {
        flex:1,
        padding:24,
        alignItems:"center"
    },
    buttonsContainer:{
        flexDirection:"row",
        fontFamily:'open-sans',
    },
    buttonContainer:{
        flex: 1
    },
    instructionText:{
        marginBottom:12
    },
    listContainer:{
        flex:1,
        flexDirection:"column",
        padding:16
    }, buttonsContainerWide:{
        flexDirection:"row",
        alignItems:"center"
    }
})
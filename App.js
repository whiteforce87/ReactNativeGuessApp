import { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import {useFonts} from 'expo-font';
//import AppLoading from 'expo-app-loading'; Deprecated
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


export default function App() {

const [userNumber,setUserNumber] = useState();
const [gameIsOver,setGameIsOver] = useState(false);
const [guessRounds, setGuessRounds] = useState(0)

const [fontsLoaded] = useFonts({
  'open-sans':require("./assets/fonts/OpenSans-Regular.ttf"),
  'open-sans-bold':require("./assets/fonts/OpenSans-Bold.ttf")
})


useEffect(() => {
  if (fontsLoaded) {
    SplashScreen.hideAsync(); // Hide the splash screen when fonts are loaded
  }
}, [fontsLoaded]);

if (!fontsLoaded) {
  return null; // Return null until fonts are loaded
}


function pickedNumberHandler(pickedNumber){
  setUserNumber(pickedNumber);
  setGameIsOver(false);

}


function gameOverHandler(numberOfRounds){
  setGameIsOver(true);
  setGuessRounds(numberOfRounds)
}

function startNewGameHandler(){
  setUserNumber(null);
  setGuessRounds(0)
}

let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>


if(userNumber){
  screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
}


if(gameIsOver && userNumber){
  screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}></GameOverScreen>
}



  return (
  <>    
    <StatusBar style='light' />
      <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
        <ImageBackground source={require('./assets/images/background.png')} resizeMode='cover' 
        style={styles.rootScreen} imageStyle={styles.backgroundImage}>
          
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
          
        </ImageBackground>
      </LinearGradient>
  </>

    )  
}

const styles = StyleSheet.create({
  rootScreen:{
    flex:1
  },
  backgroundImage:{
    opacity:0.15
  }
});

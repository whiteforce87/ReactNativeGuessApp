import { View , Image, Text, StyleSheet, Dimensions, useWindowDimensions, ScrollView} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";




function GameOverScreen({roundsNumber, userNumber, onStartNewGame}){

    const {width,height} = useWindowDimensions();


    let imageSize= 300;

    if(width < 300){
        imageSize = 150;
    }

    if (height < 400){
        imageSize= 80;
    }


    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize /2
    }

    return(
    
        <ScrollView style={styles.screen} >
            <View style={styles.root}>
                <Title>Game is Over!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')}></Image>
                </View>
                <View>
                    <Text style={styles.summaryText}> Your Phone needed  
                        <Text style={styles.highliight}> {roundsNumber}</Text> rounds to guess the number <Text style={styles.highliight}>{userNumber}</Text>.
                        </Text>
                        <PrimaryButton onPressButton={onStartNewGame}>Start new Game</PrimaryButton>
                </View>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen;

//const deviceWidth = Dimensions.get("window").width;



const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    root:{
        flex:1,
        padding:24,
        justifyContent:"center",
        alignItems:"center"
    },
    imageContainer:{
        //width:deviceWidth < 380 ? 150: 300,
        //height:deviceWidth < 380 ? 150: 300,
        //borderRadius:deviceWidth < 380 ? 75 : 150,
        borderWidth:3,
        borderColor: Colors.primary800,
        overflow:"hidden",
        margin:36
    },
    image:{
        width:'100%',
        height:'100%'
    },
    summaryText:{
        fontFamily:"open-sans",
        margin:24,
        textAlign:"center",
        justifyContent:"center",
        alignItems:"center"
    },
    highliight:{
        fontFamily:"open-sans-bold"
    }
})
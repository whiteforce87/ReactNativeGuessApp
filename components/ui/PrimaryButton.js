import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({children, onPressButton}){

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} 
            onPress={onPressButton} android_ripple={{color: Colors.primary600}}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}
export default PrimaryButton;

const styles=StyleSheet.create({
    buttonOuterContainer:{
        borderRadius:28,
        margin:4,
        overflow:"hidden"

    },
    buttonInnerContainer:{

        backgroundColor:Colors.primary500,
        paddingVertical:8,
        paddingHorizontal:16,
        elevation:2,
    },
    buttonText:{
        color:"white",
        textAlign:"center"
    },
    pressed:{ //For ripple effect on ios
        opacity:0.75
    }
    
})
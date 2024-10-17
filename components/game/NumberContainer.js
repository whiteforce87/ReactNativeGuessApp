import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({children}){

    return(
        <View style={styles.container}>
            <Text style={styles.nuberText}>{children}</Text>
        </View>
    )

}

export default NumberContainer;


const deviceWith= Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        borderWidth:4,
        borderColor:Colors.accent5000,
        padding:deviceWith < 380 ? 12 : 24 ,
        borderRadius:8,
        margin:deviceWith < 380 ? 12 : 24,
        alignItems:'center',
        justifyContent:"center"
    },
    nuberText:{
            fontFamily:'open-sans-bold',
            color:Colors.accent5000,
            fontSize:deviceWith < 380 ? 28 : 36,
           // fontWeight:"bold"
    }
})
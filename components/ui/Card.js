import { View, StyleSheet, Dimensions } from "react-native";

function Card({children}){
    return(
    <View style={styles.card }>{children}
    </View>
)
}

export default Card;

const deviceWith = Dimensions.get('window').width;


const styles = StyleSheet.create({
    card:{
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal: 24,
        padding: 16,
        marginTop:deviceWith < 380 ? 26 : 36,
        backgroundColor:"#4e0329",
        borderRadius:6,
        elevation: 40, //For Android shadow, rest is for ios,
        shadowColor:"black",
        shadowOffset:{width: 0,height:2},
        shadowRadius:6,
        shadowOpacity:0.25,
    
    }
})
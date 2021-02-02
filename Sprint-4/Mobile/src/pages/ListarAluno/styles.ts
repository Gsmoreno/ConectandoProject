import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#FF0000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 4,
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },

    logout: {
        color: '#FFF',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 15,
    },

    containerVagas: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingBottom: 150,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scroll:{
        paddingTop: 30,
        paddingBottom: 30,
        height: '100%',
    },

    titulo:{
        fontFamily: 'Montserrat_700Bold',
        paddingLeft: 5,
        color: '#6D6969'
    },

    order:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    textSpace:{
        paddingLeft: 5,
        fontFamily: 'NotoSans_400Regular',
        color: '#6D6969'
    },

    modeloVaga: {
        backgroundColor: '#F1EDEE',
        shadowColor: "#000",
        borderRadius: 15,

        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 3,

        width: 300,
        height: 100,
        padding: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
})

export default styles;
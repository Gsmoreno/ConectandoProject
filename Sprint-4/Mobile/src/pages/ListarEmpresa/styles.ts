import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    HeaderE : {
        width: '100%',
        backgroundColor: '#3ABDE6',
        height: '10vh',
    },

    ModeloInicio : {
        marginHorizontal: 'auto',
    },

    ModeloMeio : {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        alignItems: 'center'
    },

    ModeloFim : {
        display: "flex",
        flexDirection: 'row',
        marginTop: 10
    },

    Modelo : {
        width: '80%',
        marginHorizontal: 'auto',
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#E5E5E5'
    },

    Alinhar : {
        display: "flex",
        alignItems: 'center'
    },

    Img : {
        width: 50,
        height: 50,
        backgroundColor: '#000',
        marginRight: 20
    },

    ImgN : {
        width: 20,
        height: 20,
        backgroundColor: '#000',
    },

    EmpresaI : {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '3vh',
        marginHorizontal: 10,
        position: 'absolute'
    },

    MenuEmpresa : {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 'auto',
        alignItems: 'center',
    },

    Foto : {
        display: 'flex',
        flexDirection: 'row', 
    },

    filtro : {
        width: '80vw',
        marginHorizontal: 'auto',
        marginVertical: 10,
    },

    ButtonFiltro : {
        display: 'none',
    },

    button: {
        width: 80,
        height: 30,
        marginVertical: 10,
        backgroundColor: '#E9E9E9',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },

    buttons : {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around"
    },

    espaco : {
        marginLeft: '25vw'
    },

    ListaAlunos : {
        height: '75vh',
        overflow: 'scroll'
    },

    BotaoF : {
        backgroundColor: '#3496c7',
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
        width: 50,
        borderRadius: 5
    },

    Logout : {
        width: '15vw',
        display: "none"
    },

    SelectVagas : {
        marginVertical: 5,
        
    }
})

export default styles
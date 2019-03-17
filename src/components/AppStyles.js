import { StyleSheet } from "react-native";

const softShadow = {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2
}

export const AppColors = {
    background: '#000000',
    foreground: '#ffffff'
};

export const AppFonts = {
    regular: 'Akkurat-Normal',
    bold: 'Akkurat-Bold',
    light: 'Akkurat-Light'
};

const Styles = StyleSheet.create({

    appContainer: {
        flex: 1,
    },

    appHeader: {
        ...softShadow,
        flexDirection: 'column',
        flex: 0,
        height: 100,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: AppColors.background,
        zIndex: 2,
    },

    appFooter: {
        flex: 0,
        height: 60,
        paddingHorizontal: 20,
        backgroundColor: AppColors.background,
    },

    inputContainer: {
        marginBottom: 0,
        flexDirection: 'row',
    },

    inputLabel: {
        color: AppColors.foreground,
        fontSize: 20,
        marginBottom: 10,
        fontFamily: AppFonts.light,
    },

    input: {
        backgroundColor: AppColors.foreground,
        color: AppColors.background,
        padding: 4,
        borderRadius: 3,
        fontSize: 15,
        flex: 1,
        height: 35
    },

    button: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom :55,
        marginLeft :20,
    },

    buttonText: {
        fontFamily: "Navigation",
        fontSize: 35,
        paddingBottom:70,
        color: AppColors.foreground
    },

    map: {
        flex: 1,
    },

    logo: {
        width: 40,
        height: 38,
    },

    logo1: {
        width: 38,
        height: 36,
        padding: 1,
    }

});

export default Styles;

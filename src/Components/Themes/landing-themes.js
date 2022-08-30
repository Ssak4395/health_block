import {createMuiTheme, createTheme} from "@mui/material";

const theme = createMuiTheme({
    shape:{
        borderRadius:30
    },
    typography: {
        fontFamily: [
            'Quicksand',
            'sans-serif',
        ].join(','),
        fontSize:80,
        color:"#FFFFFF",

    },});
export default theme;
import {Button, styled} from "@mui/material";

export const LoginButton = styled(Button)(() => ({
    backgroundColor: "#22223B",
    width: "200px",
    elevation: 24,
    '&:hover': {
        backgroundColor: '#8c8c8c',
        color: '#ffffff',
    },
}));

import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material"

function RequestApproval(){
    return(
        <div>
            <List>
                <ListItem>
                    <ListItemText primary='List Item 1'/>
                </ListItem>
                <ListItem>
                    <ListItemText primary='List Item 2'/>
                </ListItem>
                <ListItemButton component="a" h>
                    <ListItemText primary="Spam" />
                </ListItemButton>
            </List>
        </div>

   );
}

export default RequestApproval;
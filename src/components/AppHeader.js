import React from "react";
import { AppBar, Typography, Toolbar, CssBaseline } from "@material-ui/core";

const AppHeader = () => {
    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h6" className="dodo" style={{ flex: 1 }}>
                    Set Counter
                    </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;
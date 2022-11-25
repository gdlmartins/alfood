import { Link as LinkRouter , Outlet } from "react-router-dom"

import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"




const AdminLayout = ()=>{
return (
<>
<AppBar position="static">
    <Container maxWidth="xl">
        <Toolbar>
            <Typography variant="h6">
                Adminstration
            </Typography>
            <Box>
                <Link component={LinkRouter} to={"/admin/restaurants"}>
                    <Button sx={{ my: 2, color: "white" }}>
                        Restaurants
                    </Button>
                </Link>
                <Link component={LinkRouter} to={"/admin/restaurants/novo"}>
                    <Button sx={{ my: 2, color: "white" }}>
                        New Restaurants
                    </Button>
                </Link>
            </Box>
        </Toolbar>

    </Container>
</AppBar>
<Box>
    <Container
        maxWidth="lg"
        sx={{ mt: 1 }}
    >
       <Outlet/>
    </Container>
</Box>
            </>)
}

export default AdminLayout;

import { AppBar, Button, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { Box, Container, padding } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { httpV2 } from "../../../http";


const FormNewDish = () => {
    const { id } = useParams();
    const navegate = useNavigate();

    const [dish, setDish] = useState<string>("");

    const getDish = () => {
        httpV2.get(`dishes/${id}/`)
            .then((resp) => {
                setDish(resp.data.nome)
            })
            .catch(e => console.log(e))
    }

    const editDish = (nome: string) => {
        httpV2.put(`dishes/${id}/`, { nome })
            .then(() => {
                navegate(`/admin/dishs`);
                // navegate(-1);
            })
    }

    const addDish = (nome: string) => {
        httpV2.post(`dishes/`, { nome })
            .then(() => {
                // navegate(-1);
                navegate(`/admin/dishs`);
                alert("Added")
            })
    }

    const submitHanler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        id ? editDish(dish) : addDish(dish)
    }
    console.log(dish)

    useEffect(() => {
        if (id) {
            getDish();
        }
    }, [id])


    return (

        <Paper>


            <Box
                sx={{
                    margin: '10px Auto',
                    padding:"20px"
                    //     justifyContent: "space-between",
                    //     alignItems: "center",
                    //     width: "500px"
                }}
            >
                <Typography
                component="h3"
                align="center">Formulario Dish</Typography>
                <form
                    onSubmit={(e) => submitHanler(e)}>
                    <TextField
                        fullWidth
                        required
                        variant='standard'
                        value={dish}
                        onChange={(e) => setDish(e.target.value)}
                        margin="dense"
                    />
                    <TextField
                     margin="dense"
                        fullWidth
                        required
                        variant='standard'
                        value={dish}
                        onChange={(e) => setDish(e.target.value)}
                    />
                    <TextField
                     margin="dense"
                        fullWidth
                        required
                        variant='standard'
                        value={dish}
                        onChange={(e) => setDish(e.target.value)}
                    />
                    <TextField
                    type="file"
                     margin="dense"
                        fullWidth
                        required
                        variant='standard'
                        value={dish}
                        onChange={(e) => setDish(e.target.value)}
                    />
                    <Button variant="outlined"
                        fullWidth
                        type="submit"
                    >Submit</Button>
                </form>
            </Box>
        </Paper>

    )

}
export default FormNewDish;


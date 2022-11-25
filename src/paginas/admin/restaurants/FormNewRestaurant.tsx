import { AppBar, Button, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { Box, Container, padding } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { httpV2 } from "../../../http";


const FormNewRestaurant = () => {
    const { id } = useParams();
    const navegate = useNavigate();

    const [restaurant, setRestaurant] = useState<string>("");

    const getRestaurant = () => {
        httpV2.get(`restaurantes/${id}/`)
            .then((resp) => {
                setRestaurant(resp.data.nome)
            })
            .catch(e => console.log(e))
    }

    const editRestaurant = (nome: string) => {
        httpV2.put(`restaurantes/${id}/`, { nome })
            .then(() => {
                navegate(`/admin/restaurants`);
                // navegate(-1);
            })
    }

    const addRestaurant = (nome: string) => {
        httpV2.post(`restaurantes/`, { nome })
            .then(() => {
                // navegate(-1);
                navegate(`/admin/restaurants`);
                alert("Added")
            })
    }

    const submitHanler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        id ? editRestaurant(restaurant) : addRestaurant(restaurant)
    }
    console.log(restaurant)

    useEffect(() => {
        if (id) {
            getRestaurant();
        }
    }, [id])


    return (

                <Paper>
                 

                        <Box 
                        sx={{
                            margin: '10px Auto',
                        //     justifyContent: "space-between",
                        //     alignItems: "center",
                        //     width: "500px"
                        }}
                         >
                            <Typography>Formulario</Typography>
                            <form
                            
                                onSubmit={(e) => submitHanler(e)}>

                                <TextField
                                    required
                                    variant='standard'
                                    value={restaurant}
                                    onChange={(e) => setRestaurant(e.target.value)}
                                />
                                <Button variant="outlined"
                                    type="submit"
                                >Submit</Button>
                            </form>
                        </Box>
                </Paper>

    )

}
export default FormNewRestaurant;


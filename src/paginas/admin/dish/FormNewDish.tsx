import { Button, FormControl, InputLabel, Link, MenuItem, Paper, Select, TabClassKey, TextField, Toolbar, Typography } from "@mui/material";
import { Box, Container, padding } from "@mui/system";
import React, { useState, useEffect } from "react";
import { httpV2 } from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

interface TAG {
    value: "string"
    id: number
}

interface TAGS {
    tags: TAG[]
}

const FormNewDish = () => {
    const [dish, setDish] = useState<string>("");
    const [restaurant, setRestaurant] = useState<IRestaurante[]>([]);
    const [tags, setTags] = useState<TAG[]>();

    const submitHanler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const getCategories = async () => {
        const resp = await httpV2.get<TAGS>("tags/")
        setTags(resp.data.tags)
    }
    const getRestaurantes = async () => {
        const resp = await httpV2.get<IRestaurante[]>("restaurantes/")
        setRestaurant(resp.data)
    }

    useEffect(() => {
        getCategories()
        getRestaurantes()
    }, [])

    return (
        <Paper>
            <Box
                sx={{
                    margin: '10px Auto',
                    padding: "20px"
                }}
            >
                <Typography
                    component="h3"
                    align="center">Formulario Dish</Typography>
                <form
                    onSubmit={(e) => submitHanler(e)}>
                    <TextField
                        placeholder="Dish name"
                        fullWidth
                        required
                        variant='standard'
                        value={dish}
                        onChange={(e) => setDish(e.target.value)}
                        margin="dense"
                    />
                    <FormControl
                        margin="dense"
                        fullWidth>
                        <InputLabel id="Selection">Category</InputLabel>
                        <Select
                            label="Selection"
                            labelId="Selection"
                            placeholder="tag"
                            margin="dense"
                            fullWidth
                            required
                            variant='standard'
                        // value={dish}
                        // onChange={(e) => setDish(e.target.value)}
                        >{tags?.map(tag =>
                            <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>
                        )}
                        </Select></FormControl>
                    <TextField
                        placeholder="Description"
                        margin="dense"
                        fullWidth
                        required
                        variant='standard'
                        value={dish}
                        onChange={(e) => setDish(e.target.value)}
                    />
                    <FormControl
                        margin="dense"
                        fullWidth>
                        <InputLabel id="Restaurante">Restaurante</InputLabel>
                        <Select
                            label="Restaurante"
                            labelId="Restaurante"
                            placeholder="Restaurant"
                            type="file"
                            margin="dense"
                            fullWidth
                            required
                            variant='standard'
                        >
                            {restaurant?.map(tag => <MenuItem
                                key={tag.id}
                                value={tag.id}>
                                {tag.nome}
                            </MenuItem>
                            )}
                            {/* // onChange={(e) => setDish(e.target.value */}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        fullWidth
                        type="file"
                    ></TextField>
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


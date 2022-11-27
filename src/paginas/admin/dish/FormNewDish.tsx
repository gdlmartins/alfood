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
    const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);
    const [tags, setTags] = useState<TAG[]>();
    
    const [dish, setDish] = useState<string>("");
    const [tag , setTag] = useState<string>("");
    const [description , setDescription] = useState<string>("");
    const [restaraunt , setRestaraunt] = useState<string>("");
    const [restarauntNome , setRestarauntNome] = useState<string>("");

    const [imagem , setImagem] = useState<File | null >(null)

    const addDish = (data: FormData)=> {
        httpV2.request({
            url: "pratos/",
            method: "POST",
            headers: {
                "Content-Type" : "multipart/form-data"
            },
            data: data 
        }).then(()=> {
            alert("Adicionado")
            setDish("")
            setDescription("")
            setTag("")
            setRestaraunt("")
        })
        .catch((e)=> console.log(e))
    }
    
    const submitHanler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nome", dish)
        formData.append("tag", tag)
        formData.append("descricao",description )
        formData.append("restaurante",restaraunt )
   
        if(imagem) formData.append("imagem", imagem)

        addDish(formData);
   
    }

    const getCategories = async () => {
        const resp = await httpV2.get<TAGS>("tags/")
        setTags(resp.data.tags)
    }
    const getRestaurantes = async () => {
        const resp = await httpV2.get<IRestaurante[]>("restaurantes/")
        setRestaurants(resp.data)
    }

    const selectImage = (e: React.ChangeEvent<HTMLInputElement> )=>{
        if(e.target.files?.length){
            setImagem(e.target.files[0])
        }else setImagem(null)

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
                    <FormControl fullWidth>
                        <InputLabel id="Selection">Category</InputLabel>
                        <Select
                            label="Selection"
                            labelId="Selection"
                            placeholder="tag"
                            margin="dense"
                            fullWidth
                            required
                            variant='standard'
                            value={tag}
                           onChange={(e) => setTag(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="Restaurante">Restaurante</InputLabel>
                        <Select
                            label="Restaurante"
                            labelId="Restaurante"
                            placeholder="Restaurant"
                            type="file"
                            margin="dense"
                            fullWidth
                            required
                            value={restaraunt}
                            variant='standard'
                            onChange={(e) => {
                                setRestaraunt(e.target.value)
                            }
                            }
                        >
                            {restaurants?.map(restaraunt => <MenuItem
                                key={restaraunt.id}
                                value={restaraunt.id}>
                                {restaraunt.nome}
                            </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <input
                        onChange={ e => selectImage(e)}
                        type="file"
                    ></input>
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


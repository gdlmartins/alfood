import React from "react";
import { Paper, TableRow, TableCell, TableContainer, TableHead, Table, TableBody, Button } from "@mui/material";
import { useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useNavigate } from "react-router-dom";

import {BsTrash} from 'react-icons/bs';
import { httpV2 } from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import { NOMEM } from "dns";


const AdminDishes = () => {
    const navegate = useNavigate();

    const [dishes, setDishes] = useState<IPrato[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const getDishes = () => {
        httpV2.get<IPrato[]>(`pratos/`)
            .then(res => {
                setDishes(res.data)
            })
            .catch(e => console.log(e))
    }

    const getRestaurantes = ()=>{
        httpV2.get<IRestaurante[]>(`restaurantes/`)
          .then(res => setRestaurantes(res.data))
    }
    
    let newdishes: any[] = [];
    dishes.forEach(d => restaurantes.forEach(r =>  {if(r.id === d.restaurante){
        newdishes.push( {...d , restaurante: r.nome})       
    } }))

    const deleteDish = (id: number) => {
        httpV2.delete(`pratos/${id}/`)
            // .then(() => getDishes())
            .then(() => {
                const dishedFiltered  = dishes.filter(r =>  r.id !== id)
                setDishes(dishedFiltered);
            })
    }
 
    React.useEffect(() => {
        getDishes()
        getRestaurantes()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { newdishes?.map(r => (
                        <TableRow key={r.id}>
                            <TableCell >
                                {r.nome}
                            </TableCell>
                            <TableCell >
                                {r.tag}
                            </TableCell>
                            <TableCell >
                                {r.restaurante}
                            </TableCell>
                            <TableCell >
                                <Button
                                    onClick={() => navegate(`/admin/dishes/${r.id}`)}
                                >Edit
                                </Button>
                            </TableCell>
                            <TableCell >
                                <Button
                                    onClick={() => deleteDish(r.id)}
                                ><BsTrash/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminDishes;
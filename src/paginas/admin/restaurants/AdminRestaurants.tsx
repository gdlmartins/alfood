import React from "react";
import { Paper, TableRow, TableCell, TableContainer, TableHead, Table, TableBody, Button } from "@mui/material";
import { useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Link ,useNavigate } from "react-router-dom";

import {BsTrash} from 'react-icons/bs';
import { httpV2 } from "../../../http";


const AdminRestaurants = () => {
    const navegate = useNavigate();

    const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);

    const getRestaurantes = () => {
        httpV2.get<IRestaurante[]>(`restaurantes/`)
            .then(res => {
                setRestaurants(res.data)
            })
            .catch(e => console.log(e))
    }

    const deleteRestaurant = (id: number) => {
        httpV2.delete(`v2/restaurantes/${id}/`)
            // .then(() => getRestaurantes())
            .then(() => {
                const restaurantFiltered  = restaurants.filter(r =>  r.id !== id)
                setRestaurants(restaurantFiltered);
            })
    }
 
    React.useEffect(() => {
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
                    {restaurants?.map(r => (
                        <TableRow key={r.id}>
                            <TableCell >
                                {r.nome}
                            </TableCell>
                            <TableCell >
                                <Button
                                    onClick={() => navegate(`/admin/restaurants/${r.id}`)}
                                >Edit
                                </Button>
                            </TableCell>
                            <TableCell >
                                <Button
                                    onClick={() => deleteRestaurant(r.id)}
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

export default AdminRestaurants;
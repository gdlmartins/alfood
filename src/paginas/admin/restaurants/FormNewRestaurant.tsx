import { Button, TextField } from "@mui/material";
import axios from "axios";
import React ,{useState , useEffect} from "react";
import { useParams } from "react-router";


const FormNewRestaurant  = () =>{
    const  {id} = useParams();

    const [restaurant, setRestaurant] = useState<string>("");


    const editRestaurant  = (nome : string) =>{
        axios.put(`http://localhost:8000/api/v2/restaurantes/${id}/`, {nome})
             .then(()=>alert("edited"))
    } 

    const addRestaurant  = (nome : string) =>{
        axios.post(`http://localhost:8000/api/v2/restaurantes/`, {nome})
             .then(()=>alert("Added"))
    }


    const submitHanler =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        id ? editRestaurant(restaurant) : addRestaurant(restaurant)
    }
    console.log(restaurant)

    useEffect(()=>{
        if(id){
            axios.get(`http://localhost:8000/api/v2/restaurantes/${id}/`)
            .then((resp)=>setRestaurant(resp.data.nome))
            .catch(e => console.log(e))
        }
        
    } ,[id])


    return( 
        <form onSubmit={(e)=>submitHanler(e)}>
            <TextField
            variant='standard'
            value={restaurant}
            onChange={(e)=> setRestaurant(e.target.value)}
            />
            <Button variant="outlined"
            type="submit"
            >Submit</Button>
        </form>
    )

}
export default FormNewRestaurant;


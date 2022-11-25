import { Button, TextField } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { httpV1 } from '../../http';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { IParametrosBusca } from '../../interfaces/IParametros';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';


const ListaRestaurantes = () => {
  const [restaurantesList, setRestauratsList] = useState<IRestaurante[]>([]);
  const [nextPage, setNextPage] = useState<string>('');
  const [previousPage, setPreviousPage] = useState<string>('');
  const [search, setSearch] = useState<string>(''); 
  const [isSearch, setIsSearch] = useState<boolean>(false); 

  const restaurantesAsync = async (page: number) =>
    httpV1
      .get<IPaginacao<IRestaurante>>(
        `restaurantes/`,
      )
      .then(resp => {
        setRestauratsList(resp.data.results)
        setNextPage(resp.data.next)
        setPreviousPage(resp.data.previous)
      })
      .catch(e => console.log(e))

    

  const searchRestaurants = async () => {
   await httpV1.get('restaurantes/', {
      params:{
        search
      }
    }).then((resp)=>{
      setRestauratsList(resp.data.results)
      setNextPage(resp.data.next)
      setPreviousPage(resp.data.previous)
    })
  
  }

  const submitHandler = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    searchRestaurants()
    setSearch("")
    setIsSearch(false);

  }

  useEffect(() => {
    restaurantesAsync(1);
  }, [])

  const seeMore = () => {
    httpV1.get(nextPage)
      .then(resp => {
        setRestauratsList([...restaurantesList, ...resp.data.results])
        setNextPage(resp.data.next)
      }).catch(e => console.log(e))
  }

  return (<section className={style.ListaRestaurantes}>
    <form
      onSubmit={submitHandler}>
      <TextField
        placeholder="Busca restaurantes"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Button
        type="submit"
      >Pesquisar</Button>
    </form>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantesList?.map(item => <Restaurante restaurante={item} key={item.id} />)}
   
    { (nextPage && <button onClick={seeMore}>
      ver mais
    </button>)}
  </section>)
}

export default ListaRestaurantes
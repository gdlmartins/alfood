import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IPrato from '../../interfaces/IPrato';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';


export const BASEURL = `http://localhost:8000/api/v1/`

const ListaRestaurantes = () => {

  const [restaurantesList, setRestauratsList] = useState<IRestaurante[]>([]);
  const [nextPage, setNextPage] = useState<string>('');


  const restaurantesAsync = async (page: number) =>
    axios
      .get<IPaginacao<IRestaurante>>(
        `${BASEURL}restaurantes/`
      )
      .then(resp => {
        setRestauratsList(resp.data.results)
        setNextPage(resp.data.next)
      })
      .catch(e => console.log(e))



  useEffect(() => {
    restaurantesAsync(1);
    
  }, [])

  const seeMore = async () => {
    axios.get(nextPage)
      .then(resp => {
        setRestauratsList([...restaurantesList, ...resp.data.results])
        setNextPage(resp.data.next)
      }).catch(e => console.log(e))
  }


  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantesList?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {nextPage && <button onClick={seeMore}>
      ver mais
    </button>}
  </section>)
}

export default ListaRestaurantes
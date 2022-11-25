import axios from 'axios';
import { useEffect, useState } from 'react';
import { httpV1 } from '../../../http';
import { IPaginacao } from '../../../interfaces/IPaginacao';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [dishsList, setDishsList] = useState<IPrato[]>();
 
  console.log( restaurante)
 
  const pratosList = async () => {
    httpV1
      .get<IPrato[]>(`restaurantes/${restaurante.id}/pratos/`)
      .then(resp => {
        
        setDishsList(resp.data)
        console.log(resp.data)
      })
      .catch(e => console.log(e))

  }

  useEffect(()=>{
    pratosList()
  },[restaurante.id])


  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {dishsList?.map(item => <Prato prato={item} key={item.id} />)}
    </div>
  </section>)
}

export default Restaurante
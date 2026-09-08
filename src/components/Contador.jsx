import {useState} from 'react'

const Contador = () => {

// HOOK- useState - Manipula o estado da variável
const [contador,setContador]=useState(0);

  return (
    <>
      <h1>Contagem Inicial:{contador}</h1>
    <button onClick={()=>setContador(contador +1)}>Aumentar</button>
    </>
  )
}

export default Contador

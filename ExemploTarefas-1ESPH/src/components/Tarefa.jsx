import {useState, useEffect} from 'react'
import Contador from './Contador'
import '../css/estilo.css'

const Tarefa = () => {

    //Hook- useState -Manipula o estado da variável
    const [tarefas,setTarefas]=useState(()=>{
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    const [campo,setCampo]=useState("");

    //HOOK - useEffect - Realiza o efeito colateral, nesse exmeplo
    //vai mostrar a tarefa adicionada em tempo real
    useEffect(()=>{
        localStorage.setItem("item-tarefa",JSON.stringify(tarefas))
    },[tarefas])

    //FUNÇÃO ADICIONAR TAREFA
    const  AdicionarTarefa =(e)=>{
      //Previne que a página se recarregue automaticamente
      e.preventDefault();
      //Valida se o campo estiver vazio
      if(!campo.trim()) return;

      //novo objeto
      const novaTarefa={
        id: Date.now(),
        texto:campo,
      }
      setTarefas([...tarefas,novaTarefa]);
      setCampo('');
    }
    //FUNÇÃO REMOVER TAREFA
    const RemoverTarefa=(id)=>{
      //VERIFICA SE O ID DA TAREFA ATUAL É DIFERENTE DO ID QUE DESEJA APAGAR
      //SE O ID FOR IGUAL(TAREFA QUE DESEJA APAGAR) A CONDIÇÃO RETORNA FALSO 
      //E O ITEM É EXCLUIDO
      const apagarTarefa = tarefas.filter((tarefa)=> tarefa.id !== id);
      setTarefas(apagarTarefa);

    }


  return (
    <div className="todo-container">
      <h1>Minha Lista de Tarefas</h1>
      <form onSubmit={AdicionarTarefa}>
        <input
          type="text"
          value={campo}
          onChange={(e)=>setCampo(e.target.value)}
          placeholder='Digite sua Tarefa'
          className="todo-input"
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tarefas.map((tarefa)=>(
          <li key={tarefa.id}>
            <span>{tarefa.texto}</span>
            <button onClick={()=>RemoverTarefa(tarefa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      {/* COMPARA SE NÃO TIVER TAREFAS DEIXA A MENSAGEM NENHUMA TAREFA SALVA */}
      {tarefas.length === 0 && <p>Nenhuma Tarefa Salva</p>}
      <Contador/>
      
    </div>
  )
}

export default Tarefa

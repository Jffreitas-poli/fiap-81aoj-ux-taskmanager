import { NextPage } from "next";
import { Task } from "../types/Task";

/* eslint-disable @next/next/no-img-element */

type ListProps = {
    tasks : Task[]
}

const List: NextPage<ListProps> = ({
    tasks
}) => {

    return (
        <div className={'container-list' + (tasks && tasks.length > 0 ? '' : ' vazia')}>
            {tasks && tasks.length > 0 
                ?
                    tasks.map(task => <p>{task.name}</p>)
                :
                    <>
                        <img src="/empty-list.svg" alt="Nenhuma tarefa encontrada"/>
                        <p>Você ainda não possui tarefas cadastradas!</p>
                    </>
            }
        </div>
    );
}

export { List }
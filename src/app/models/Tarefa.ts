export interface TarefaListar{
    id?:number;
    titulo: string;
    descricao: string;
    dataConclusao: string;
    status: number;
    prioridade: number;
    projetoId: number;
}


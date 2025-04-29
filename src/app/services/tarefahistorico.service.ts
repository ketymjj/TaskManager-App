import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TarefaHistorico } from '../models/TarefaHistorico';

@Injectable({
  providedIn: 'root'
})
export class TarefahistoricoService {

  private ApiUrl = 'http://localhost:5128/api/tarefahistorico';

  constructor(private http: HttpClient) {}

  // >>>>>>> AQUI O NOVO MÉTODO GET HISTÓRICO <<<<<<
  GetHistoricoPorTarefaId(tarefaId: number): Observable<TarefaHistorico[]> {
    return this.http.get<TarefaHistorico[]>(`${this.ApiUrl}/tarefa/${tarefaId}`);
  }
}

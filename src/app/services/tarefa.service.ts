import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/Response';
import { environment } from '../environments/environment';
import { TarefaListar } from '../models/Tarefa';


@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  ApiUrl = environment.apiURLTarefas;

   constructor(private http : HttpClient) { }


   GetTarefas(): Observable<TarefaListar[]> {
     return this.http.get<TarefaListar[]>(this.ApiUrl);
   }

   DeletarTarefa(id: number): Observable<void> {
     return this.http.delete<void>(`${this.ApiUrl}/${id}`);
   }

   CriarTarefa(projeto: TarefaListar) : Observable<Response<TarefaListar[]>>{
     return this.http.post<Response<TarefaListar[]>>(this.ApiUrl,projeto);
   }


   GetTarefaId(id:number):Observable<TarefaListar>{
     return this.http.get<TarefaListar>(`${this.ApiUrl}/${id}`);
   }

   EditarTarefa(tarefa: TarefaListar): Observable<any> {
     return this.http.put(`${this.ApiUrl}/${tarefa.id}`, tarefa);
   }


}

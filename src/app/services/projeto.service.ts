import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/Response';
import { environment } from '../environments/environment';
import { ProjetoListar } from '../models/Projeto';


@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  ApiUrl = environment.apiURL;

  constructor(private http : HttpClient) { }


  GetProjetos(): Observable<ProjetoListar[]> {
    return this.http.get<ProjetoListar[]>(this.ApiUrl);
  }

  DeletarProjeto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiUrl}/${id}`);
  }

  CriarProjeto(projeto: ProjetoListar) : Observable<Response<ProjetoListar[]>>{
    return this.http.post<Response<ProjetoListar[]>>(this.ApiUrl,projeto);
  }


  GetProjetoId(id:number):Observable<ProjetoListar>{
    return this.http.get<ProjetoListar>(`${this.ApiUrl}/${id}`);
  }

  EditarProjeto(projeto: ProjetoListar): Observable<any> {
    return this.http.put(`${this.ApiUrl}/${projeto.id}`, projeto);
  }

  // GET tarefas por projetoId
  getTarefasPorProjeto(projetoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.ApiUrl}/projeto/${projetoId}`);
  }

}

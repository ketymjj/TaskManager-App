import { Component } from '@angular/core';
import { TarefaListar } from '../../../models/Tarefa';
import { TarefaService } from '../../../services/tarefa.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjetoListar } from '../../../models/Projeto';
import { ProjetoService } from '../../../services/projeto.service';

@Component({
  selector: 'app-home-tarefa',
  standalone: true,
   imports: [RouterModule, CommonModule ],
  templateUrl: './home-tarefa.component.html',
  styleUrl: './home-tarefa.component.scss'
})
export class HomeTarefaComponent {

    tarefas: TarefaListar[] = [];
    tarefasGeral: TarefaListar[] = [];
    projetos: ProjetoListar[] = [];

    projetoId!: number;


    constructor(private servicetarefa:TarefaService, private serviceProjeto:ProjetoService,
       private route: ActivatedRoute){}

       ngOnInit(): void {
        this.route.params.subscribe((params: { [key: string]: string }) => {
          this.projetoId = +params['projetoId']; 
      
          this.serviceProjeto.getTarefasPorProjeto(this.projetoId).subscribe(tarefas => {
            this.tarefas = tarefas;
            this.tarefasGeral = tarefas; 
            console.log('Tarefas:', tarefas);
          });
        });
      }

    search(event:Event){

      const target = event.target as HTMLInputElement;
      const value = target.value.toLowerCase();

      this.tarefas = this.tarefasGeral.filter(tarefa =>{
        return tarefa.titulo.toLowerCase().includes(value);
      })
    }


    deletar(id: number | undefined): void {
      if (id === undefined) {
        console.error('ID inválido para exclusão.');
        return;
      }

      if (confirm('Tem certeza que deseja deletar este tarefa?')) {
        this.servicetarefa.DeletarTarefa(id).subscribe({
          next: () => {
            // Atualize a lista sem precisar recarregar a página inteira
            this.tarefas = this.tarefas.filter(u => u.id !== id);
            console.log('Tarefa deletado com sucesso.');
          },
          error: (err) => {
            console.error('Erro ao deletar tarefa:', err);
            alert('Erro ao deletar tarefa.');
          }
        });
      }
    }
}

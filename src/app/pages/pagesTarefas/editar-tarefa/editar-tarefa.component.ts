import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TarefaListar } from '../../../models/Tarefa';
import { TarefaService } from '../../../services/tarefa.service';
import { FormularioTarefaComponent } from '../../../componentes/formularioTarefa/formulario-tarefa/formulario-tarefa.component';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-editar-tarefa',
    standalone: true,
    templateUrl: './editar-tarefa.component.html',
    styleUrl: './editar-tarefa.component.scss',
    imports: [FormularioTarefaComponent, CommonModule]
})
export class EditarTarefaComponent {
   btnAcao = "Editar";
     descTitulo = "Editar Projeto"
     tarefa!: TarefaListar;
     isEditMode: boolean = true;

     constructor(private tarefaService:TarefaService, private router: Router, private route: ActivatedRoute){}


     ngOnInit(){
         console.log(1)
         const id = Number(this.route.snapshot.paramMap.get('id'))

         this.tarefaService.GetTarefaId(id).subscribe(response => {
             this.tarefa = response;
         });

     }

     editarTarefa(tarefa: TarefaListar): void {
      if (!tarefa.id) {
        console.error('ID da tarefa é obrigatório para edição.');
        return;
      }

      this.isEditMode = true;

      this.tarefaService.EditarTarefa(tarefa).subscribe({
        next: () => {
          console.log('Tarefa editada com sucesso.');
          this.router.navigate(['lista', tarefa.projetoId]);
        },
        error: (err) => {
          const msg = err?.error?.message || err?.message || '';

          if (typeof msg === 'string' && msg.includes('prioridade')) {
            alert('Erro ao editar a tarefa. Tente novamente.');
          } else {
            alert('Erro: A prioridade não pode ser alterada após a criação da tarefa.');
          }
        }
      });
    }

}

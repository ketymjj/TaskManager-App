import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class EditarTarefaComponent implements OnInit {
  btnAcao = "Editar";
  descTitulo = "Editar Tarefa"; // Corrigido: era "Editar Projeto"
  tarefa!: TarefaListar;

  constructor(
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tarefaService.GetTarefaId(id).subscribe({
      next: (response) => {
        this.tarefa = response;
      },
      error: (err) => {
        console.error('Erro ao carregar tarefa:', err);
      }
    });
  }

  editarTarefa(tarefa: TarefaListar): void {
    if (!tarefa.id) {
      console.error('ID da tarefa é obrigatório para edição.');
      return;
    }

    this.tarefaService.EditarTarefa(tarefa).subscribe({
      next: () => {
        alert('Tarefa editada com sucesso.');
        this.router.navigate(['/lista', tarefa.projetoId]);
      },
      error: (err) => {
        const msg = err?.error?.message || err?.message || '';

        if (typeof msg === 'string' && msg.includes('prioridade')) {
          alert('Erro: A prioridade não pode ser alterada após a criação da tarefa.');
        } else {
          alert('Erro ao editar a tarefa. Tente novamente.');
        }
        console.error('Erro ao editar tarefa:', err);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TarefaListar } from '../../../models/Tarefa';
import { TarefaService } from '../../../services/tarefa.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjetoListar } from '../../../models/Projeto';
import { ProjetoService } from '../../../services/projeto.service';
import { TruncatePipe } from '../../home/home.component';

@Component({
  selector: 'app-home-tarefa',
  standalone: true,
  imports: [RouterModule, CommonModule, TruncatePipe], // Adicione o TruncatePipe aqui
  templateUrl: './home-tarefa.component.html',
  styleUrl: './home-tarefa.component.scss'
})
export class HomeTarefaComponent implements OnInit {

  tarefas: TarefaListar[] = [];
  tarefasGeral: TarefaListar[] = [];
  projetoId!: number;

  constructor(
    private servicetarefa: TarefaService,
    private serviceProjeto: ProjetoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projetoId = Number(this.route.snapshot.paramMap.get('projetoId'));
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.serviceProjeto.getTarefasPorProjeto(this.projetoId).subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
        this.tarefasGeral = tarefas;
        console.log('Tarefas:', tarefas);
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
      }
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.tarefas = this.tarefasGeral.filter(tarefa => {
      return tarefa.titulo.toLowerCase().includes(value);
    });
  }

  deletar(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID inválido para exclusão.');
      return;
    }

    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      this.servicetarefa.DeletarTarefa(id).subscribe({
        next: () => {
          this.tarefas = this.tarefas.filter(u => u.id !== id);
          this.tarefasGeral = this.tarefasGeral.filter(u => u.id !== id);
          alert('Tarefa deletada com sucesso.');
        },
        error: (err) => {
          console.error('Erro ao deletar tarefa:', err);
          alert('Erro ao deletar tarefa.');
        }
      });
    }
  }

  // Métodos auxiliares para o visual de post-it
  getPriorityColor(prioridade: number): string {
    switch(prioridade) {
      case 2: return 'pink'; // Alta
      case 1: return 'yellow'; // Média
      case 0: return 'green'; // Baixa
      default: return 'blue';
    }
  }

  getStatusText(status: number): string {
    switch(status) {
      case 0: return 'Pendente';
      case 1: return 'Em Progresso';
      case 2: return 'Concluída';
      case 3: return 'Cancelada';
      default: return 'Desconhecido';
    }
  }

  getPrioridadeText(prioridade: number): string {
    switch(prioridade) {
      case 0: return 'Baixa';
      case 1: return 'Média';
      case 2: return 'Alta';
      default: return 'Desconhecida';
    }
  }

  // Método para obter ícone baseado na prioridade
  getPriorityIcon(prioridade: number): string {
    switch(prioridade) {
      case 2: return '🔥'; // Alta
      case 1: return '⚡'; // Média
      case 0: return '🌱'; // Baixa
      default: return '📌';
    }
  }

  // Método para obter ícone baseado no status
  getStatusIcon(status: number): string {
    switch(status) {
      case 0: return '⏳'; // Pendente
      case 1: return '🔄'; // Em Progresso
      case 2: return '✅'; // Concluída
      case 3: return '❌'; // Cancelada
      default: return '❓';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjetoListar } from '../../models/Projeto';
import { ProjetoService } from '../../services/projeto.service';

// Pipe integrado diretamente no componente
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, completeWords: boolean = true, ellipsis: string = '...'): string {
    if (!value) return '';

    if (value.length <= limit) return value;

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
      if (limit === -1) limit = 50;
    }

    return `${value.substr(0, limit)}${ellipsis}`;
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, TruncatePipe], // Adicionei o TruncatePipe aqui
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  projetos: ProjetoListar[] = [];
  projetosGeral: ProjetoListar[] = [];

  constructor(private serviceProjeto: ProjetoService){}

  ngOnInit(): void {
    this.serviceProjeto.GetProjetos().subscribe({
      next: response => {
        this.projetos = response;
        this.projetosGeral = response;
      },
      error: err => {
        console.error('Erro ao carregar projeto:', err);
      }
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.projetos = this.projetosGeral.filter(projeto => {
      return projeto.nome.toLowerCase().includes(value);
    });
  }

  carregarTarefas(projetoId: number) {
    this.serviceProjeto.getTarefasPorProjeto(projetoId).subscribe(tarefas => {
      this.projetos = tarefas;
      console.log(tarefas);
    });
  }

  deletar(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID inválido para exclusão.');
      return;
    }

    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      this.serviceProjeto.DeletarProjeto(id).subscribe({
        next: () => {
          this.projetos = this.projetos.filter(u => u.id !== id);
          alert('Projeto deletado com sucesso.');
        },
        error: (err) => {
          const mensagemErro = err.error?.message || 'Erro ao deletar projeto.';

          if (mensagemErro.includes('tarefas pendentes')) {
            alert('Este projeto não pode ser deletado pois possui tarefas pendentes.');
          } else {
            alert(mensagemErro);
          }

          console.error('Erro ao deletar projeto:', err);
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../../services/tarefa.service';
import { TarefaListar } from '../../../models/Tarefa';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioTarefaComponent } from "../../../componentes/formularioTarefa/formulario-tarefa/formulario-tarefa.component";
import { ProjetoService } from '../../../services/projeto.service';

@Component({
  selector: 'app-cadastro-tarefa',
  standalone: true,
  templateUrl: './cadastro-tarefa.component.html',
  styleUrl: './cadastro-tarefa.component.scss',
  imports: [FormularioTarefaComponent]
})
export class CadastroTarefaComponent implements OnInit {

  btnAcao = "Cadastrar";
  descTitulo = "Cadastrar Tarefa";
  tarefas: TarefaListar[] = [];
  projetoId!: number;

  constructor(
    private tarefaService: TarefaService,
    private router: Router,
    private serviceProjeto: ProjetoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

  // Tente todas as possibilidades
  this.projetoId = Number(this.route.snapshot.paramMap.get('projetoId')) ||
                   Number(this.route.snapshot.paramMap.get('id')) ||
                   Number(this.route.snapshot.params['projetoId']) ||
                   Number(this.route.snapshot.params['id']) ||
                   Number(this.route.snapshot.queryParams['projetoId']) ||
                   Number(this.route.snapshot.queryParams['id']);

  console.log('Projeto ID capturado:', this.projetoId);

  if (this.projetoId && !isNaN(this.projetoId)) {
    this.carregarTarefas();
  } else {
    console.error('Projeto ID inválido:', this.projetoId);
    // Redirecionar para evitar erro
    this.router.navigate(['/']);
  }

    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.serviceProjeto.getTarefasPorProjeto(this.projetoId).subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
      }
    });
  }

  private parseDateBrToIso(dateStr: string): string {
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
  }

  criarTarefa(tarefa: TarefaListar) {  // Corrigido o nome do método
    tarefa.projetoId = this.projetoId;

    // Converte a data apenas se ela estiver no formato dd/MM/yyyy
    if (typeof tarefa.dataConclusao === 'string' && tarefa.dataConclusao.includes('/')) {
      tarefa.dataConclusao = this.parseDateBrToIso(tarefa.dataConclusao);
    }

    console.log('Tarefa convertida:', tarefa);

    this.tarefaService.CriarTarefa(tarefa).subscribe({
      next: () => this.router.navigate(['/lista', tarefa.projetoId]),
      error: (err) => {
        const msg = err?.error;

        if (typeof msg === 'string' && msg.includes('limite')) {
          alert('Erro: O projeto já possui o número máximo de 20 tarefas.');
        } else {
          alert('Erro ao criar tarefa. Tente novamente.');
        }
      }
    });
  }
}

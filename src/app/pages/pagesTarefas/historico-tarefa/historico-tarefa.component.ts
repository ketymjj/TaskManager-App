import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TarefaHistorico } from '../../../models/TarefaHistorico';
import { TarefahistoricoService } from '../../../services/tarefahistorico.service';
import { TarefaListar } from '../../../models/Tarefa';
import { TarefaService } from '../../../services/tarefa.service';


@Component({
  selector: 'app-historico-tarefa',
  standalone: true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './historico-tarefa.component.html',
  styleUrl: './historico-tarefa.component.scss'
})
export class HistoricoTarefaComponent implements OnInit {
   @Input() dadosTarefa : TarefaListar | null = null
  tarefaId!: number;
  historicos: TarefaHistorico[] = [];
  loading: boolean = true;
  erro: string = '';
  projetoId: any;

  constructor(
    private route: ActivatedRoute,
    private tarefahistoricoService: TarefahistoricoService,
    private router: Router,
    private tarefaService:TarefaService
  ) {}

  ngOnInit(): void {
    this.tarefaId = Number(this.route.snapshot.paramMap.get('id'));

    this.tarefaService.GetTarefaId(this.tarefaId).subscribe({
      next: (tarefa) => {
        this.projetoId = tarefa.projetoId;
        this.carregarHistorico();
      },
      error: (err) => {
        console.error('Erro ao buscar tarefa', err);
        this.erro = 'Erro ao buscar dados da tarefa.';
        this.loading = false;
      }
    });
  }

carregarHistorico(): void {
  this.tarefahistoricoService.GetHistoricoPorTarefaId(this.tarefaId)
    .subscribe({
      next: (data) => {
        this.historicos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar histórico', err);
        this.erro = 'Erro ao carregar histórico da tarefa.';
        this.loading = false;
      }
    });
}

  voltar(): void {
      this.router.navigate(['/lista', this.projetoId]);
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TarefaHistorico } from '../../../models/TarefaHistorico';
import { TarefahistoricoService } from '../../../services/tarefahistorico.service';
import { TarefaListar } from '../../../models/Tarefa';


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

  constructor(
    private route: ActivatedRoute,
    private tarefahistoricoService: TarefahistoricoService
  ) {}

  ngOnInit(): void {
    this.tarefaId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarHistorico();
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
}

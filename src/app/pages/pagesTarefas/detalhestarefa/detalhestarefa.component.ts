import { Component, OnInit } from '@angular/core';
import { TarefaListar } from '../../../models/Tarefa';
import { TarefaService } from '../../../services/tarefa.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhestarefa',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './detalhestarefa.component.html',
  styleUrl: './detalhestarefa.component.scss'
})
export class DetalhestarefaComponent implements OnInit {

  tarefa!: TarefaListar;

  constructor(
    private tarefaService: TarefaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
}

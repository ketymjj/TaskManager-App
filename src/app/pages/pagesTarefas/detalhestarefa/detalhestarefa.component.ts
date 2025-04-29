import { Component } from '@angular/core';
import { TarefaListar } from '../../../models/Tarefa';
import { TarefaService } from '../../../services/tarefa.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalhestarefa',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detalhestarefa.component.html',
  styleUrl: './detalhestarefa.component.scss'
})
export class DetalhestarefaComponent {

  tarefa!:TarefaListar;

    constructor(private tarefaService: TarefaService, private route: ActivatedRoute){}

    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'))

      this.tarefaService.GetTarefaId(id).subscribe(response => {
        this.tarefa = response;
      })
    }
}

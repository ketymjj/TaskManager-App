import { Component } from '@angular/core';
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
export class CadastroTarefaComponent {

    btnAcao= "Cadastrar";
    descTitulo = "Cadastrar Tarefa";

    tarefas: TarefaListar[] = [];
    projetoId!: number; // <- guarda o ID para uso em outros métodos

    constructor(private tarefaService: TarefaService, private router: Router, private serviceProjeto:ProjetoService,
           private route: ActivatedRoute){}


           ngOnInit() {
            this.projetoId = Number(this.route.snapshot.paramMap.get('id'));
            this.serviceProjeto.getTarefasPorProjeto(this.projetoId).subscribe(tarefas => {
              this.tarefas = tarefas;
            });
          }

 // ✅ método da classe, sem `function`
 private parseDateBrToIso(dateStr: string): string {
  const [day, month, year] = dateStr.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
}

criarFatura(tarefa: TarefaListar) {
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

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TarefaListar } from '../../../models/Tarefa';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-tarefa',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-tarefa.component.html',
  styleUrl: './formulario-tarefa.component.scss'
})
export class FormularioTarefaComponent implements OnInit {
  @Input() btnAcao!: string;
  @Input() descTitulo!: string;
  @Input() dadosTarefa: TarefaListar | null = null;
  @Output() onSubmit = new EventEmitter<TarefaListar>();
  @Input() projetoId!: number; // Adicione esta linha

  tarefaForm!: FormGroup;
  postItColor: string = 'blue'; // Cor padrão

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.tarefaForm = new FormGroup({
      id: new FormControl(this.dadosTarefa ? this.dadosTarefa.id : 0),
      titulo: new FormControl(this.dadosTarefa ? this.dadosTarefa.titulo : ''),
      descricao: new FormControl(this.dadosTarefa ? this.dadosTarefa.descricao : ''),
      dataConclusao: new FormControl(this.dadosTarefa ? this.dadosTarefa.dataConclusao : ''),
      status: new FormControl(this.dadosTarefa ? this.dadosTarefa.status : 'Pendente'),
      prioridade: new FormControl(this.dadosTarefa ? this.dadosTarefa.prioridade : 'Baixa'),
      projetoId: new FormControl(this.dadosTarefa ? this.dadosTarefa.projetoId : 0),
    });

    // Define a cor inicial baseada na prioridade
    this.updatePostItColor(this.tarefaForm.value.prioridade);

    // Escuta mudanças no campo de prioridade para atualizar a cor
    this.tarefaForm.get('prioridade')?.valueChanges.subscribe((prioridade) => {
      this.updatePostItColor(prioridade);
    });

  }


  // Método para determinar a cor do post-it baseado na prioridade
  updatePostItColor(prioridade: string): void {
    switch(prioridade) {
      case 'Alta':
        this.postItColor = 'pink';
        break;
      case 'Media':
        this.postItColor = 'yellow';
        break;
      case 'Baixa':
        this.postItColor = 'green';
        break;
      default:
        this.postItColor = 'blue';
    }
  }

  // E adicione o método:
voltar() {
  this.router.navigate(['/lista', this.projetoId]);
}

  submit() {
    this.onSubmit.emit(this.tarefaForm.value);
  }
}

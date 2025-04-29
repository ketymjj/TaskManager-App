import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TarefaListar } from '../../../models/Tarefa';
import { FormGroup, FormControl, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-tarefa',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-tarefa.component.html',
  styleUrl: './formulario-tarefa.component.scss'
})
export class FormularioTarefaComponent {
  @Input() btnAcao!:string;
  @Input() descTitulo!:string;
  @Input() dadosTarefa : TarefaListar | null = null
  @Output() onSubmit = new EventEmitter<TarefaListar>();


  tarefaForm!:FormGroup;

  ngOnInit(): void {

    console.log(3)

    this.tarefaForm = new FormGroup({

        id: new FormControl(this.dadosTarefa ? this.dadosTarefa.id : 0),
        titulo: new FormControl(this.dadosTarefa ? this.dadosTarefa.titulo :''),
        descricao: new FormControl(this.dadosTarefa ? this.dadosTarefa.descricao :''),
        dataConclusao: new FormControl(this.dadosTarefa ? this.dadosTarefa.dataConclusao :''),
        status: new FormControl(this.dadosTarefa ? this.dadosTarefa.status : 0),
        prioridade: new FormControl(this.dadosTarefa ? this.dadosTarefa.prioridade : 0),
        projetoId: new FormControl(this.dadosTarefa ? this.dadosTarefa.projetoId : 0),
    });
  }

  submit(){
    this.onSubmit.emit(this.tarefaForm.value);
  }
}

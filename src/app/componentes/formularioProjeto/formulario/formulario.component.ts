import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjetoListar } from '../../../models/Projeto';



@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit{
  @Input() btnAcao!:string;
  @Input() descTitulo!:string;
  @Input() dadosProjeto : ProjetoListar | null = null
  @Output() onSubmit = new EventEmitter<ProjetoListar>();


  projetoForm!:FormGroup;


  ngOnInit(): void {

    console.log(3)

    this.projetoForm = new FormGroup({
        id: new FormControl(this.dadosProjeto ? this.dadosProjeto.id : 0),
        nome: new FormControl(this.dadosProjeto ? this.dadosProjeto.nome :''),
        descricao: new FormControl(this.dadosProjeto ? this.dadosProjeto.descricao :''),
    });
  }

  get f(): any {
    return this.projetoForm.controls;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  submit(){
    this.onSubmit.emit(this.projetoForm.value);
  }

}

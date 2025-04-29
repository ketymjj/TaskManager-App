import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoListar } from '../../models/Projeto';
import { ProjetoService } from '../../services/projeto.service';
import { FormularioComponent } from '../../componentes/formularioProjeto/formulario/formulario.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormularioComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  btnAcao= "Cadastrar";
  descTitulo = "Cadastrar Projeto";

  constructor(private projetoService: ProjetoService, private router: Router){}

  criarProjeto(projeto: ProjetoListar) {

    

  this.projetoService.CriarProjeto(projeto).subscribe({
    next: () => this.router.navigate(['/']),
    error: (err) => console.error('Erro ao criar usuário:', err)
  });
}

}

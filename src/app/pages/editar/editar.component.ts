import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjetoListar } from '../../models/Projeto';
import { ProjetoService } from '../../services/projeto.service';
import { FormularioComponent } from '../../componentes/formularioProjeto/formulario/formulario.component';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormularioComponent, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent implements OnInit {

  btnAcao = "Editar";
  descTitulo = "Editar Projeto"
  projeto!: ProjetoListar;

  constructor(private projetoService:ProjetoService, private router: Router, private route: ActivatedRoute){}


  ngOnInit(){
      console.log(1)
      const id = Number(this.route.snapshot.paramMap.get('id'))

      this.projetoService.GetProjetoId(id).subscribe(response => {
          this.projeto = response;
      });

  }

  editarProjeto(projeto: ProjetoListar): void {
    if (!projeto.id) {
      console.error('ID do projeto é obrigatório para edição.');
      return;
    }

    this.projetoService.EditarProjeto(projeto).subscribe({
      next: () => {
        console.log('Projeto editado com sucesso.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao editar peojeto:', err);
      }
    });
  }

}

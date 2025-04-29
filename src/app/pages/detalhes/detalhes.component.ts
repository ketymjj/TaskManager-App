import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjetoListar } from '../../models/Projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent implements OnInit {

  projeto!:ProjetoListar;

  constructor(private projetoService: ProjetoService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.projetoService.GetProjetoId(id).subscribe(response => {
      this.projeto = response;
    })
  }

}

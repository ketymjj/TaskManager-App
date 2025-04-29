import { Routes } from "@angular/router";
import { CadastroComponent } from "./pages/cadastro/cadastro.component";
import { DetalhesComponent } from "./pages/detalhes/detalhes.component";
import { EditarComponent } from "./pages/editar/editar.component";
import { HomeComponent } from "./pages/home/home.component";
import { HomeTarefaComponent } from "./pages/pagesTarefas/home-tarefa/home-tarefa.component";
import { CadastroTarefaComponent } from "./pages/pagesTarefas/cadastro-tarefa/cadastro-tarefa.component";
import { EditarTarefaComponent } from "./pages/pagesTarefas/editar-tarefa/editar-tarefa.component";
import { DetalhestarefaComponent } from "./pages/pagesTarefas/detalhestarefa/detalhestarefa.component";
import { HistoricoTarefaComponent } from "./pages/pagesTarefas/historico-tarefa/historico-tarefa.component";

export const routes: Routes = [
  {path:'cadastro', component: CadastroComponent},
  {path:'', component: HomeComponent},
  {path:'editar/:id', component: EditarComponent},
  {path:'detalhes/:id', component: DetalhesComponent},

  { path: 'lista/:projetoId', component: HomeTarefaComponent },

    { path: 'listatarefa/:id', component: HomeTarefaComponent},

      {path:'cadastroTarefa', component: CadastroTarefaComponent},
      {path:'editarTarefa/:id', component: EditarTarefaComponent},
      {path:'detalhesTarefa/:id', component: DetalhestarefaComponent},

      {path:'cadastroTarefa/:id', component: CadastroTarefaComponent},
      { path: 'historicoTarefa/:id', component: HistoricoTarefaComponent }

];

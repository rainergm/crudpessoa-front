import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PessoaListComponent } from './pessoa-list.component';
import { PessoaCadastroComponent } from './pessoa-cadastro.component';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { CalcularIdadePipe } from 'src/app/shared/calcular-idade.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: PessoaListComponent},
      { path: 'cadastro', component: PessoaCadastroComponent},
      { path: 'cadastro/:id', component: PessoaCadastroComponent}
    ])
  ],
  declarations: [
    PessoaListComponent,
    PessoaCadastroComponent,
    CalcularIdadePipe
  ],
  providers: [
    PessoaService
  ]
})
export class PessoaModule { }

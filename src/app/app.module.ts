import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PessoaModule } from 'src/app/pessoa/pessoa.module';
import { PessoaListComponent } from 'src/app/pessoa/pessoa-list/pessoa-list.component';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'listar', loadChildren: './pessoa/pessoa.module#PessoaModule' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

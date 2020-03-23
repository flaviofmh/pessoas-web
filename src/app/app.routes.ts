import { PessoaNewComponent } from './components/pessoa-new/pessoa-new.component';
import { PessoaComponent } from './components/pessoa/pessoa.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const ROUTES: Routes = [
    { path : '', component: HomeComponent },
    { path : 'pessoa', component: PessoaComponent},
    { path : 'pessoa-new', component: PessoaNewComponent},
    { path : 'pessoa-new/:id', component: PessoaNewComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
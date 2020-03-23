import { Pessoa } from './../model/pessoa.model';
import { HELP_PESSOA_API } from './helppessoa.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  createOrUpdate(pessoa: Pessoa) {
    if(pessoa.id != null) {
      return this.http.put(`${HELP_PESSOA_API}/pessoa/${pessoa.id}`, pessoa);
    } else {
      return this.http.post(`${HELP_PESSOA_API}/pessoa`, pessoa);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${HELP_PESSOA_API}/pessoa/${page}/${count}`);
  }

  findById(id: number) {
    return this.http.get(`${HELP_PESSOA_API}/pessoa/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${HELP_PESSOA_API}/pessoa/${id}`);
  }
}

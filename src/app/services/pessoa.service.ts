import { Pessoa } from './../model/pessoa.model';
import { HELP_PESSOA_API } from './helppessoa.api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  createOrUpdate(pessoa: Pessoa) {
    if(pessoa.id != null) {
      return this.http.put(`${HELP_PESSOA_API}/pessoas/${pessoa.id}`, pessoa);
    } else {
      return this.http.post(`${HELP_PESSOA_API}/pessoas`, pessoa);
    }
  }

  findAll(page: number, count: number) {
    const params = new HttpParams().set('page', page.toString()).set('count', count.toString());
    return this.http.get(`${HELP_PESSOA_API}/pessoas`, { params });
  }

  findById(id: number) {
    return this.http.get(`${HELP_PESSOA_API}/pessoas/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${HELP_PESSOA_API}/pessoas/${id}`);
  }
}

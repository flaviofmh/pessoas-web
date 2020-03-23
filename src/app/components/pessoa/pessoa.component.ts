import { PessoaService } from './../../services/pessoa.service';
import { DialogService } from './../../dialog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  page: number=0;
  count: number=5;
  pages: Array<number>;
  message: any;
  classCss: {} = {};
  listPessoas=[];

  constructor(
    private dialogService: DialogService,
    private pessoaService: PessoaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.pessoaService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listPessoas = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  edit(id: number) {
    this.router.navigate(['/pessoa-new', { id: id}]);
  }

  delete(id: number) {
    this.dialogService.confirm(' Deseja excluir esse registro? ')
      .then((candelete:boolean) => {
        if(candelete) {
          this.message = {};
          this.pessoaService.delete(id).subscribe((responseApi:ResponseApi) => {
            this.showMessage({
              type: 'Excluido com sucesso',
              text: 'Registro excluido'
            });
            this.findAll(this.page, this.count);
          }, err => {
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
          });
        }
      })
  }

  setNextPage(event:any) {
    event.preventDefault();
    if(this.page + 1 < this.pages.length) {
      this.page = this.page + 1;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event:any) {
    event.preventDefault();
    if(this.page > 0) {
      this.page = this.page - 1;
      this.findAll(this.page, this.count);
    }
  }

  setPage(i,event:any) {
    event.preventDefault();
    this.page = i;
    this.findAll(this.page, this.count);
  }

  private showMessage(message: {type: string, text: string}) : void {
    this.message = message; 
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string) : void {
    this.classCss = {
      'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }

}

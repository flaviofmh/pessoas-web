import { Pessoa } from './../../model/pessoa.model';
import { ResponseApi } from './../../model/response-api';
import { PessoaService } from './../../services/pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-pessoa-new',
  templateUrl: './pessoa-new.component.html',
  styleUrls: ['./pessoa-new.component.css']
})
export class PessoaNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  pessoa = new Pessoa(null, '', '', '', '', new Date());
  message: any;
  classCss: {};
  image: {};

  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute
  ) {

   }

  ngOnInit(): void {
    let id : number = this.route.params['id'];
    if(id && id != null) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.pessoaService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.pessoa = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type: string, text: string}) : void {
    this.message = message; 
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  register() {
    this.message = {};
    this.pessoa.foto = this.image;
    this.pessoaService.createOrUpdate(this.pessoa).subscribe((responseApi: ResponseApi) => {
      this.pessoa = new Pessoa(null, '', '', '', '', new Date());
      let pessoaRetorno : Pessoa = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'sucess',
        text: `Registered ${pessoaRetorno.nome} successfully`
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private buildClasses(type: string) : void {
    this.classCss = {
      'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }

  getFormGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group' : true,
      'has-error' : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    };
  }

  changeListener($event) : void {
    var file:File = $event.target.files[0];

    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

}

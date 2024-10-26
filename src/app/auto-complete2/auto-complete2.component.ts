import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { Produto } from '../shared/models/produto.model';
import { ProdutoService } from '../shared/services/produto.service';

@Component({
  selector: 'app-auto-complete2',
  standalone: true,
  imports: [FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatAutocompleteModule,
            ReactiveFormsModule,
            AsyncPipe,
            CommonModule],
  templateUrl: './auto-complete2.component.html',
  styleUrl: './auto-complete2.component.scss'
})
export class AutoComplete2Component implements OnInit {

  form! : FormGroup;
  filteredOptions!: Observable<Produto[]>;
  produtos : Produto[] = [];

  constructor(private readonly produtoService : ProdutoService,
              private readonly formBuilder : FormBuilder
  ){ }

  ngOnInit(): void {
    //Crio o formulario
    this.form = this.formBuilder.group({
      nomeCompleto : [''],
    })
    //Pesquiso os produtos
    this.produtoService.getAll().subscribe(
      res => {
        this.produtos = res;
      }
    )
    //Observable do campo para pesquisar
    this.filteredOptions = this.form.get('nomeCompleto')!.valueChanges.pipe(
      startWith(''),
      map(sel => {
        return this.filtrar(sel)}
      )
    )
  }
  //Função de Filtrar
  filtrar(sel: string | number) : Produto[]{
    if(typeof sel === 'number'){
      return this.produtos.filter(prod => prod.id === sel);
    }
    return this.produtos.filter(prod => prod.nome.toUpperCase().includes(sel.toUpperCase()))
  }
  //Função para mostrar o selecionado
  displayFn(id: number): string {
    return this.produtos.filter(res => res.id === id).map(res => res.nome)[0];
  }

}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProdutoService } from '../shared/services/produto.service';
import { Produto } from '../shared/models/produto.model';

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class AutoCompleteComponent {
  form! : FormGroup;
  filteredOptions!: Observable<Produto[]>;
  produto?: Produto;

  constructor(
    private readonly produtoService: ProdutoService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.form = this.formBuilder.group({
      nome: ['']
      // teste: this.formBuilder.group({
      //   nome2: ['']
      // })
    })

    this.filteredOptions = this.form.get('nome')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((res) =>{
        if(typeof res === 'string'){
          return this.produtoService.getByName(res)
        }
          return this.produtoService.getByName(res.nome);
      })
    );

  }

  displayFn(produto: Produto): string {
    return produto && produto.nome ? produto.nome : '';
  }

}

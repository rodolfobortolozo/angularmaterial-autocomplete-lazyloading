import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Produto } from '../models/produto.model';
import mockData from '../../../../db/mock_data.json'

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor() { }

  getAll() : Observable<Produto[]>{
    return of(mockData);
  }

  getByName(name: string) : Observable<Produto[]>{
    console.log(name);
    const mock = mockData as Produto[];
    const result = mock.filter(prod => prod.nome.toUpperCase().includes(name.toUpperCase()));

    return of(result)
    .pipe(
      delay(1000)
    );
  }
}

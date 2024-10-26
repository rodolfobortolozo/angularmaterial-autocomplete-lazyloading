import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AutoCompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  router = inject(Router);

  autoCompleteLazy(){
    this.router.navigate(['/auto'])
  }
  
  autoComplete(){
    this.router.navigate(['/auto2'])
  }
}

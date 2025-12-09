import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-errors',
  templateUrl: './server-errors.component.html',
  styleUrls: ['./server-errors.component.css']
})
export class ServerErrorsComponent {
  protected error = signal<any>(null);
  private router = inject(Router);
  protected showDetails = signal(false);

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { error: any };
    console.log(state.error);
  }

  toggleDetails() {
    this.showDetails.update(value => !value);
  }
}

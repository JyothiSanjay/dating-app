import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    console.log('createToastContainer()....');

    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    }
  }

  private showToast(message: string, type: string, duration = 5000) {
    console.log('showToast().....'+type+'...');

    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', type, 'shadow-lg');
    toast.innerHTML = `
        <span>${message}</span>
        <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    })

    toastContainer.append(toast);
    console.log(duration);

    setTimeout(() => {

      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.showToast(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.showToast(message, 'alert-error', duration);
  }

  info(message: string, duration?: number) {
    this.showToast(message, 'alert-info', duration);
  }
  warning(message: string, duration?: number) {
    this.showToast(message, 'alert-warning', duration);
  }
}

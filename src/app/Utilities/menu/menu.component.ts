import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.closeAllDropdowns();
    }
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget as HTMLElement;
    const dropdownMenu = target.nextElementSibling as HTMLElement;

    if (dropdownMenu) {
      const isOpen = dropdownMenu.classList.contains('show');
      this.closeAllDropdowns();

      if (!isOpen) {
        this.renderer.addClass(dropdownMenu, 'show');
      }
    }
  }

  closeAllDropdowns(): void {
    const dropdowns = this.elRef.nativeElement.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach((dropdown: HTMLElement) => {
      this.renderer.removeClass(dropdown, 'show');
    });
  }
}



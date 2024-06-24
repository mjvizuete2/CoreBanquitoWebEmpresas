import { Component, ElementRef, Renderer2, HostListener, OnInit  } from '@angular/core';
import { OnBoardingService } from 'src/app/Services/onboardingService';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit  {
  termsAccepted: boolean = false;
  usuario:any;
  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private onBoardingService:OnBoardingService,
    private authService:AuthService
  ) {this.usuario = this.authService.getUser();}

  ngOnInit(): void {
    // this.onBoardingService.termsAccepted$.subscribe(accepted => {
    //   this.termsAccepted = accepted;
    // });
  }

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
    const dropdowns = this.elRef.nativeElement.querySelectorAll(
      '.dropdown-menu.show'
    );
    dropdowns.forEach((dropdown: HTMLElement) => {
      this.renderer.removeClass(dropdown, 'show');
    });
  }
}

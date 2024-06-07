import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenRecaudoComponent } from './orden-recaudo.component';

describe('OrdenRecaudoComponent', () => {
  let component: OrdenRecaudoComponent;
  let fixture: ComponentFixture<OrdenRecaudoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenRecaudoComponent]
    });
    fixture = TestBed.createComponent(OrdenRecaudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

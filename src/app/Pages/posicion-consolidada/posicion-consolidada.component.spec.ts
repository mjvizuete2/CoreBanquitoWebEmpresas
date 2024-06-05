import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicionConsolidadaComponent } from './posicion-consolidada.component';

describe('PosicionConsolidadaComponent', () => {
  let component: PosicionConsolidadaComponent;
  let fixture: ComponentFixture<PosicionConsolidadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosicionConsolidadaComponent]
    });
    fixture = TestBed.createComponent(PosicionConsolidadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

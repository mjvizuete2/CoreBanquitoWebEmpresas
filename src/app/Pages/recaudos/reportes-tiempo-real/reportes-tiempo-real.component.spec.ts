import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesTiempoRealComponent } from './reportes-tiempo-real.component';

describe('ReportesTiempoRealComponent', () => {
  let component: ReportesTiempoRealComponent;
  let fixture: ComponentFixture<ReportesTiempoRealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesTiempoRealComponent]
    });
    fixture = TestBed.createComponent(ReportesTiempoRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

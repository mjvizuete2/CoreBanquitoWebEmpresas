import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesDiariosComponent } from './reportes-diarios.component';

describe('ReportesDiariosComponent', () => {
  let component: ReportesDiariosComponent;
  let fixture: ComponentFixture<ReportesDiariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesDiariosComponent]
    });
    fixture = TestBed.createComponent(ReportesDiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

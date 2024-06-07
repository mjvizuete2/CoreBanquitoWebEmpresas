import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCobrosComponent } from './reportes-cobros.component';

describe('ReportesCobrosComponent', () => {
  let component: ReportesCobrosComponent;
  let fixture: ComponentFixture<ReportesCobrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesCobrosComponent]
    });
    fixture = TestBed.createComponent(ReportesCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCobroComponent } from './orden-cobro.component';

describe('OrdenCobroComponent', () => {
  let component: OrdenCobroComponent;
  let fixture: ComponentFixture<OrdenCobroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenCobroComponent]
    });
    fixture = TestBed.createComponent(OrdenCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

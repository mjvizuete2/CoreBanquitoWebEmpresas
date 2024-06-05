import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperaContraComponent } from './recupera-contra.component';

describe('RecuperaContraComponent', () => {
  let component: RecuperaContraComponent;
  let fixture: ComponentFixture<RecuperaContraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperaContraComponent]
    });
    fixture = TestBed.createComponent(RecuperaContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

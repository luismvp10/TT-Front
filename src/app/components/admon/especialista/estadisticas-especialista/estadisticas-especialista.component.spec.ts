import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasEspecialistaComponent } from './estadisticas-especialista.component';

describe('EstadisticasEspecialistaComponent', () => {
  let component: EstadisticasEspecialistaComponent;
  let fixture: ComponentFixture<EstadisticasEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorEspecialistaComponent } from './contenedor-especialista.component';

describe('ContenedorEspecialistaComponent', () => {
  let component: ContenedorEspecialistaComponent;
  let fixture: ComponentFixture<ContenedorEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

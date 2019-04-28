import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorAdminComponent } from './contenedor-administrador.component';

describe('ContenedoradminComponent', () => {
  let component: ContenedorAdminComponent;
  let fixture: ComponentFixture<ContenedorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

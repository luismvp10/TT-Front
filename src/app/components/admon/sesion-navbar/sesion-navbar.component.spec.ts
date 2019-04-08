import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionNavbarComponent } from './sesion-navbar.component';

describe('SesionNavbarComponent', () => {
  let component: SesionNavbarComponent;
  let fixture: ComponentFixture<SesionNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

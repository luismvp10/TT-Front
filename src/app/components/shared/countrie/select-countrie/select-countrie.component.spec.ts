import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCountrieComponent } from './select-countrie.component';

describe('SelectCountrieComponent', () => {
  let component: SelectCountrieComponent;
  let fixture: ComponentFixture<SelectCountrieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCountrieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCountrieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

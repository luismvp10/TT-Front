import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubshipmentComponent } from './select-subshipment.component';

describe('SelectSubshipmentComponent', () => {
  let component: SelectSubshipmentComponent;
  let fixture: ComponentFixture<SelectSubshipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSubshipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSubshipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

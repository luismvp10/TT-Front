import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSelectComponent } from './loading-select.component';

describe('LoadingSelectComponent', () => {
  let component: LoadingSelectComponent;
  let fixture: ComponentFixture<LoadingSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

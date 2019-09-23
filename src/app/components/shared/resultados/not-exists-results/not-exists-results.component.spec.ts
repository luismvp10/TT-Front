import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotExistsResultsComponent } from './not-exists-results.component';

describe('NotExistsResultsComponent', () => {
  let component: NotExistsResultsComponent;
  let fixture: ComponentFixture<NotExistsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotExistsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotExistsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

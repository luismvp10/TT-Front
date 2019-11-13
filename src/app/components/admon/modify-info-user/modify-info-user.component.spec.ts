import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInfoUserComponent } from './modify-info-user.component';

describe('ModifyInfoUserComponent', () => {
  let component: ModifyInfoUserComponent;
  let fixture: ComponentFixture<ModifyInfoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyInfoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
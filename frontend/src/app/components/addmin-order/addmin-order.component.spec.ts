import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddminOrderComponent } from './addmin-order.component';

describe('AddminOrderComponent', () => {
  let component: AddminOrderComponent;
  let fixture: ComponentFixture<AddminOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddminOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddminOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

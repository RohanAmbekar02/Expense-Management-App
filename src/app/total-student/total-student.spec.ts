import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalStudent } from './total-student';

describe('TotalStudent', () => {
  let component: TotalStudent;
  let fixture: ComponentFixture<TotalStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

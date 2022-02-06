import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydownloadsComponent } from './mydownloads.component';

describe('MydownloadsComponent', () => {
  let component: MydownloadsComponent;
  let fixture: ComponentFixture<MydownloadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydownloadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydownloadedbooksComponent } from './mydownloadedbooks.component';

describe('MydownloadedbooksComponent', () => {
  let component: MydownloadedbooksComponent;
  let fixture: ComponentFixture<MydownloadedbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydownloadedbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydownloadedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

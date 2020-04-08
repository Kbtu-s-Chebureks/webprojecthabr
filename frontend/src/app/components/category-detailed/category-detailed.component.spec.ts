import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailedComponent } from './category-detailed.component';

describe('CategoryDetailedComponent', () => {
  let component: CategoryDetailedComponent;
  let fixture: ComponentFixture<CategoryDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

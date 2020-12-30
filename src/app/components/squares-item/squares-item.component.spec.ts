import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquaresItemComponent } from './squares-item.component';

describe('SquaresItemComponent', () => {
  let component: SquaresItemComponent;
  let fixture: ComponentFixture<SquaresItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquaresItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquaresItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

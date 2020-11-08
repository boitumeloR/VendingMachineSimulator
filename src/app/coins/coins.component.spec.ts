import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsComponent } from './coins.component';

describe('CoinsComponent', () => {
  let component: CoinsComponent;
  let fixture: ComponentFixture<CoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should read coins', () => {
    expect(component.coinData).toBeTruthy();
  });

  it ('should read 4 coins', () => {
    fixture.detectChanges();
    expect(component.coinData.length).toBe(4);
  });
});

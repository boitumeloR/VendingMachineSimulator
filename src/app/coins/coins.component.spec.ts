import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

import { CoinsComponent } from './coins.component';

describe('CoinsComponent', () => {
  let component: CoinsComponent;
  let fixture: ComponentFixture<CoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsComponent ],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [DataService]
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
    expect(fixture.componentInstance.coinData).toBeTruthy();
  });

  it ('should read 4 coins', () => {
    fixture.detectChanges();
    expect(component.coinData.length).toBe(4);
  });
});

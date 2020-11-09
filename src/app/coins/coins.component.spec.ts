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

  it ('should have loading as true, while fetching data', () => {
    expect(component.loading).toBe(true);
  });

  it ('should have 4 mock coins', () => {
    expect(component.mockData.length).toBe(4);
  });

  it ('should have a refresh coins button', () => {
    const ref = fixture.nativeElement.querySelector('.refreshCoins');
    expect(ref).toBeTruthy();
  });

});

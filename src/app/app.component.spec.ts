import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it ('should have a I/O pool', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const pool = fixture.nativeElement.querySelector('.purchasePool');
    expect(pool).toBeTruthy();
  });

  it ('should have a refresh all button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const refresh = fixture.nativeElement.querySelector('.refreshAll');
    expect(refresh).toBeTruthy();
  });
  it ('should start with no money tendered', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.amountTendered).toEqual(0);
  });
});

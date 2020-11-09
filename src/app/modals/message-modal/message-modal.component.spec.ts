import { Inject } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MessageModalComponent } from './message-modal.component';

describe('MessageModalComponent', () => {
  let component: MessageModalComponent;
  let fixture: ComponentFixture<MessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageModalComponent ],
      imports: [],
      providers: [MAT_DIALOG_DATA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

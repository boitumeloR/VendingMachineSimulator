import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Coin, DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: []
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get 4 coins from the api', () => {
    service.GetAllCoins().subscribe(coins => {
      expect(coins.length).toEqual(4);
    });
  });

  it('should get products coins from the api', () => {
    service.GetProducts().subscribe(prod => {
      expect(prod.length).toEqual(9);
    });
  });
});

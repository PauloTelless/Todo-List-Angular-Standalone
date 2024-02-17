import { TestBed } from '@angular/core/testing';

import { TodoSignalsService } from './todo-list.service';

describe('TodoListService', () => {
  let service: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTarefaComponent } from './home-tarefa.component';

describe('HomeTarefaComponent', () => {
  let component: HomeTarefaComponent;
  let fixture: ComponentFixture<HomeTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTarefaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

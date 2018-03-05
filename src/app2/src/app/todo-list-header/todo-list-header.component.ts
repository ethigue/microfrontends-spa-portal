import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Todo } from '../todo/todo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent {

  newTodo: Todo = new Todo();
  extraTitle: string = '';

  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.extraTitle = params['extraTitle'];
    });
  }

  addTodo() {
    this.add.emit(this.newTodo);
    this.newTodo = new Todo();
  }
}

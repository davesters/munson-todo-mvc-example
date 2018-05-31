import { Service } from 'munson';
import * as randomstring from 'randomstring';

import Todo from '../Models/Todo';

@Service
class DatabaseService {
	private _todos: Todo[] = [];

	public activeCount(): number {
		return this._todos.filter(todo => !todo.completed).length;
	}

	public count(): number {
		return this._todos.length;
	}

	public getTodos(filter: string): Todo[] {
		switch (filter) {
		case 'active':
			return this._todos.filter(todo => !todo.completed);
		case 'completed':
			return this._todos.filter(todo => todo.completed);
		default:
			return this._todos;
		}
	}

	public addTodo(todo: Todo) {
		this._todos.push({
			id: randomstring.generate(12),
			title: todo.title,
			completed: false,
			isEditing: false,
		});
	}

	public setEditing(id: string) {
		const todoIndex = this._todos.findIndex(todo => todo.id === id);
		if (todoIndex === -1) {
			return;
		}

		this._todos[todoIndex].isEditing = true;
	}

	public updateTodo(id: string, title: string) {
		const todoIndex = this._todos.findIndex(todo => todo.id === id);
		if (todoIndex === -1) {
			return;
		}

		this._todos[todoIndex].title = title;
		this._todos[todoIndex].isEditing = false;
	}

	public toggleTodo(id: string) {
		const todoIndex = this._todos.findIndex(todo => todo.id === id);
		if (todoIndex === -1) {
			return;
		}

		this._todos[todoIndex].completed = !this._todos[todoIndex].completed;
	}

	public deleteTodo(id: string) {
		const todoIndex = this._todos.findIndex(todo => todo.id === id);
		if (todoIndex === -1) {
			return;
		}

		this._todos.splice(todoIndex, 1);
	}
}

export default DatabaseService;

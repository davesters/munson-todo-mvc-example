import { Controller, HttpController, Get, Post, Bind } from 'munson';

import Config from '../Config';
import DatabaseService from '../Services/DatabaseService';
import Todo from '../Models/Todo';

@Controller
class TodosController extends HttpController {

	private _database: DatabaseService;
	private _config: Config;

	constructor(config: Config, databaseService: DatabaseService) {
		super();

		this._config = config;
		this._database = databaseService;
	}

	@Get('/')
	public index(action?: string, id?: string, filter?: string) {
		if (action === 'edit' && id) {
			this._database.setEditing(id);
		}

		const todoFilter = filter || 'all';
		const todos = this._database.getTodos(todoFilter);

		this.response.render('index', {
			todos,
			activeCount: this._database.activeCount(),
			filter: todoFilter,
			count: this._database.count(),
		});
	}

	@Post('/todos')
	public add(@Bind todo: Todo) {
		this._database.addTodo(todo);
		this.response.redirect(302, '/');
	}

	@Post('/todos/:id')
	public edit(id: string, method: string, title?: string) {
		if (method === 'put' && title) {
			this._database.updateTodo(id, title);
		}

		if (method === 'delete') {
			this._database.deleteTodo(id);
		}

		this.response.redirect(302, '/');
	}

	@Post('/todos/:id/status')
	public status(id: string) {
		this._database.toggleTodo(id);
		this.response.redirect(302, '/');
	}
}

export default TodosController;

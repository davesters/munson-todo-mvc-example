import { Controller, HttpController, Get, NotFoundHandler, ErrorHandler } from 'munson';

@Controller
class MainController extends HttpController {

	@Get('/throwanerror')
	public throwError() {
		throw new Error('This route always throws an error');
	}

	@NotFoundHandler
	public notFound() {
		this.response.render('404');
	}

	@ErrorHandler
	public error(error: Error) {
		this.response.render('500', { error });
	}
}

export default MainController;

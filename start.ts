import * as path from 'path';
import * as nunjucks from 'express-nunjucks';

import { App, Container, ConfigurationBuilder } from 'munson';
import DatabaseService from './Services/DatabaseService';
import Config from './Config';

const config = new ConfigurationBuilder<Config>()
	.withFile(path.join(__dirname, '/../config.json'))
	.build();

const app = new App(config);

const njk = nunjucks(app.express(), {
	watch: true,
	noCache: true,
	autoescape: true,
});

Container.bind<DatabaseService>('DatabaseService', DatabaseService, Container.SINGLETON);
Container.bindInstance<Config>('Config', config);

app.start()
	.then(() => {
		console.log('Server listening on port %d', config.port);
	});

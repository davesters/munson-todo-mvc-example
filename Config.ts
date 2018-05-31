import { AppConfiguration, Service } from 'munson';

@Service
export default class Config extends AppConfiguration {
	public foo: string;
}

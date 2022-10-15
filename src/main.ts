import { NestFactory } from '@nestjs/core';
require('dotenv').config({ path: '.env' });
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn'],
	});
	const whitelist = [
		'http://localhost:8080',
		'http://localhost:8100',
		'http://localhost:4200',
		,
		'http://localhost:3000',
	];
	const options = {
		origin: (origin, callback) => {
			if (whitelist.includes(origin) || !origin) {
				callback(null, true);
			} else {
				callback(new Error('not allowed'));
			}
		},
	};

	app.enableCors(options);

	await app.listen(3000);
}
bootstrap();

import { faker } from '@faker-js/faker';
import { config } from '../config';

export const createRandomEntities = (actionId) => {
	return {
		actionId,
		username: faker.internet.userName(),
		email: faker.internet.email(),
		avatar: faker.image.avatar(),
		password: faker.internet.password(),
		birthdate: faker.date.birthdate(),
		registeredAt: faker.date.past(),
		'access-token': config.NODEREST_AUTH_KEY,
	};
};

export const createFakerEntities = (count, actionId) => {
	const users = [];
	for (let i = 0; i < count; i++) {
		users.push(createRandomEntities(actionId));
	}
	return users;
};

export const seedData = {
	entries: [
		{
			description: 'pending -lorem ipsum dolor sit amet',
			createdAt: Date.now(),
			status: 'pending'
		},
		{
			description: 'in-progress lorem ipsum dolor sit amet',
			createdAt: Date.now() - 1000,
			status: 'in-progress'
		},
		{
			description: 'finishes lorem ipsum dolor sit amet',
			createdAt: Date.now() - 10000,
			status: 'finished'
		}
	]
};

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoose, disconnectFromMongoose } from '../../db/db';
import EntryModel from '../../models/EntryModel';
import { seedData } from '../../db/see-data';

type Data = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (process.env.NODE_ENV === 'production') {
		return res.status(401).json({ message: 'No tiene acceso a este servicio' });
	}
	await connectToMongoose();

	// eliminar todas las entradas
	await EntryModel.deleteMany();
	await EntryModel.insertMany(seedData.entries);

	await disconnectFromMongoose();
	res.status(200).json({ message: 'finalizado cool' });
}

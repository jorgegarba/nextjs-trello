import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoose, disconnectFromMongoose } from '../../../db/db';
import EntryModel from '../../../models/EntryModel';
import { IEntry } from '../../../models/EntryModel';

type Data =
	| {
			message: string;
	  }
	| IEntry[]
	| IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getEntries(res);
		case 'POST':
			return postEntries(req, res);
		default:
			return res.status(400).json({ message: 'Example' });
	}
}

const getEntries = async (res: NextApiResponse<Data>) => {
	await connectToMongoose();
	const entries = await EntryModel.find().sort({ createdAt: 'ascending' });
	await disconnectFromMongoose();
	res.status(200).json(entries);
};

const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { description = '' } = req.body;
	try {
		await connectToMongoose();
		const newEntry = new EntryModel({ description, createdAt: Date.now() });
		newEntry.save();
		await disconnectFromMongoose();
		return res.status(201).json(newEntry);
	} catch (error) {
		await disconnectFromMongoose();
		console.log(error);
		return res.status(500).json({ message: 'Algo salió mal, revisar consola' });
	}
};

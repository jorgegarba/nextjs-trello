import type { NextApiRequest, NextApiResponse } from 'next';
import { IEntry } from '../../../models/EntryModel';
import EntryModel from '../../../models/EntryModel';
import { connectToMongoose, disconnectFromMongoose } from '../../../db/db';
import mongoose from 'mongoose';

type Data =
	| {
			message: string;
	  }
	| IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getEntryById(req, res);
		case 'PUT':
			return udapteEntry(req, res);
		default:
			return res.status(400).json({ message: 'el método no existe' });
	}
}
const getEntryById = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { id } = req.query;

	await connectToMongoose();
	const entryFound = await EntryModel.findById(id);

	if (!mongoose.isValidObjectId(id))
		return res.status(404).json({ message: 'bad request' });

	if (entryFound) {
		res.status(200).json(entryFound!);
	} else {
		await disconnectFromMongoose();
		res.status(404).json({ message: 'bad request' });
	}
};

const udapteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await connectToMongoose();
	const entryFound = await EntryModel.findById(id);

	if (!mongoose.isValidObjectId(id))
		return res.status(404).json({ message: 'bad request' });

	if (entryFound) {
		const {
			description = entryFound.description,
			status = entryFound.description
		} = req.body;
		try {
			const updatedEntry = await EntryModel.findByIdAndUpdate(
				id,
				{ description, status },
				{ runValidators: true, new: true }
			);
			res.status(200).json(updatedEntry!);
		} catch (error) {
			res.status(404).json({ message: 'bad request' });
			disconnectFromMongoose();
		}
	} else {
		await disconnectFromMongoose();
		res.status(404).json({ message: 'bad request' });
	}
};

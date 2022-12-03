import { isValidObjectId } from 'mongoose';
import EntryModel from '../models/EntryModel';
import { connectToMongoose, disconnectFromMongoose } from './db';
import { IEntry } from '../models/EntryModel';

export const getEntryById = async (id: string): Promise<IEntry | null> => {
	if (!isValidObjectId(id)) return null;
	await connectToMongoose();
	const entry = await EntryModel.findById(id).lean();
	await disconnectFromMongoose();
	return JSON.parse(JSON.stringify(entry));
};

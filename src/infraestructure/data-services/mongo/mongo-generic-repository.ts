import { Model } from 'mongoose';
import { IGenericRepository } from '../../../shared/Core/iRepository';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
	private _repository: Model<T>;
	private _populateOnFind: string[];

	constructor(repository: Model<T>, populateOnFind: string[] = []) {
		this._repository = repository;
		this._populateOnFind = populateOnFind;
	}

	getAll(): Promise<T[]> {
		return this._repository.find().populate(this._populateOnFind).exec();
	}

	get(id: any): Promise<T> {
		return this._repository.findOne({ id: id }).exec();
	}

	query(queryObject: object): Promise<T[]> {
		return this._repository
			.find(queryObject)
			.populate(this._populateOnFind)
			.exec();
	}

	create(item: T): Promise<T> {
		return this._repository.create(item);
	}

	update(id: string, item: T) {
		return this._repository.findOneAndUpdate({ id: id }, item, {
			returnOriginal: false,
		});
	}
}

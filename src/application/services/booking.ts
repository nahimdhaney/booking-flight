import { Booking } from "src/domain/booking/model";
import { IGenericRepository } from "src/shared/Core/iRepository";

export abstract class IDataServices {
    abstract authors: IGenericRepository<Booking>;
}
import { v4 as uuidv4 } from 'uuid';


export interface DomainEvent {
    name: string;
    createdAt: Date;
  }
import { v4 as uuid } from 'uuid';
import { Datetype } from '../Rules/dateType';


export abstract class DomainEvent {
    id:uuid;
    name: string;
    createdAt: Datetype;
    
    /**
     * DomainEvent
     */
    public DomainEvent(createdAt: Datetype) {
    this.id=uuid();
    this.createdAt= createdAt;
    }
  }
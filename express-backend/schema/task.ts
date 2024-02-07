import { v4 as uuidv4 } from 'uuid';

export class Task {
  id: string;
  name: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;

  constructor(name: string, details: string) {
    this.id = uuidv4();
    this.name = name;
    this.details = details;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deleted = false;
  }
}

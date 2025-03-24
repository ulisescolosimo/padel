declare module 'mongoose' {
  export interface Document {
    _id: any;
  }
  export namespace Types {
    class ObjectId {
      toString(): string;
    }
  }
  export interface Model<T extends Document> {
    findById(id: string): Promise<T | null>;
    find(): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
  }
  export function model<T extends Document>(name: string, schema: any): Model<T>;
  export namespace models {
    function Tournament(): Model<ITournament>;
  }
  export class Schema {
    constructor(definition: any, options?: any);
    Types: {
      ObjectId: typeof Types.ObjectId;
      String: any;
      Number: any;
      Date: any;
      Boolean: any;
      Mixed: any;
    };
  }
} 
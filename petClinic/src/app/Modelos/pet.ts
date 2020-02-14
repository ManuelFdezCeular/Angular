import { Visit } from './visit';
import { Owner } from './owner';
import { Pettype } from './pettype';

export class Pet {
    id:number;
    name:string;
    birthDate:Date;
    type:Pettype;
    owner:Owner;
    visits:Visit[];
}

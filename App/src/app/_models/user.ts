import { Photo } from './Photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActiv: Date;
    photoUrl: string;
    city: string;
    country: string;
    interest?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}

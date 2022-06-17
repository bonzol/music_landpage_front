import { Song } from "./song";

export interface Album {
    title : string,
    date : Date,
    displayDate: string,
    img : string,
    link : string,
    songs : Song[],
    id:string
}

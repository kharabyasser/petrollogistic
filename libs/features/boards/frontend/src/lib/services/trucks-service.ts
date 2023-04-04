import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Truck } from '../domain/truck';

const GET_TRUCKS = gql`{
  trucks {
    id,
    name,
    number,
    description,
    trucksLicense,
    trailersLicense,
    permit,
    latitude,
    longtitude,
    system
  }
}
`

@Injectable()
export class TrucksService {

  constructor(private apollo: Apollo) { }

  getTrucks(): Observable<Truck[]> {
    return this.apollo.watchQuery<{ trucks: Truck[] }>({
      query: GET_TRUCKS
    }).valueChanges.pipe(map(result => result.data.trucks));
  }
}
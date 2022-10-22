import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { DeliveryRequest } from '../domain/delivery-request';

const GET_DELIVERY_REQUESTS = gql`
{
    deliveryRequests {
      id
    }
}`

@Injectable()
export class DeliveryRequestService {

  constructor(private apollo: Apollo) {}

  getDeliveryRequests() : Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery({
        query: GET_DELIVERY_REQUESTS
    }).valueChanges;
  }
}

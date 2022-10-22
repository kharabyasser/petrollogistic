import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { DeliveryRequest } from '../domain/deliveryrequest';

const GET_DELIVERY_REQUESTS = gql`
{
    deliveryRequests {
      id,
      source,
      targetDate,
      isUrgent,
      purchaseOrder,
      rank
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

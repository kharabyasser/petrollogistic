import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { DeliveryRequest } from '../domain/deliveryrequest';

const GET_DELIVERY_REQUESTS = gql`
{
  deliveryRequests {
    id,
    tags,
    purchaseOrder,
    shipToAccount {
      name,
      phoneNumber,
      address {
        addressLine1,
        addressLine2,
        city,
        province,
        postalCode,
        country
      }
    },
    destinationContainers {
      id,
      currentPercentage,
      product {
        number,
        description,
      },
      requestedAmount,
      requestedAmountUnit
    },
    creationDate,
    targetDate,
    rank,
    dispatchStatus,
    dispatchedToTruck {
      name
    },
    dispatchDate
  }
}`

@Injectable()
export class DeliveryRequestService {

  constructor(private apollo: Apollo) { }

  getDeliveryRequests(): Observable<DeliveryRequest[]> {
    return this.apollo.watchQuery<{ deliveryRequests : DeliveryRequest[] }>({
      query: GET_DELIVERY_REQUESTS
    }).valueChanges.pipe(map(result => result.data.deliveryRequests));
  }
}

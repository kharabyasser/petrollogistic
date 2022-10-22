import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DeliveryRequest } from '../domain/delivery-request';

@Injectable()
export class DeliveryRequestService {

  private deliveryRequests: DeliveryRequest[] = [];

  constructor(private apollo: Apollo) {}

  getDeliveryRequests() : DeliveryRequest[] {
    this.apollo.watchQuery({
        query: gql`
        {
            deliveryRequests {
              id
            }
        }`
    })
    .valueChanges.subscribe((result: any) => {
        this.deliveryRequests = result.data?.deliveryRequests
    })

    return this.deliveryRequests;
  }
}

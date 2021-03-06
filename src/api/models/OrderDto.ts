/* tslint:disable */
/* eslint-disable */
/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    AddressDto,
    UserDto,
} from './';

/**
 * 
 * @export
 * @interface OrderDto
 */
export interface OrderDto {
    /**
     * 
     * @type {AddressDto}
     * @memberof OrderDto
     */
    address: AddressDto;
    /**
     * 
     * @type {number}
     * @memberof OrderDto
     */
    deliveryDateId: number;
    /**
     * 
     * @type {string}
     * @memberof OrderDto
     */
    deliveryType: OrderDtoDeliveryTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof OrderDto
     */
    paymentType: OrderDtoPaymentTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof OrderDto
     */
    // quantity: number;
    products: Array<ProductDto>;
    /**
     * 
     * @type {UserDto}
     * @memberof OrderDto
     */
    user: UserDto;
}

export interface ProductDto {
    id: number;
    quantity: number;
}

/**
* @export
* @enum {string}
*/
export enum OrderDtoDeliveryTypeEnum {
    DELIVER = 'DELIVER',
    PICKUP = 'PICK_UP',
    MEETUP = 'MEET_UP'
}
/**
* @export
* @enum {string}
*/
export enum OrderDtoPaymentTypeEnum {
    CASH = 'CASH',
    GCASH = 'GCASH'
}



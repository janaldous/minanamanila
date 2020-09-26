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
    UserDto,
} from './';

/**
 * 
 * @export
 * @interface OrderConfirmation
 */
export interface OrderConfirmation {
    /**
     * 
     * @type {Date}
     * @memberof OrderConfirmation
     */
    deliveryDate: Date;
    /**
     * 
     * @type {number}
     * @memberof OrderConfirmation
     */
    orderNumber: number;
    /**
     * 
     * @type {string}
     * @memberof OrderConfirmation
     */
    orderStatus: OrderConfirmationOrderStatusEnum;
    /**
     * 
     * @type {UserDto}
     * @memberof OrderConfirmation
     */
    user: UserDto;
}

/**
* @export
* @enum {string}
*/
export enum OrderConfirmationOrderStatusEnum {
    REGISTERED = 'REGISTERED',
    COOKING = 'COOKING',
    OTW = 'OTW',
    DELIVERED = 'DELIVERED'
}



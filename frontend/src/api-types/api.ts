/* tslint:disable */
/* eslint-disable */
/**
 * supplios API Documentation
 * API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface CarFiltersOptionsDto
 */
export interface CarFiltersOptionsDto {
    /**
     * 
     * @type {Array<number>}
     * @memberof CarFiltersOptionsDto
     */
    'prices': Array<number>;
    /**
     * 
     * @type {Array<string>}
     * @memberof CarFiltersOptionsDto
     */
    'colors': Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof CarFiltersOptionsDto
     */
    'brands': Array<string>;
}
/**
 * 
 * @export
 * @interface CarsDto
 */
export interface CarsDto {
    /**
     * The unique identifier of the car
     * @type {number}
     * @memberof CarsDto
     */
    'id': number;
    /**
     * The price of the car
     * @type {number}
     * @memberof CarsDto
     */
    'price': number;
    /**
     * The brand of the car
     * @type {string}
     * @memberof CarsDto
     */
    'brand': string;
    /**
     * The model of the car
     * @type {string}
     * @memberof CarsDto
     */
    'model': string;
    /**
     * The manufacturing year of the car
     * @type {number}
     * @memberof CarsDto
     */
    'year': number;
    /**
     * The title status of the car
     * @type {string}
     * @memberof CarsDto
     */
    'title_status': string;
    /**
     * The mileage of the car
     * @type {number}
     * @memberof CarsDto
     */
    'mileage': number;
    /**
     * The color of the car
     * @type {string}
     * @memberof CarsDto
     */
    'color': string;
    /**
     * The VIN (Vehicle Identification Number) of the car
     * @type {string}
     * @memberof CarsDto
     */
    'vin': string;
    /**
     * The lot number of the car
     * @type {number}
     * @memberof CarsDto
     */
    'lot': number;
    /**
     * The state where the car is located
     * @type {string}
     * @memberof CarsDto
     */
    'state': string;
    /**
     * The country where the car is located
     * @type {string}
     * @memberof CarsDto
     */
    'country': string;
    /**
     * The condition of the car
     * @type {string}
     * @memberof CarsDto
     */
    'condition': string;
}

/**
 * CarsApi - axios parameter creator
 * @export
 */
export const CarsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} [price] The price of the car
         * @param {string} [color] The color of the car
         * @param {string} [brand] The brand of the car
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findCars: async (price?: number, color?: string, brand?: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/cars`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (price !== undefined) {
                localVarQueryParameter['price'] = price;
            }

            if (color !== undefined) {
                localVarQueryParameter['color'] = color;
            }

            if (brand !== undefined) {
                localVarQueryParameter['brand'] = brand;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {boolean} [isPrice] 
         * @param {boolean} [isColor] 
         * @param {boolean} [isBrand] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCarsFilters: async (isPrice?: boolean, isColor?: boolean, isBrand?: boolean, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/cars/filters`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (isPrice !== undefined) {
                localVarQueryParameter['isPrice'] = isPrice;
            }

            if (isColor !== undefined) {
                localVarQueryParameter['isColor'] = isColor;
            }

            if (isBrand !== undefined) {
                localVarQueryParameter['isBrand'] = isBrand;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CarsApi - functional programming interface
 * @export
 */
export const CarsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CarsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {number} [price] The price of the car
         * @param {string} [color] The color of the car
         * @param {string} [brand] The brand of the car
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findCars(price?: number, color?: string, brand?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CarsDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findCars(price, color, brand, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['CarsApi.findCars']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {boolean} [isPrice] 
         * @param {boolean} [isColor] 
         * @param {boolean} [isBrand] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCarsFilters(isPrice?: boolean, isColor?: boolean, isBrand?: boolean, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CarFiltersOptionsDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCarsFilters(isPrice, isColor, isBrand, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['CarsApi.getCarsFilters']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * CarsApi - factory interface
 * @export
 */
export const CarsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CarsApiFp(configuration)
    return {
        /**
         * 
         * @param {number} [price] The price of the car
         * @param {string} [color] The color of the car
         * @param {string} [brand] The brand of the car
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findCars(price?: number, color?: string, brand?: string, options?: any): AxiosPromise<Array<CarsDto>> {
            return localVarFp.findCars(price, color, brand, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {boolean} [isPrice] 
         * @param {boolean} [isColor] 
         * @param {boolean} [isBrand] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCarsFilters(isPrice?: boolean, isColor?: boolean, isBrand?: boolean, options?: any): AxiosPromise<Array<CarFiltersOptionsDto>> {
            return localVarFp.getCarsFilters(isPrice, isColor, isBrand, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CarsApi - object-oriented interface
 * @export
 * @class CarsApi
 * @extends {BaseAPI}
 */
export class CarsApi extends BaseAPI {
    /**
     * 
     * @param {number} [price] The price of the car
     * @param {string} [color] The color of the car
     * @param {string} [brand] The brand of the car
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CarsApi
     */
    public findCars(price?: number, color?: string, brand?: string, options?: RawAxiosRequestConfig) {
        return CarsApiFp(this.configuration).findCars(price, color, brand, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {boolean} [isPrice] 
     * @param {boolean} [isColor] 
     * @param {boolean} [isBrand] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CarsApi
     */
    public getCarsFilters(isPrice?: boolean, isColor?: boolean, isBrand?: boolean, options?: RawAxiosRequestConfig) {
        return CarsApiFp(this.configuration).getCarsFilters(isPrice, isColor, isBrand, options).then((request) => request(this.axios, this.basePath));
    }
}



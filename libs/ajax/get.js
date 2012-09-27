/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ajax/get.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */



/// require('ajax.ajax');


/**
 *
 * 发送一个get请求
 *
 * @grammar J.get(url,options)
 *    options.onSuccess
 *    options.onFailure
 *    options.onBeforerequest
 *
 *
 * @name J.ajax.get
 * @param {String} url 请求的url
 * @param {Object|Function} options 参数配置或者回调函数
 * @return {Object}
 *
 */

J.get = J.ajax.get = function( url, options ) {
    return new J.ajax.request(url, options);
};
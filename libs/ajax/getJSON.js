/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ajax/getJSON.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */



/// require('ajax.ajax');


/**
 * 发送一个get请求，返回JSON格式数据
 *
 * @grammar J.getJSON(url,options)
 *
 * @name J.ajax.getJSON
 * @param {String} url 请求的url
 * @param {Object|Function} 参数配置或者回调函数
 * @return {Object}
 *
 */

J.getJSON = J.ajax.getJSON = function( url, options ) {
    return new J.ajax.request(url, J.mix(options,{type:'JSON'}));
};
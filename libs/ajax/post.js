/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ajax/post.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/30
 *
 */



/// require('ajax.ajax');


/**
 * 发送一个post请求
 *
 * @grammar J.post(url,options)
 *    options.onSuccess
 *    options.onFailure
 *    options.onBeforerequest
 *
 * @name J.ajax.post
 * @param {String} url 请求的url
 * @param {Object|Function} 参数配置或者回调函数
 * @return {Object}
 *
 */
J.post = J.ajax.post = function( url, options ) {
    return new J.ajax.request(url, J.mix(options,{method:'POST'}));
};

/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ua/opera.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/08
 *
 */

/// require('ua.ua');

J.ua.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(J.ua.ua) ?  + ( RegExp.$6 || RegExp.$2 ) : undefined;

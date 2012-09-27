/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ua/firefox.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/08
 *
 */

/// require('ua.ua');

J.ua.firefox = /firefox\/(\d+\.\d+)/i.test(J.ua.ua) ? + RegExp.$1 : undefined;

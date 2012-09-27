/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ua/safari.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/08
 *
 */

/// require('ua.ua');

J.ua.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(J.ua.ua) && !/chrome/i.test(J.ua.ua) ? + (RegExp.$1 || RegExp.$2) : undefined;

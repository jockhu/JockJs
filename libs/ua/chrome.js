/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ua/chrome.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/08
 *
 */

J.ua.chrome = /chrome\/(\d+\.\d+)/i.test(J.ua.ua) ? + RegExp.$1 : undefined;

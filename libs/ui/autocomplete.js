/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/autocomplete.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/10/11
 *
 */

/// require('ui.ui');
/// require('string.trim');

/**
 * @namespace J.ui.autocomplete
 *
 * @require dom.dom, event.on, event.un
 *
 *
 */

(function (J, D) {

    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultOpts = {
        url:'/',
        autoSubmit: true,
        defer: 0,
        width: 0,
        params: {},
        source: {},
        offset:{
            x:0,
            y:-1
        },
        query: 'kw',
        placeholder:'',
        toggleClass:'',
        cache:true,
        onChange:null,
        onSelect:null,
        tpl:'autocomplete_def'
    };

    /**
     * Auto Complete Function
     * @param el 需要绑定的输入框
     * @param options 扩展选项
     * @constructor
     */
    function Autocomplete(el, options) {

        var disabled = false, el = J.g(el), selectedIndex = -1, currentValue = el.val().trim(), CACHED = [], opts, aId, isShow = false, divs,
            mainContainer, container, valueChangeTimer = null, ignoreValueChange = false, intervalTimer = null, st, query;

        (function(){
            el.attr('autocomplete', 'off');
            opts = J.mix(defaultOpts, options || {}, true);
            aId = 'Autocomplete_' + getId();
            opts.width || (opts.width = el.width()-2);
            (query = el.attr('name')) && (opts.query = query);
            if(currentValue === '' && opts.placeholder){
                el.val(opts.placeholder);
                opts.toggleClass && el.removeClass(opts.toggleClass);
            }
            buildMain();
            bindEvent();
        })();

        function setPlaceholder(value){
            opts.placeholder = value
        }

        function onChange(fn){
            opts.onChange = fn
        }

        function onSelect(fn){
            opts.onSelect = fn
        }

        function getId(){
            return Math.floor(Math.random() * 0x1000000).toString(16);
        }

        function buildMain(){
            J.g('body').first().insertBefore(mainContainer = J.create('div', {style:'position:absolute;z-index:1' }).html('<div class="'+opts.tpl+'" id="' + aId + '" style="display:none; width:'+opts.width+'px"></div>'));
            container = J.g(aId);
        }

        function fixPosition() {
			var offset = el.offset();
			mainContainer.setStyle({ top: (offset.y + el.height() + opts.offset.y) + 'px', left: (offset.x + opts.offset.x) + 'px' });
		}

        function bindEvent(){
            J.on(el, J.ua.opera ? 'keypress' : 'keydown', KeyPress);
            J.on(el, 'keyup', keyup);
            J.on(el, 'blur', blur);
            J.on(el, 'focus', focus);
        }

        function KeyPress(e){
            if (disabled) { return; }
			switch (e.keyCode) {
				case 27: //KEY_ESC:
					el.val(currentValue.trim());
					hide();
					break;
				case 9: //KEY_TAB:
				case 13: //KEY_RETURN:
					if (selectedIndex === -1) {
						hide();
						return;
					}
					select();
					break;
				case 38: //KEY_UP:
					moveUp();
					break;
				case 40: //KEY_DOWN:
					moveDown();
					break;
				default:
					return;
			}
			e.preventDefault();
        }

        function keyup(e){
            if (disabled) return;
			switch (e.keyCode) {
				case 38: //KEY_UP:
				case 40: //KEY_DOWN:
                case 13: //KEY_RETURN:
					return;
			}
            if(ignoreValueChange) return;
			clearTimeout(valueChangeTimer);
			valueChangeTimer = setTimeout(valueChange, opts.defer);
        }

        function blur(){
            clearInterval(intervalTimer);
            J.on(D,'click',function(){
                hide();
                J.un(D, 'click', arguments.callee);
            });
            if(opts.placeholder && el.val().trim() === ''){
                opts.toggleClass && el.removeClass(opts.toggleClass);
                el.val(opts.placeholder);
            }
        }

        function focus(){
            if (disabled) { return; }
            if (opts.placeholder == el.val().trim()){
                el.val('');
                opts.toggleClass && el.addClass(opts.toggleClass);
                return;
            }
            intervalTimer = setInterval(function(){
                if(currentValue != el.val().trim() && !ignoreValueChange) valueChange();
            },300);
        }

        function valueChange(){
			if (disabled || ignoreValueChange) {
				ignoreValueChange = false;
				return;
			}
            if(!(currentValue = el.val().trim())) return;
            selectedIndex = -1;
            onChange();
			getData();
        }

        function getCacheKey(){
            return encodeURIComponent(currentValue.trim());
        }

        function getData(){
            var a;
            if(opts.cache && (a = CACHED[getCacheKey()])) return suggest(a,'c');
            if(st) return;
            st = true;
            opts.params[opts.query] = currentValue.trim();
            J.getJSON(opts.url, {
                data:opts.params,
                onSuccess:suggest
            });
        }

        function suggest(a, c){
            var k,len,div;
            st = false;
            if (!a || (len = a.length) === 0) {
				hide();
				return;
			}
            c || (k = getCacheKey(), CACHED[k] = a);
            container.empty();
            for (var i = 0; i < len; i++)
                (div = J.create('div', {"class": selectedIndex === i ? 'ui_item ui_sel':'ui_item', title:getValue(a[i])}).html(a[i]).appendTo(container)).on('mouseover', activate, i).on('click', select, i);
            show();
            divs = container.s('div');
        }

        function activate(e, selIndex){
            divs.each(function(i, div){
                div.removeClass('ui_sel')
            });
            divs.eq(selectedIndex = selIndex).addClass('ui_sel');
        }

        function select(e, selIndex){
            var form;
            ignoreValueChange = true;
            !J.isUndefined(selIndex) && el.val( getValue(currentValue = divs.eq(selectedIndex = selIndex).html()) );
            hide();
            onSelect();
            if(opts.autoSubmit && (form = el.up('form'))){
                if (opts.placeholder == el.val().trim()){
                    el.val('');
                }
                form && form.get().submit();
            }
        }

        function getValue(v){
            return v ? v.trim().replace(/<\/?[^>]*>/g,'') : '';
        }

        function moveUp(){
            if (selectedIndex <= 0)  return;
            var div;
            ignoreValueChange = true;
            el.val( currentValue = getValue((div = divs.eq(--selectedIndex).addClass('ui_sel')).html()) );
            div.next().removeClass('ui_sel');
            onChange();
        }

        function moveDown(){
            if (!isShow || selectedIndex === divs.length-1)  return;
            var div;
            ignoreValueChange = true;
            el.val( currentValue = getValue((div = divs.eq(++selectedIndex).addClass('ui_sel')).html()) );
            selectedIndex > 0 && div.prev().removeClass('ui_sel');
            onChange();
        }

        function onChange(){
            opts.onChange && opts.onChange(currentValue);
        }

        function onSelect(){
            opts.onSelect && opts.onSelect(currentValue);
        }

        function show(){
            selectedIndex = -1;
			isShow || (container.show(),isShow = true);
            fixPosition();
        }

        function hide(){
            selectedIndex = -1;
            ignoreValueChange = false;
			isShow && (container.empty().hide(),isShow = false);
        }

        function enable(){
            disabled = false;
        }

        function disable(){
            disabled = true;
        }

        return {
            setPlaceholder:setPlaceholder,
            onChange:onChange,
            onSelect:onSelect,
            enable:enable,
            disable:disable,
            hide:hide,
            show:show
        };
	}


    J.dom.fn.autocomplete = function(options){
        return new Autocomplete(this.get(), options)
    };

    J.ui.autocomplete = Autocomplete;


})(J, document);
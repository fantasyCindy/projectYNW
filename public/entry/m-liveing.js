var more=(function(){
	var container,body,scroll,boxHeight;
	var debounce= function (func, wait, options) {
        var lastArgs,
            lastThis,
            maxWait,
            result,
            timerId,
            lastCallTime,
            lastInvokeTime = 0,
            leading = false,
            maxing = false,
            trailing = true;

        if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = wait || 0;
        if (options) {
            leading = !!options.leading;
            maxing = 'maxWait' in options;
            maxWait = maxing ? nativeMax(options.maxWait || 0, wait) : maxWait;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }


        function invokeFunc(time) {
            var args = lastArgs,
                thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }

        function leadingEdge(time) {
            // Reset any `maxWait` timer.
            lastInvokeTime = time;
            // Start the timer for the trailing edge.
            timerId = setTimeout(timerExpired, wait);
            // Invoke the leading edge.
            return leading ? invokeFunc(time) : result;
        }

        function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime,
                result = wait - timeSinceLastCall;

            return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
        }

        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime;

            // Either this is the first call, activity has stopped and we're at the
            // trailing edge, the system time has gone backwards and we're treating
            // it as the trailing edge, or we've hit the `maxWait` limit.
            return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
                (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
        }

        function timerExpired() {
            var time = Date.now();
            if (shouldInvoke(time)) {
                return trailingEdge(time);
            }
            // Restart the timer.
            timerId = setTimeout(timerExpired, remainingWait(time));
        }

        function trailingEdge(time) {
            timerId = undefined;

            // Only invoke if we have `lastArgs` which means `func` has been
            // debounced at least once.
            if (trailing && lastArgs) {
                return invokeFunc(time);
            }
            lastArgs = lastThis = undefined;
            return result;
        }

        function cancel() {
            if (timerId !== undefined) {
                clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
        }

        function flush() {
            return timerId === undefined ? result : trailingEdge(Date.now());
        }

        function debounced() {
            var time = Date.now(),
                isInvoking = shouldInvoke(time);

            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;

            if (isInvoking) {
                if (timerId === undefined) {
                    return leadingEdge(lastCallTime);
                }
                if (maxing) {
                    // Handle invocations in a tight loop.
                    timerId = setTimeout(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }
            if (timerId === undefined) {
                timerId = setTimeout(timerExpired, wait);
            }
            return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
    }
    var loadMore=`<div class="loadMore"><img src="/public/icons/loading.gif"/></div>`;
	var handle=function(){
		container.append(loadMore);
		var id=$('.loadMore').prev().data('id');
        $.getJSON("/html/queryLiveInfo.htm",{
            periodicalid:pid,
            pageSize:10,
            id:id
        },function(data){
        	data=data.rows;
        	if (data.length<1) {
        		container.find('.loadMore').html('没有更多了');
        	}else{
        		container.find('.loadMore').remove();
                container.append(createItems(data))
        	}
        })
	}
	var createItems = arr => {
        return arr.map(item => {
            return `<div class="live_list" data-id='${item.id}'>
			    		<span class='time'>${item.pubtimeString }</span>
			    		<div class="live_cont">
			    			${item.contentFilter }
			    		</div>
			    	</div>`
        }).join("")
    }
	return {
		init:function(){
			container=$('#liveing_box');
			body=$('body');
			scroll=body[0].scrollHeight;
			boxHeight=$(window).height();
			$(document).scroll(debounce(function(){
                var scrollTop=$('body').scrollTop()
                if (scrollTop+boxHeight==scroll) {
                	handle()
                }
            },500))
		}
	}
})()
$(function(){
	$('#reward').on('click','span',function(){
		m.alert.show();
	})
	more.init();
})
(function(window, document, undefined) {

	window.JW = (window.JW || {});

	JW = {
		throttle : function( callback, limit ) {
		    var wait = false;
		    return function() {
		        if ( !wait ) {
		            callback.call();
		            wait = true;
		            setTimeout( function() {
		                wait = false;
		            }, limit );
		        }
		    };
		},
		debounce : function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this,
            		args = arguments;
            	var later = function() {

            		timeout = null;

            		if ( !immediate ) {
                		func.apply(context, args);
                	}
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait || 200);
                if ( callNow ) {
            		func.apply(context, args);
        		}
        	};
		}
	};

})(this, this.document);
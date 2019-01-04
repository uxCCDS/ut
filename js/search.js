(function(){

var Search = function(){
	this.Con = $('#searchCon');
	this.Ipt = $('#iptSearch');
	this.init();
};
Search.prototype={
	init:function(){
		var me = this;
		this.Ipt.bind('focus',function(){
			me.focus();
		});
		this.Ipt.bind('blur',function(){
			me.blur();
		});
	},
	isIptEmpty:function(){
		return this.Ipt.val().replace(/\r\n\s\t/g,'')==='';
	},
	focus:function(){
		this.Ipt.addClass('onIpt');
	},
	blur:function(){
		if(this.isIptEmpty()){
			this.Ipt.removeClass('onIpt');
		}
	}
};

$(function(){

	new Search();

});

})();
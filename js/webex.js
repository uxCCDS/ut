(function(){

var _meetings='Sales Weekly Update|911201286|David Liam|none|08:00-09:00,Webex New recording player design|911201289|Catherine Sinu|hide|10:00-11:00';

var _recordings = 'Introduce Webex meeting recording|911201280|Catherine Sinu|none|07:00-08:00';

var Search = function(){
	this.Root = $('#root');
	this.Con = $('#searchCon');
	this.Ipt = $('#iptSearch');
	this.BtnClose = $('#btnClose');

	this.SuggestionCon = $('#suggestion_con');
	this.SuggestionMeetings = $('#suggestion_meetings');
	this.SuggestionRecordings = $('#suggestion_recordings');
	this.SuggestionMeetingsUl = $('#suggestion_meetings_ul');
	this.SuggestionRecordingsUl = $('#suggestion_recordings_ul');
	this.SuggestionNoResult= $('#suggestion_noresult');

	this.AssociationMeetings = new Association(_meetings,3);
	this.AssociationRecordings = new Association(_recordings,3);

	this.TemplateMeetings = $('#templateMeetings').val();
	this.TemplateRecordings = $('#templateRecordings').val();

	this.HiddenBtn = $('#hiddenJoin');

	this.init();
};
Search.prototype={
	init:function(){
		var me = this;
		this.Ipt.bind('focus',function(){
			me.focus();
		});

		this.Ipt.bind('click',function(e){
			e.stopPropagation();
		});

		this.Ipt.bind('keyup',function(){
			me.checkCloseBtnStatus();
			me.checkSuggestion();

		});
		this.BtnClose.bind('click',function(e){
			me.clear();
			me.BtnClose.css('display','none');
			e.stopPropagation();
		});

		$(window).bind('click',function(){
			me.blur();
		});

		this.SuggestionMeetings.bind('click',function(e){
			me.getDom(e.target, me.SuggestionMeetings[0]);
			//e.stopPropagation();
		});

		this.HiddenBtn.bind('click',function(){
			window.open("./client.html","","top=200,left=200,width=1366,height=748");
		});
	},
	delegete:function(id){
		switch(id){
			case '1':
				this.clear();
				this.Root[0].className='bg2';
				this.HiddenBtn.css('display','block');
				break;
			case '2':
				this.clear();
				window.open("./client.html","","top=200,left=200,width=1366,height=748");
				break;
			default:
				break;
		}
	},
	getDom:function(dom,root){
		var delegateId;
		do{
			delegateId = dom.getAttribute('delegateId');
			if(delegateId!=null){
				this.delegete(delegateId);
				break;
			}
		}
		while((dom = dom.offsetParent) && dom!=root);
	},
	checkCloseBtnStatus:function(){
		if(this.isIptEmpty()){
			this.BtnClose.css('display','none');
		}else{
			this.BtnClose.css('display','block');
		}
	},
	checkSuggestion:function(){
		var _val = this.Ipt.val(),
			hasMeeting,
			hasRecordings;

		//console.log(this.AssociationMeetings.getArr(_val));
		hasMeeting = this.updateSuggestion(this.AssociationMeetings,_val,this.SuggestionMeetings,this.SuggestionMeetingsUl,this.TemplateMeetings);
		hasRecordings = this.updateSuggestion(this.AssociationRecordings,_val,this.SuggestionRecordings,this.SuggestionRecordingsUl,this.TemplateRecordings);

		if(this.isIptEmpty()){
			this.SuggestionCon.addClass('hide');
		}else{
			this.SuggestionCon.removeClass('hide');
			if(!hasMeeting && !hasRecordings){
				this.SuggestionNoResult.removeClass('hide');
			}else{
				this.SuggestionNoResult.addClass('hide');
			}
		}
	},
	updateSuggestion:function(accoication,str,con,ul,template){
		var _regResult = accoication.getArr(str),
			_hasResult = (_regResult.length>0 && !this.isIptEmpty());

		if(_hasResult){
			con.removeClass('hide');
			var _inner = [];
			for(var i=0,l=_regResult.length;i<l;i++){
				var _res = _regResult[i],
					_title = this.filterText(str,_res[0]),
					_no = this.filterText(str,_res[1],true),
					_host = this.filterText(str,_res[2],true),
					_class = _res[3],
					_time = _res[4];

				_inner.push(template.replace('$title$',_title).replace('$no$',_no).replace('$host$',_host).replace('$class$',_class).replace('$time$',_time));
			}
			ul.html(_inner.join(''));
		}else{
			con.addClass('hide');
		}
		return _hasResult;
	},
	filterText:function(key,str,ifNo){
		var reg = new RegExp(key,'i');
		var _ret = str.replace(reg,function(word){
			return '<span>'+word+'</span>';
		});

		if(ifNo){
			var i=0,
				j=0,
				l=_ret.length,
				pos=[];
			for(;i<l;i++){
				if(/\d/.test(_ret[i])){
					if(j==3 || j==6){
						pos.push(i);
					}
					j++;
				}
			}
			var _item = _ret.slice(pos[0],pos[1]);
			_ret = _ret.replace(_item,' '+_item+' ');
		}
		return _ret;
	},
	clear:function(){
		this.Ipt.val('');
		this.checkCloseBtnStatus();
	},
	isIptEmpty:function(){
		return this.Ipt.val().replace(/\r\n\s\t/g,'')==='';
	},
	focus:function(){
		this.Ipt.addClass('onIpt');
		this.checkSuggestion();
	},
	blur:function(){
		if(this.isIptEmpty()){
			this.Ipt.removeClass('onIpt');
		}
		this.SuggestionCon.addClass('hide');
	}
};

$(function(){

	new Search();

	window.OpenClient = function(){
		//window.open("./client.html","","top=400,left=400,width=1366,height=1868");
	};

	$('#g_tip_a').bind('click',function(e){
		$('#g_tip').css('display','none');
		e.stopPropagation();
	});

});

})();
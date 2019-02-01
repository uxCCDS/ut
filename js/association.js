(function() {
	var Association = function(data,max){
		this.Data = data;
		this.Max = max;
	};
	Association.prototype={
		Max:9,
		RegTirmStart:/^,/,
		RegTirmEnd:/,$/,
		RegCheckEmail:['(^|,)[\\w ]+\\|','(,|$)'],
		RegCheckName:['(^|,)','\\|\\w+'],
		RegList:[

			//name
			['(^|,)','[\\w ]*\\|[\\w ]+\\|[\\w ]+\\|[\\w ]+\\|[\\w ]+\\:[\\w ]+\\-[\\w ]+\\:[\\w ]+'],
			['(^|,)[\\w ]+','[\\w ]*\\|[\\w ]+\\|[\\w ]+\\|[\\w ]+\\|[\\w ]+\\:[\\w ]+\\-[\\w ]+\\:[\\w ]+'],
			//id
			['(^|,)[\\w ]+\\|','[\\w ]*\\|[\\w ]+\\|[\\w ]+\\|[\\w ]+\\:[\\w ]+\\-[\\w ]+\\:[\\w ]+'],
			['(^|,)[\\w ]+\\|[\\w ]+','[\\w ]*\\|[\\w ]+\\|[\\w ]+\\|[\\w ]+\\:[\\w ]+\\-[\\w ]+\\:[\\w ]+'],
			//host
			['(^|,)[\\w ]+\\|[\\w ]+\\|','[\\w ]*\\|[\\w ]+\\|[\\w ]+\\:[\\w ]+\\-[\\w ]+\\:[\\w ]+'],
			['(^|,)[\\w ]+\\|[\\w ]+\\|[\\w ]+','[\\w ]*\\|[\\w ]+\\|[\\w ]+\\:[\\w ]+\\-[\\w ]+\\:[\\w ]+']
			
		],
		checkDelegate:function(delegate,matchStr){
			return delegate===undefined || delegate(matchStr);
		},
		get:function(str,notIn,delegate){
			var me=this,
				reg,
				data= this.Data,
				matchStr,
				matchArr,
				result=[];
			for(var i in me.RegList){
				reg = new RegExp(me.RegList[i].join(str),'gi');
				matchArr = data.match(reg);
				if(matchArr){
					for(var j in matchArr){
						matchStr = me.format(matchArr[j]);
						//console.log(matchStr);
						if(me.unique(result,matchStr) && me.not(matchStr,notIn) && me.checkDelegate(delegate,matchStr)){
							result.push(matchStr);
						}
						if(result.length>me.Max){
							return result;
						}
					}
				}
			}
			return result;
		},
		getArr:function(str,notIn,delegate){
			var _arr=[],
				matchArr=this.get(str,notIn,delegate);
			for(var i=0,l=matchArr.length;i<l;i++){
				_arr.push(matchArr[i].split('|'));
			}
			return _arr;
		},
		check:function(str){
			var regEmail = new RegExp(this.RegCheckEmail.join(str),'gi'),
				regName = new RegExp(this.RegCheckName.join(str),'gi'),
				match,
				matchStr;
			match = this.Data.match(regName);
			if(!match || match.length<1){
				match = this.Data.match(regEmail);
			}
			if(match && match.length>0){
				matchStr = this.format(match[0]);
				return matchStr.split('|');
			}else{
				return false;
			}
		},
		format:function(str){
			return str.replace(this.RegTirmStart,'').replace(this.RegTirmEnd,'');;
		},
		unique:function(arr,str){
			for(var i in arr){
				if(arr[i]==str){
					return false
				}
			}
			return true
		},
		not:function(matchStr,notArr){
			if(notArr){
				var str = matchStr.split('|')[0];
				for(var i=0,l=notArr.length;i<l;i++){
					if(notArr[i] == str){
						return false;
					}
				}
			}
			return true;
		}
	};
	window.Association = Association;
})();
var React=require("react");
var Page=React.createClass({
	componentWillMount:function(){
		$.ajax({
			url:"./backTest/page.php",
			dataType:"json",
			success:function(data){
				this.props.setPage(data.pageCount);
			}.bind(this),
			error:function(){
				console.log("pageError");
			}
		})
	},
	getPageList:function(){
		var pageCount=this.props.pageCount;
		var array=[];
		var _this=this;
		for(var i=0;i<pageCount;i++){
			array.push(i);
		}
		var li=array.map(function(index){
			return(
				<li key={index} className={_this.setClassname(index)}><a href={_this.getHash(index)}  onClick={_this.pageClick(index)}>{index+1}</a></li>
			);
		})
		return li;
	},
	setClassname:function(data){
		var current=this.props.pageCurrent;
		var liIndex=this.getPage(data);
		if(current==data){
			return "pageCurrent";
		}
	},
	getHash:function(data){
		var data=this.getPage(data)+1;
		var hash="#page/"+data;
		return hash;
	},
	pageClick:function(data){
		var _this=this;
		return function(){
			var nextPage=_this.getPage(data);
			_this.goTo(nextPage);
		}
	},
	getPage:function(data){
		var props=this.props;
		var current=props.pageCurrent;
		var pageCount=props.pageCount;
		if(data=="prev"){
			if(current>0){
				nextPage=current-1;
			}else{
				nextPage=0;
			}
		}else if(data=="next"){
			if(current<pageCount-1){
				nextPage=current+1;
			}else{
				nextPage=pageCount-1;
			}
		}else{
			nextPage=data;
		}
		return nextPage;
	},
	goTo:function(page){
	this.props.searchDynamicList(page);
	},
	render:function(){
		return(
			<div className="page">
				<ul>
					<li className="first"><a href={this.getHash(0)}  onClick={this.pageClick(0)}>首页</a></li>
					<li className="prev"><a href={this.getHash("prev")}  onClick={this.pageClick("prev")}>上一页</a></li>
					{this.getPageList()}
					<li className="next"><a href={this.getHash("next")}  onClick={this.pageClick("next")}>下一页</a></li>
					<li className="last"><a href={this.getHash(this.props.pageCount-1)}  onClick={this.pageClick(this.props.pageCount-1)}>末页</a></li>
				</ul>
			</div>
		);
	}
});
module.exports=Page;

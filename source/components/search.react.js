var React=require("react");
var Search=React.createClass({
	searchClick:function(){
		var _this=this;
		return function(){
			var value=_this.refs.searchInput.value;
			_this.props.searchDynamicList(value);
			_this.props.setPageCurrent(0);
		}
	},
	render:function(){
		return(
			<div className="search">
				<input placeholder="搜索" className="searchInput" ref="searchInput"/>
				<button className="searchbutton" onClick={this.searchClick()}>搜索</button>
				<button className="searchPublish">发布文章</button>
			</div>
		);
	}
});
module.exports=Search;

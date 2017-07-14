var React=require("react");
var DynamicList=React.createClass({
	getDynamicList:function(){
		var _this=this;
		var li=this.props.dynamicList.map(function(news){
			return(
				<li key={news.index}>
					<a href={_this.setHash(news.index)} className="title" onClick={_this.titleClick(news.index)}>{news.title}</a>
					<p>
						<span className="User">{news.user}</span>
						<span className="Time">{_this.getTime(news.time)}</span>
						<span className="Look">{news.look}</span>
						<span className="Message">{news.message}</span>
					</p>
				</li>
			)
		});
		return li;
	},
	setHash:function(index){
		var hash="#page/aNew/"+index;
		return hash;
	},
	titleClick:function(index){
		var props=this.props;
		return function(){
			$.ajax({
			url: "./backTest/aNew.php",
			success: function(data) {
				props.setANew({
					"dynamicList":{
						"index": index,
						"user": "何佩芳",
						"title": "济南轨道交通正在如火如荼地进行济南轨道交通正在如火如荼地进行奥迪上海车展阵容 ",
						"content": "文章内容内容内容文章内容内容内容文章内容内容内容文章内容内容内容文章内容内容内容",
						"time": "1403149534",
						"look": "456",
						"message": "654",
						"comment": [{
							"content": "111",
							"user": "hpf"
						}, {
							"content": "222",
							"user": "何佩芳"
						}]
					}
				});
			},
			error: function() {
				console.log("aNewError");
			}
		});
		}
	},
	getTime:function(data){
		var data=new Date(parseInt(data));
		var year=data.getFullYear();
		var month=data.getMonth()+1;
		var day=data.getDate();
		var hour=data.getHours();
		var min=data.getMinutes();
		var second=data.getSeconds();
		var time=year+"-"+month+"-"+day+" "+hour+":"+min+":"+second;
		return time;
	},
	render:function(){
		return(
			<div className="dynamicList">
				<ul>
					{this.getDynamicList()}
				</ul>
			</div>
		);
	}
});
module.exports=DynamicList;

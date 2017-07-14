var React=require("react");
var ReactDom=require("react-dom");
var Search=require("./components/search.react");
var DynamicList=require("./components/dynamicList.react");
var Page=require("./components/page.react");
var ANew=require("./components/aNew.react");
var Index=React.createClass({
	getInitialState:function(){
		return{
			"dynamicList":[],
			"pageCount":'',
			"pageCurrent":0,
			"aNew":[]
		}
	},
	componentWillMount:function(){
		var hash=location.hash;
		var hashArr=hash.split("/");
		var page=hashArr[hashArr.length-1];
		console.log(hash);
		if(hash==""){
			location.hash="page";
			this.searchDynamicList(0);
		}else{
			this.searchDynamicList(page-1);
		}
	},
	searchDynamicList:function(page){
		$.ajax({
			"url":"./backTest/news.php",
			dataType:"json",
			success:function(data){
				this.setState({
					"pageCurrent":page,
					"dynamicList":data.news
				})
			}.bind(this),
			error:function(){
				console.log("error");
			}
		})
	},
	setPage:function(data){
		this.setState({
			"pageCount":data
		})
	},
	setPageCurrent:function(data){
		this.setState({
			"pageCurrent":data
		})
	},
	setDynamicList:function(data){
		this.setState({
			"dynamicList":data
		})
	},
	setANew:function(data){
		console.log(data.dynamicList);
		this.setState({
			"hash":location.hash,
			"aNew":data.dynamicList
		})
	},
	render:function(){
		var hash=location.hash;
		var hashArr=hash.split("/");
		var page=hashArr[0].split("#")[1];
		var secondPage=hashArr[1];
		var state=this.state;
		return(
			<div className="blogIndex">
				<div className="indexTop">
					<div className="w1200">
						<a href="javascript:;" className="topLogo left">Blog</a>
						<ul className="topNav left">
							<li><a href="#dynamic">动态</a></li>
							<li><a href="#chart">集成图表</a></li>
							<li><a href="#map">高德地图</a></li>
						</ul>
						<ul className="topLogin right">
							<li><a href="javascript:;">登录</a></li>
							<li><a href="javascript:;">注册</a></li>
						</ul>
					</div>
				</div>
				<div className="indexMain w1200">
					<div className="dynamic" style={{"display":location.hash!="#chart" && location.hash!="#map" ?"block":"none"}}>
						<div className="dynamicLeft">
							<div className="dynamicAll" style={{"display":secondPage=="aNew"?"none":"block"}}>
								<Search searchDynamicList={this.searchDynamicList} setPageCurrent={this.setPageCurrent}/>
								<DynamicList dynamicList={state.dynamicList} setANew={this.setANew}/>
								<Page setPage={this.setPage} pageCount={state.pageCount} pageCurrent={state.pageCurrent} setPageCurrent={this.setPageCurrent}
								searchDynamicList={this.searchDynamicList}/>
							</div>
							<div className="dynamicOne">
								<ANew content={state.aNew}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
ReactDom.render(<Index/>,document.getElementById("blog"));

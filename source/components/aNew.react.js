var React=require("react");
var ANew=React.createClass({
	render:function(){
		var props=this.props;
		return(
			<div>
				<h4 className="title">{props.content.title}</h4>
				<p className="source">
					<span>{props.content.user}</span>
				</p>
			</div>
		);
	}
});
module.exports=ANew;

/*数组重复元素及个数*/
function arrCheck(arr){
	var newArr=[];
	for(var i=arr.length-1;i>=0;i--){
		var temp=arr[i];
		var count=0;
		for(var j=0;j<i;j++){
			if(temp==arr[j]){
				count++;
			}
		}
		i-=count;
		newArr.push(temp);
	}
	console.log(newArr);
}
arrCheck([1,4,5,1,2,2,2,3].sort());
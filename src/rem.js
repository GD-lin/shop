const baseSize = 64;//基准大小
//设置rem函数
function setRem(a) {
	const scale = document.documentElement.clientWidth / a;
	document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2) + 'px')
}
//初始化
setRem(750);
window.onresize = function() {
	setRem(750);
}
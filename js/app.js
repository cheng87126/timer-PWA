;(function(){
	var leftCircle = document.querySelector('.left'),
		rightCircle = document.querySelector('.right'),
		countdown = document.getElementById('countdown'),
		btn = document.querySelector('.btn'),
		timer = null

	btn.addEventListener('click',function(){
		rightCircle.style.cssText = 'transform:rotate(0)'
		leftCircle.style.cssText = 'transform:rotate(0)'
		var time = +document.getElementById('time').value,
			now = new Date(),
			endTime = now.setMinutes(now.getMinutes() + time)
		function t(){
			var current = new Date(),
				remaine = 1 - (endTime - current) / (time * 60 * 1000),
				angle = Math.round(remaine * 360)
			angle = angle > 360 ? 360 : angle
			countdown.innerHTML = formateTime(endTime - current)
			if(angle <= 180){
				rightCircle.style.cssText = 'transform:rotate('+angle+'deg)'
			}else{
				rightCircle.style.cssText = 'transform:rotate(180deg)'
				leftCircle.style.cssText = 'transform:rotate('+(angle-180)+'deg)'						
			}

			if(angle < 360){
				timer = setTimeout(t,1000)
			}
		}
		t()
	},false)
	function formateTime(ms){
		var sec = ms / 1000,s,m,h,tiemText = ''
		if(sec > 0){
			s = Math.floor(sec % 60),
			m = Math.floor(sec / 60) % 60,
			h = Math.floor(sec / 3600)
			tiemText = fillZero(h) + ':' + fillZero(m) + ':' + fillZero(s) 
		}else{
			//倒计时结束
			tiemText = '00:00:00'
			navigator.vibrate && navigator.vibrate(5000)
		}
		return tiemText
	}

	function fillZero(num){
		return num.toString().replace(/^(\d)$/,'0$1')
	}

	function createTimeItem(){
		var item = [],
			itemDis = [],
			tmp = [],
			tmpDis = []
		for(var h=0;h<24;h++){
			tmp.push(h)
			tmpDis.push(fillZero(h))
		}
		item.push(tmp)
		itemDis.push(tmpDis)

		tmp = []
		tmpDis = []
		for(var m=0;m<60;m++){
			tmp.push(m)
			tmpDis.push(fillZero(m))
		}
		item.push(tmp)
		itemDis.push(tmpDis)
		item.push(tmp)
		itemDis.push(tmpDis)

		return {
			item:item,
			itemDis:itemDis
		}
	}
	var timeItem = createTimeItem()
	var p = new picker({
		title:'请选择时间',
		item:timeItem.item,
		itemDis:timeItem.itemDis
	})
	p.on('cancel',function(val){
		console.log(idx)
	})
	p.on('confirm',function(val){
		console.log(val.idx)
		var time = val.idx
		document.getElementById('time').value = time[0] * 60 + (+time[1])
		btn.click()
	})
	document.querySelector('.setting').addEventListener('click',function(){
		p.show()
	},false)
})()
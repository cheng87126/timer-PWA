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

	function pickerTime(){

		this.init()
	}
	pickerTime.prototype.init = function(){
		var picker = this.picker = document.createElement('div')
		picker.classList.add('picker')
		
		picker.insertAdjacentHTML('afterbegin',this.renderTitle())
		picker.insertAdjacentHTML('beforeend',this.renderBody())
		picker.insertAdjacentHTML('beforeend',this.renderLine())

		document.getElementsByTagName('body')[0].appendChild(picker)
		this.wrapper = document.querySelectorAll('.picker-col')
		this.itemHeight = document.querySelector('.picker-col li').clientHeight
		for(var i=0,l=this.wrapper.length;i<l;i++){
			this.setValue(this.wrapper[i])
		}
		
		this.bindEvent()
	}
	pickerTime.prototype.renderTitle = function(){
		var pickerTitle = '<div class="picker-title">'
		pickerTitle += '<div class="picker-cancel">cancel</div>'
		pickerTitle += '<div>请选择时间</div>'
		pickerTitle += '<div class="picker-sure">sure</div>'
		pickerTitle += '</div>'

		return pickerTitle
	}
	pickerTime.prototype.renderBody = function(){
		var str = '<div class="picker-body">'
		str += '<div class="picker-col">'
		str += this.renderSelect(0,12)
		str += '</div>'
		str += '<div class="picker-col">'
		str += this.renderSelect(0,59)
		str += '</div>'
		str += '<div class="picker-col">'
		str += this.renderSelect(0,59)
		str += '</div>'
		str += '</div>'

		return str
	}
	pickerTime.prototype.renderSelect = function(start,end){
		var selectStr = '<ul>'
		for(var i=start;i<=end;i++){
			selectStr += '<li>'+fillZero(i)+'</li>'
		}
		selectStr += '</ul>'
		return selectStr
	}
	pickerTime.prototype.renderLine = function(){
		return '<div class="picker-line"></div>'
	}
	pickerTime.prototype.show = function(){
		this.picker.classList.add('picker-show')
	}
	pickerTime.prototype.hide = function(){
		this.picker.classList.remove('picker-show')
	}
	pickerTime.prototype.toggle = function(){
		this.picker.classList.toggle('picker-show')
	}
	pickerTime.prototype.setValue = function(col,val){
		val = val || 0
		var disY = this.itemHeight * val
		col.querySelector('ul').style.cssText = 'transform:translateY('+disY+'px)'
	}
	pickerTime.prototype.bindEvent = function(){
		document.querySelector('.picker-cancel').addEventListener('click',function(){
			console.log('canel')
		},false)
		document.querySelector('.picker-sure').addEventListener('click',function(){
			console.log('sure')
		},false)
		var wrapper = this.wrapper
		for(var i=0,l=wrapper.length;i<l;i++){
			wrapper[i].addEventListener('mousedown',this.start,false)
			wrapper[i].addEventListener('mousemove',this.move,false)
			wrapper[i].addEventListener('mouseup',this.end,false)
		}
	}
	pickerTime.prototype.start = function(e){
		this.start = e.clientY
		this.isStart = true
	}
	pickerTime.prototype.move = function(e){
		if(!this.isStart) return
		var disY = e.clientY - this.start
		this.querySelector('ul').style.cssText = 'transform:translateY('+disY+'px)'
	}
	pickerTime.prototype.end = function(){
		this.isStart = false
		// document.removeEventListener('mousemove',this.move,false)
		// document.removeEventListener('mousedown',this.end,false)
	}

	var p = new pickerTime()
	document.querySelector('.setting').addEventListener('click',function(){
		p.show()
	},false)
})()
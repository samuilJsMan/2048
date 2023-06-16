"use strict";

let gridCords=[10,120,230,340],blockNumber=1,g,
	win=0,score=0,startX,startY,currentX,currentY,
	gamespace=document.querySelector(`.gamespace`),
	wORl=document.querySelector(`.text`),
	scoreElement=document.querySelector(`.now_score`),
	gridMemory=[[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0]],
	settingsButt=document.querySelector(`.settings_button`),
	settingsScreen=document.querySelector(`.settings_screen`),
	settingsBlock=document.querySelector(`.settings_screen_menue`),
	deleteScore=document.querySelector(`.delete_score`),
	endScreen=document.querySelector(`.endScreen`),
	colorChange=[document.querySelector(`.colorBG1`),
	document.querySelector(`.colorBG2`),
	document.querySelector(`.colorBG3`),
	document.querySelector(`.colorBG4`),
	document.querySelector(`.colorBG5`),],
	colorBG=[document.querySelector(`.background1`),
	document.querySelector(`.background2`),
	document.querySelector(`.background3`),
	document.querySelector(`.background4`),
	document.querySelector(`.background5`),],
	body=document.querySelector(`body`),
	colorBlock=[document.querySelector(`.colorBlock1`),
	document.querySelector(`.colorBlock2`),
	document.querySelector(`.colorBlock3`),
	document.querySelector(`.colorBlock4`),
	document.querySelector(`.colorBlock5`)],
	colorSett=[[[82, 211, 142],[15, 105, 189]]
			  ,[[242, 214, 172],[234, 84, 85]],
			   [[86, 204, 242],[20, 75, 204]],
			   [[242, 214, 172],[247, 107, 28]],
			   [[235, 99, 192],[201, 34, 48]]],
	settingsRestart=document.querySelector(`.restart`),
	settingsQuit=document.querySelector(`.quit`),
	settingsMore=document.querySelector(`.more`)

if(!localStorage.records){localStorage.setItem(`records`,0)}
if(!localStorage.block){localStorage.setItem(`block`,2)}
if(!localStorage.background){localStorage.setItem(`background`,0)}

colorBG[localStorage.background].style.opacity=`1`
colorChange[localStorage.background].classList.add(`chosen`)
g=colorSett[localStorage.block]
colorBlock[localStorage.block].classList.add(`chosen`)

createNewBlock()

document.querySelector(`.best_score`).innerHTML=localStorage.records
document.addEventListener('DOMContentLoaded',function(){
	if(window.mobileAndTabletCheck()){
		document.querySelector(`.game`).style.cssText=`transform: translate(-50%,-60%) scale(2);`
		document.querySelector(`.settings_button`).style.cssText=`width:100px; height:100px;`
		document.querySelector(`.settings_screen_menue`).style.cssText=`transform: translate(-50%,-70%) scale(2);`
		document.addEventListener('touchstart', handleTouchStart);
		document.addEventListener('touchmove', handleTouchMove);
	}else{
		document.querySelector(`.delete_score`).style.cssText=`transition: 0.3s;`
		document.querySelector(`.settings_button`).style.cssText=`transition: 0.5s;`
		document.querySelector(`.button`).style.cssText=`transition:0.3s;`}
		document.addEventListener(`keydown`,move)
	for(let i of colorBG){i.style.transition=`1s`}
	})

document.querySelector(`.reset`).addEventListener(`click`, function(){location.reload()})
document.addEventListener('contextmenu',function(event){event.preventDefault();});
settingsButt.addEventListener(`click`, settingsFunc)

function settingsFunc(){
	settingsScreen.style.display=`block`
	setTimeout(function(){
		settingsScreen.style.transition=`0.3s`
		settingsScreen.style.opacity=`1`},10)
	removeEventListener(`keydown`,move)
	document.removeEventListener('touchstart', handleTouchStart)
	document.removeEventListener('touchmove', handleTouchMove)
	settingsScreen.addEventListener(`click`,closeSettingsScreen)
	settingsBlock.addEventListener(`click`, function(){event.stopPropagation()})
	deleteScore.addEventListener(`click`, forDelete)
	colorChange[0].addEventListener(`click`, change0)
	colorChange[1].addEventListener(`click`, change1)
	colorChange[2].addEventListener(`click`, change2)
	colorChange[3].addEventListener(`click`, change3)
	colorChange[4].addEventListener(`click`, change4)
	colorBlock[0].addEventListener(`click`, blockChange0)
	colorBlock[1].addEventListener(`click`, blockChange1)
	colorBlock[2].addEventListener(`click`, blockChange2)
	colorBlock[3].addEventListener(`click`, blockChange3)
	colorBlock[4].addEventListener(`click`, blockChange4)
	settingsMore.addEventListener(`click`, function(){window.open("https://github.com/samuilJsMan", "_blank")})}

function blockChange0(){blockChange(0)}
function blockChange1(){blockChange(1)}
function blockChange2(){blockChange(2)}
function blockChange3(){blockChange(3)}
function blockChange4(){blockChange(4)}

function blockChange(x){
	for(let i of colorBlock){i.classList.remove(`chosen`)}
	colorBlock[x].classList.add(`chosen`)
	localStorage.block=x
	g=colorSett[x]
	for(let row of gridMemory){for(let position of row){if(position>0){
		let t=document.querySelector(`.block${position}`)
		let p=((+t.dataset.value).toString(2).length-2)/10
		t.style.background=`${rgb(p)}`
	}}}}

function change(x){
	for(let i of colorBG){i.style.opacity=`0`}
	colorBG[x].style.opacity=`1`
	for(let i of colorChange){i.classList.remove(`chosen`)}
	colorChange[x].classList.add(`chosen`)
	localStorage.background=x
	if(x==0){body.style.background=`linear-gradient(135deg, #52d38e 0%, #0f69bd 100%)`}
	if(x==1){body.style.background=`linear-gradient(135deg, #f2d6ac 0%, #EA5455 100%)`}
	if(x==2){body.style.background=`linear-gradient(135deg, #56CCF2 0%, #144bcc 100%)`}
	if(x==3){body.style.background=`linear-gradient(135deg, #f2d6ac 0%, #F76B1C 100%)`}
	if(x==4){body.style.background=`rgb(139,132,207)`}}

function closeSettingsScreen(){
	settingsScreen.style.transition=`0.3s`
	settingsScreen.style.opacity=`0`
	setTimeout(function(){settingsScreen.style.display=`none`},300)
	addEventListener(`keydown`,move)
	document.addEventListener('touchstart', handleTouchStart)
	document.addEventListener('touchmove', handleTouchMove)
	settingsScreen.removeEventListener(`click`,closeSettingsScreen)
	settingsBlock.removeEventListener(`click`, function(){event.stopPropagation()})
	deleteScore.removeEventListener(`click`, forDelete)
	colorChange[0].removeEventListener(`click`, change0)
	colorChange[1].removeEventListener(`click`, change1)
	colorChange[2].removeEventListener(`click`, change2)
	colorChange[3].removeEventListener(`click`, change3)
	colorChange[4].removeEventListener(`click`, change3)}

function change0(){change(0)}
function change1(){change(1)}
function change2(){change(2)}
function change3(){change(3)}
function change4(){change(4)}

function forDelete(){
	if(localStorage.records){localStorage.setItem(`records`,0)}
	document.querySelector(`.best_score`).innerHTML=`0`}	

function createNewBlock(){
	let FreeSpaces=0
	for(let rows of gridMemory){for(let position of rows){if(position==0){FreeSpaces++}}}//перевірка на наявність вільних місць
	if(FreeSpaces>0){ //якщо є вільні місця на полі
		let randomCords=[Math.floor(Math.random()*4),Math.floor(Math.random()*4)]
		if(gridMemory[randomCords[0]][randomCords[1]]==0){ //якщо поле за випадковими координатами вільне
			let choseOne=[2,2,2,2,2,2,2,2,2,4]
			let twoOrFour=choseOne[Math.floor(Math.random()*10)]
			setTimeout(createBlock,300) //визиваєм функцію створення блоку і його стилів
			function createBlock(){ 
				gamespace.insertAdjacentHTML(`beforeend`,//створюємо блок 
					`<div data-value="${twoOrFour}" class="block block${blockNumber}">${twoOrFour}</div>`)
				document.querySelector(`.block${blockNumber}`).style.cssText=`
					transform: translateX(${gridCords[randomCords[1]]}px) 
						translateY(${gridCords[randomCords[0]]}px); background:${rgb(((+twoOrFour).toString(2).length-2)/10)};`//задаєм йому позицію
				setTimeout(function(){document.querySelector(`.block${blockNumber}`). //задаєм плавний прояв
					classList.add(`opacity1`);blockNumber++},20) 
				gridMemory[randomCords[0]][randomCords[1]]=blockNumber//вносимо блок в память
			}
		}else{createNewBlock()}//якщо випадкове місце блоку зайняте то виконуємо функцію заново
	}}

function rgb(p){
	return `rgb(${Math.round(g[0][0]+(g[1][0]-g[0][0])*p)},
		${Math.round(g[0][1]+(g[1][1]-g[0][1])*p)},
		${Math.round(g[0][2]+(g[1][2]-g[0][2])*p)})`}

function move(swipe){
	document.removeEventListener(`keydown`,move)
	document.removeEventListener('touchstart', handleTouchStart)
	document.removeEventListener('touchmove', handleTouchMove)
	let create=0
	if(event.code==`ArrowUp`||event.code==`KeyW`||swipe==`Up`){ //принажиманні стрілочки вверх
		for(let repeat=0; repeat<5; repeat++){ //повторення тричі
			for(let row of gridMemory){ //прохід по рядам
				for(let position of row){ //прохід по позиціям в ряду
					if(position!=0){ //якщо позиція не пуста
						let numberOfRow=gridMemory.indexOf(row)
						let positionInRow=gridMemory[numberOfRow].indexOf(position)
						if(numberOfRow>0){
							let first=document.querySelector(`.block${position}`)
							let second=document.querySelector(`.block${gridMemory[numberOfRow-1][positionInRow]}`)
							if(gridMemory[numberOfRow-1][positionInRow]!=0){
								if(first.dataset.value==second.dataset.value&&repeat==3){
									second.dataset.value*=2
									second.innerHTML=`${second.dataset.value}`
									gridMemory[numberOfRow][positionInRow]=0
									score+=first.dataset.value*2
									scoreElement.innerHTML=`${score}`
									setTimeout(function(){first.classList.remove(`opacity1`)},20)
									let p=((+second.dataset.value).toString(2).length-2)/10
									second.style.cssText=`transform:translateX(${gridCords[positionInRow]}px) 
										translateY(${gridCords[numberOfRow-1]}px); z-index:0; background:${rgb(p)};`
									first.style.cssText=`transform:translateX(${gridCords[positionInRow]}px) 
										translateY(${gridCords[numberOfRow-1]}px); z-index:0; background:${rgb(p)};`
									setTimeout(function(){first.remove()},300)
									create++
									if(second.dataset.value==2048&&win==0){endOfTheGame(`W`);win++}
								}
							}
							if(gridMemory[numberOfRow-1][positionInRow]==0&&(repeat<3||repeat>3)){ //якщо це не нульовий ряд і перед блоком пусто 
							let element=document.querySelector(`.block${position}`)
							let p=((+element.dataset.value).toString(2).length-2)/10
							element.style.cssText=`transform: translateX(${gridCords[positionInRow]}px) 
									 translateY(${gridCords[numberOfRow-1]}px); background:${rgb(p)};`
							gridMemory[numberOfRow-1][positionInRow]=position //добавляєми блок в нове місце памяті
							gridMemory[numberOfRow][positionInRow]=0 //видаляєио блок зі старого місця в памяті
							create++
							}
						}
					}
				}
			}
		}}
	if(event.code==`ArrowDown`||event.code==`KeyS`||swipe==`Down`){ //принажиманні стрілочки вниз
		for(let repeat=0; repeat<5; repeat++){ //повторення тричі
			for(let i=gridMemory.length-1; i>=0; i--){ let row=gridMemory[i]//прохід по рядам
				for(let position of row){ //прохід по позиціям в ряду
					if(position!=0){ //якщо позиція не пуста
						let numberOfRow=gridMemory.indexOf(row)
						let positionInRow=gridMemory[numberOfRow].indexOf(position)
						if(numberOfRow<3){
							if(gridMemory[numberOfRow+1][positionInRow]!=0){
								let first=document.querySelector(`.block${position}`)
								let second=document.querySelector(`.block${gridMemory[numberOfRow+1][positionInRow]}`)
								if(first.dataset.value==second.dataset.value&&repeat==3){
									second.dataset.value*=2
									second.innerHTML=`${second.dataset.value}`
									gridMemory[numberOfRow][positionInRow]=0
									score+=first.dataset.value*2
									scoreElement.innerHTML=`${score}`
									setTimeout(function(){first.classList.remove(`opacity1`)},20)
									let p=((+second.dataset.value).toString(2).length-2)/10
									second.style.cssText=`transform:translateX(${gridCords[positionInRow]}px) 
										translateY(${gridCords[numberOfRow+1]}px); z-index:0; background:${rgb(p)};`
									first.style.cssText=`transform:translateX(${gridCords[positionInRow]}px) 
									 translateY(${gridCords[numberOfRow+1]}px); z-index:0; background:${rgb(p)};`
									setTimeout(function(){first.remove()},300)
									if(second.dataset.value==2048&&win==0){endOfTheGame(`W`);win++}
									create++
								}
							}
							if(gridMemory[numberOfRow+1][positionInRow]==0&&(repeat<3||repeat>3)){ //якщо це не нульовий ряд і перед блоком пусто 
							let element=document.querySelector(`.block${position}`)
							let p=((+element.dataset.value).toString(2).length-2)/10
							element.style.cssText= 
								`transform: translateX(${gridCords[positionInRow]}px) 
									 translateY(${gridCords[numberOfRow+1]}px); background:${rgb(p)};`
							gridMemory[numberOfRow+1][positionInRow]=position //добавляєми блок в нове місце памяті
							gridMemory[numberOfRow][positionInRow]=0 //видаляєио блок зі старого місця в памяті
							create++
							}
						}
					}
				}
			}
		}}
	if(event.code==`ArrowLeft`||event.code==`KeyA`||swipe==`Left`){
		for(let repeat=0; repeat<5; repeat++){ //повторення тричі
			for(let column=1; column<4; column++){ //прохід по колонкам
				for(let row=0; row<4; row++){ //прохід по рядам
					if(gridMemory[row][column]!=0){
						if(gridMemory[row][column-1]!=0){ 
							let first=document.querySelector(`.block${gridMemory[row][column]}`)
							let second=document.querySelector(`.block${gridMemory[row][column-1]}`)
							if(first.dataset.value==second.dataset.value&&repeat==3){
								second.dataset.value*=2
								second.innerHTML=`${second.dataset.value}`
								gridMemory[row][column]=0
								score+=first.dataset.value*2
								scoreElement.innerHTML=`${score}`
								setTimeout(function(){first.classList.remove(`opacity1`)},20)
								let p=((+second.dataset.value).toString(2).length-2)/10
								second.style.cssText=`transform:translateX(${gridCords[column-1]}px) 
									translateY(${gridCords[row]}px); z-index:0; background:${rgb(p)};`
								first.style.cssText=`transform:translateX(${gridCords[column-1]}px) 
									 translateY(${gridCords[row]}px); z-index:0; background:${rgb(p)};`
								setTimeout(function(){first.remove()},300)
								if(second.dataset.value==2048&&win==0){endOfTheGame(`W`);win++}
								create++ 
							}
						}
						if(gridMemory[row][column-1]==0&&(repeat<3||repeat>3)){
							let element=document.querySelector(`.block${gridMemory[row][column]}`)
							let p=((+element.dataset.value).toString(2).length-2)/10
							element.style.cssText=`transform: translateX(${gridCords[column-1]}px) 
								 translateY(${gridCords[row]}px); background:${rgb(p)};`
							gridMemory[row][column-1]=gridMemory[row][column] //добавляєми блок в нове місце памяті
							gridMemory[row][column]=0 //видаляєио блок зі старого місця в памяті
							create++
						}	
					}
				}
			}
		}}
	if(event.code==`ArrowRight`||event.code==`KeyD`||swipe==`Right`){
		for(let repeat=0; repeat<5; repeat++){ //повторення тричі
			for(let column=2; column>=0; column--){
				for(let row=0; row<4; row++){ //прохід по рядам
					if(gridMemory[row][column]!=0){
						if(gridMemory[row][column+1]!=0){ 
							let first=document.querySelector(`.block${gridMemory[row][column]}`)
							let second=document.querySelector(`.block${gridMemory[row][column+1]}`)
							if(first.dataset.value==second.dataset.value&&repeat==3){
								second.dataset.value*=2
								second.innerHTML=`${second.dataset.value}`
								gridMemory[row][column]=0
								score+=first.dataset.value*2
								scoreElement.innerHTML=`${score}`
								setTimeout(function(){first.classList.remove(`opacity1`)},20)
								let p=((+second.dataset.value).toString(2).length-2)/10
								second.style.cssText=`transform:translateX(${gridCords[column+1]}px) 
									translateY(${gridCords[row]}px); z-index:0; background:${rgb(p)};`
								first.style.cssText=`transform:translateX(${gridCords[column+1]}px) 
									 translateY(${gridCords[row]}px); z-index:0; background:${rgb(p)};`
								setTimeout(function(){first.remove()},300)
								if(second.dataset.value==2048&&win==0){endOfTheGame(`W`);win++}
								create++ 
							}
						}
						if(gridMemory[row][column+1]==0&&(repeat<3||repeat>3)){
							let element=document.querySelector(`.block${gridMemory[row][column]}`)
							let p=((+element.dataset.value).toString(2).length-2)/10
							element.style.cssText=`transform: translateX(${gridCords[column+1]}px) 
								 translateY(${gridCords[row]}px); background:${rgb(p)};`
							gridMemory[row][column+1]=gridMemory[row][column] //добавляєми блок в нове місце памяті
							gridMemory[row][column]=0 //видаляєио блок зі старого місця в памяті
							create++
						}	
					}
				}
			}
		}}
	if(create>0){createNewBlock()}
	if(create==0){
		let possibleMoves=0
		let FreeSpaces=0
		for(let rows of gridMemory){for(let position of rows){if(position==0){FreeSpaces++}}}
		if(FreeSpaces==0){
			for(let row of gridMemory){
				let rowNumber=gridMemory.indexOf(row)
				for(let position of row){
					let positionNumber=row.indexOf(position)
					let element=document.querySelector(`.block${position}`)
					if(rowNumber>0){
						let elemTop=document.querySelector(`.block${gridMemory[rowNumber-1][positionNumber]}`)
						if(element.dataset.value==elemTop.dataset.value){possibleMoves++}
					}
					if(rowNumber<3){
						let elemBot=document.querySelector(`.block${gridMemory[rowNumber+1][positionNumber]}`)
						if(element.dataset.value==elemBot.dataset.value){possibleMoves++}
					}		
					if(positionNumber>0){
						let elemLeft=document.querySelector(`.block${gridMemory[rowNumber][positionNumber-1]}`)
						if(element.dataset.value==elemLeft.dataset.value){possibleMoves++}
					}		
					if(positionNumber<3){
						let elemRight=document.querySelector(`.block${gridMemory[rowNumber][positionNumber+1]}`)
						if(element.dataset.value==elemRight.dataset.value){possibleMoves++}
					}
				}
			}
			if(FreeSpaces==0&&possibleMoves==0){endOfTheGame('L')}
		}}
	setTimeout(function(){
		document.addEventListener(`keydown`,move)
		document.addEventListener('touchstart', handleTouchStart)
		document.addEventListener('touchmove', handleTouchMove);
	},310)}

function endOfTheGame(result){
	if(result==`L`){ 
		removeEventListener(`keydown`,move)
		document.removeEventListener('touchstart', handleTouchStart)
		document.removeEventListener('touchmove', handleTouchMove);
		setTimeout(function(){location.reload()},3000)
		wORl.innerHTML=`Game Over`
		if(localStorage.records<score){localStorage.setItem(`records`, score)}
	}
	if(result==`W`){
		wORl.innerHTML=`Win`
	}
	endScreen.style.display=`block`
	setTimeout(function(){
		endScreen.style.transition=`0.5s`
		endScreen.style.opacity=`1`},10)
	setTimeout(function(){endScreen.style.opacity=`0`},2000)
	document.querySelector(`.score`).innerHTML=`Score: ${score}`}	

function handleTouchStart(event){
	startX=event.touches[0].clientX
	startY=event.touches[0].clientY}

function handleTouchMove(event){
	currentX=event.touches[0].clientX
	currentY=event.touches[0].clientY

	let deltaX=currentX-startX, deltaY=currentY-startY

	if(Math.abs(deltaX)>Math.abs(deltaY)){
		if(deltaX>0){
			move(`Right`)
		}else{
			move(`Left`)}
	}else{
		if(deltaY>0){
			move(`Down`)
		}else{
			move(`Up`)} 
		if (deltaY > 20) {
    		event.preventDefault()
  		}
	}} 

window.mobileAndTabletCheck=function(){
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;};



"use strict";

let gridCords=[10,120,230,340],blockNumber=1,g,
	win=0,score=0,startX,startY,currentX,currentY,
	gamespace=document.querySelector(`.gamespace`),
	wORl=document.querySelector(`.text`),
	scoreElement=document.querySelector(`.now_score`),
	isMobile=/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
	isTablet=/tablet|ipad|android|kindle/i.test(navigator.userAgent.toLowerCase()),
	isDesktop=!isMobile&&!isTablet,
	mediaQueryList=window.matchMedia("(max-width: 767px)"),
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
	if(isMobile||window.innerWith<768||mediaQueryList.matches){
		document.querySelector(`.game`).style.cssText=`transform: translate(-50%,-60%) scale(2);`
		document.querySelector(`.settings_button`).style.cssText=`width:100px; height:100px;`
		document.querySelector(`.settings_screen_menue`).style.cssText=`transform: translate(-50%,-70%) scale(2);`
	}else{
		document.querySelector(`.delete_score`).style.cssText=`transition: 0.3s;`
		document.querySelector(`.settings_button`).style.cssText=`transition: 0.5s;`
		document.querySelector(`.button`).style.cssText=`transition:0.3s;`}
	document.querySelector(`.background1`).style.transition=`1s`
	document.querySelector(`.background2`).style.transition=`1s`
	document.querySelector(`.background3`).style.transition=`1s`
	document.querySelector(`.background4`).style.transition=`1s`
	document.querySelector(`.background5`).style.transition=`1s`
	})
document.addEventListener(`keydown`,function(){if(event.code==`KeyR`){location.reload()}})
document.querySelector(`.reset`).addEventListener(`click`, function(){location.reload()})
document.addEventListener('contextmenu',function(event){event.preventDefault();});
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
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
	removeEventListener(`keydown`,move)
	document.removeEventListener('touchstart', handleTouchStart)
	document.removeEventListener('touchmove', handleTouchMove);
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
	}
	setTimeout(function(){
		addEventListener(`keydown`,move)
		document.addEventListener('touchstart', handleTouchStart)
		document.addEventListener('touchmove', handleTouchMove);
	},310)}

function rgb(p){
	return `rgb(${Math.round(g[0][0]+(g[1][0]-g[0][0])*p)},
		${Math.round(g[0][1]+(g[1][1]-g[0][1])*p)},
		${Math.round(g[0][2]+(g[1][2]-g[0][2])*p)})`}

function move(swipe){
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
		}}}

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

	var deltaX=currentX-startX
	var deltaY=currentY-startY

	if(Math.abs(deltaX)>Math.abs(deltaY)) {
		if(deltaX>0){move(`Right`)
		}else{move(`Left`)}
	}else{
		if(deltaY>0){move(`Down`)
		}else{move(`Up`)} 
		if (deltaY > 20) {
    		event.preventDefault()
  		}
	}} 



Function.prototype.bind2 = function (context){
    let that = this;
    return function(){
        return that.apply(context);
    }
}

class Board{
    constructor(){
        this.cardsFlipped = 0;
        this.memoryValues = [];
        this.memoryCardIds = [];
        this.shuffledArray = [];
        this.cardShirt = 'shirt_1';
        this.cardSuit = '&#9824;';
        this.cardColor = 'black';
    }

    createCardsArray(numberOfElements){
        let arr = [];
        numberOfElements = numberOfElements / 2;
        if(numberOfElements <= 8){
            for(let i = 0; i < numberOfElements; i++){
                arr.push(String(i+2));
                arr.push(String(i+2));
            }
        }
        else{
            numberOfElements = 9;
            for(let i = 0; i < numberOfElements; i++){
                arr.push(String(i+2));
                arr.push(String(i+2));
            }
            arr.push('J');
            arr.push('J');
            arr.push('Q');
            arr.push('Q');
            arr.push('K');
            arr.push('K');
            arr.push('A');
            arr.push('A');
        }
        return arr;
    }

    createNewBoard(array){
        this.cardsFlipped = 0;
        let output = '';
        array = this.shuffleArray(array);
        let arrayLength = array.length;
        for(let i = 0; i < arrayLength; i++){
            output += '<div id="card_' + i + '" onclick="board.flipCard(this, \'' + array[i] + '\')"><div class="front"></div><div class="back"></div></div>';
        }
        document.getElementById('memory_board').innerHTML = output;
    }

    shuffleArray(array){
        let i = array.length;
        let j;
        let temp;
    
        while(--i > 0){
            j = Math.floor(Math.random() * (i+1));
            temp = array[j];
            array[j] = array[i];
            array[i] = temp;
        }
        this.shuffledArray = array;
        return array;
    }

    flipCard(div, val){
        if(this.memoryValues.length < 2){
            div.style.transform = 'rotateY(180deg)';
            div.firstElementChild.style.color = this.cardColor;
            div.firstElementChild.innerHTML = val + this.cardSuit;
            
            if(this.memoryValues.length == 0){
                this.memoryValues.push(val);
                this.memoryCardIds.push(div.id);
            }
            else if(this.memoryValues.length == 1){
                this.memoryCardIds.push(div.id);
                if(this.memoryCardIds[0] == this.memoryCardIds[1]){
                    this.memoryCardIds.pop();
                    return;
                }

                this.memoryValues.push(val);
                this.memoryCardIds.push(div.id);

                if(this.memoryValues[0] == this.memoryValues[1]){
                    let foo = this.opacityCards.bind2(this);
                    //let foo = () => this.opacityCards();
                    setTimeout(foo, 700);
                } 
                else {
                    let foo = this.flip2Back.bind2(this);
                    //let foo = () => this.flip2Back();
                    setTimeout(foo, 700);
                }
            }
        }
    }
    
    opacityCards(){
        this.cardsFlipped += 2;
        let firstCard = document.getElementById(this.memoryCardIds[0]);
        let secondCard = document.getElementById(this.memoryCardIds[1]);
        
        firstCard.style.opacity = '0';
        secondCard.style.opacity = '0';
        
        this.memoryValues = [];
        this.memoryCardIds = [];
    

        if(this.cardsFlipped == this.shuffledArray.length){
            let memoryBoard = document.getElementById('memory_board');
            memoryBoard.style.font = '20px Arial san-sefif';
            memoryBoard.innerHTML = "Congratulations! You won!</br>";
            stopwatch.flag = true;
            document.getElementById('choose').style.display = 'none';
        }
    }

    flip2Back(){
        let firstCard = document.getElementById(this.memoryCardIds[0]);
        let secondCard = document.getElementById(this.memoryCardIds[1]);
        firstCard.style.transform = 'rotateY(0deg)';
        secondCard.style.transform = 'rotateY(0deg)';
        
        this.memoryValues = [];
        this.memoryCardIds = [];
    }

    changeShirt(e){ 
            this.cardShirt = e.target.id;

            if(this.cardShirt == 'choose_shirt'){
                return;
            }
            let cards = document.querySelectorAll('#memory_board > div');
            let cardsLength = cards.length;
        
            for(let i = 0; i < cardsLength; i++){
                cards[i].lastElementChild.style.background = 'url(img/' + this.cardShirt + '.jpg) no-repeat';
            }
        
            let imgs = document.getElementById('choose_shirt').getElementsByTagName('img');
            let imgsLength = imgs.length;
        
            for(let i = 0; i < imgsLength; i++){
                imgs[i].style.border = '0';
            }
            
            e.target.style.border = '3px solid #9B1A45';

    }

    changeSuit(e){
        if(e.target.id == 'choose_suit'){
            return;
        }
        let id = e.target.id;
    
        switch(id){
            case 'suit_1': this.cardSuit = '&#9824;'; break;
            case 'suit_2': this.cardSuit = '&#9829;'; break;
            case 'suit_3': this.cardSuit = '&#9827;'; break;
            case 'suit_4': this.cardSuit = '&#9830;'; break;
        }
    
        if(id == 'suit_1' || id == 'suit_3'){
            this.cardColor = 'black';
        }
        else{
            this.cardColor = 'red';
        }
    
        let memoryLength =  this.memoryCardIds.length;
        if(memoryLength != 0){
            for(let i = 0; i < memoryLength; i++){
                let val = document.getElementById(this.memoryCardIds[i]).firstElementChild.textContent;
                val = val.substring(0, val.length - 1);
                document.getElementById(this.memoryCardIds[i]).firstElementChild.innerHTML = val + this.cardSuit;
    
                document.getElementById(this.memoryCardIds[i]).firstElementChild.style.color = this.cardColor;
            }
        }
    
        let imgs = document.getElementById('choose_suit').getElementsByTagName('img');
        let imgsLength = imgs.length;
    
        for(let i = 0; i < imgsLength; i++){
            imgs[i].style.border = '0';
        }
        e.target.style.border = '3px solid #9B1A45';
    }
}
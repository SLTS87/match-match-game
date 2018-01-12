class Stopwatch{
    constructor(){
        this.seconds = 0;
        this.flag = false;
        this.startTime = new Date();
        this.currentTime = 0;
    }

    secondsFormat (seconds){
        if (seconds < 10){
            return '00:0'+seconds;
        }
        else if(seconds < 60){
            return '00:'+seconds;
        }
        else if(seconds < 600){
            if ((seconds % 60) < 10){
                return '0'+Math.floor(seconds/60)+':0'+(seconds%60);
            }
            else{
                return '0'+Math.floor(seconds/60)+':'+(seconds%60);
            }
        }
        else if(seconds < 3600){
            if ((seconds % 60) < 10){
                return Math.floor(seconds/60)+':0'+(seconds%60);
            }
            else{
                return Math.floor(seconds/60)+':'+(seconds%60);
            }
        }
        else{
            return '--:--';
        }
    }

    secondsCounter(){
        if(this.flag){
            return false;
        }
        this.currentTime = new Date();
        this.seconds = parseInt((this.currentTime - this.startTime) / 1000);
    
        document.getElementById("stopwatch").getElementsByTagName("span")[0].innerHTML = this.secondsFormat(this.seconds);

    }
}

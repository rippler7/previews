var adDiv, orangeTab, introText,q2,q3,q4,q5,yesno,yesBtn,noBtn, callNum, dName, idName, posterBox, playBtn, pauseBtn;
var currFrame = 0;
var mouseOverState = false;
var madeChoice = false;
var choice = 0;
var docName;
var vidBox;
var videos = [
    ["intro.mp4"],
    ["q2.mp4","q2n.mp4","q2y.mp4"],
    ["q3.mp4","q3n.mp4","q3y.mp4"],
    ["q4.mp4","q4n.mp4","q4y.mp4"],
    ["closing.mp4"]
]

function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    } else {
        startAd();
    }
}

function startAd() {
    adDiv = document.getElementById("ad");
    posterBox = document.getElementById("posterBox");
    vidBox = document.getElementById("video1");
    dName = document.getElementById("doctorName");
    idName = document.getElementById("idName");
    orangeTab = document.getElementById("orangeBar");
    introText = document.getElementById("introText1");
    yesno = document.getElementById("yesno");
    yesBtn = document.getElementById("yesBtn");
    noBtn = document.getElementById("noBtn");
    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");
    q2 = document.getElementById("q2");
    q3 = document.getElementById("q3");
    q4 = document.getElementById("q4");
    q5 = document.getElementById("q5");
    callNum = document.getElementById("callNum");
    addEventListeners();
}

function renderItems(frame){
    switch(frame){
        case 0:
            //
            console.log("showing items for frame 1...");
            break;
        case 1:
            //
            console.log("showing items for frame 2...");
            TweenMax.to(introText,1,{alpha:0,onComplete:function(){
                introText.style.display = "none";
                TweenMax.to(dName,0.5,{right:"0px"});
                TweenMax.to(q2,1,{alpha:1,onStart:function(){
                    q2.style.display = "block";
                },onStart:function(){
                    //TweenMax.to(dName,0.5,{right:"-162px"});
                    showChoices();
                }});
            }});
            posterBox.style.background = "transparent url('images/poster"+(frame+1)+".jpg') center no-repeat";
            idName.style.background = "transparent url('images/d1.png') center no-repeat";
            break;
        case 2:
            //
            console.log("showing items for frame 3...");
            TweenMax.to(q2,1,{alpha:0,onComplete:function(){
                    q2.style.display = "none";
                    TweenMax.to(dName,0.5,{right:"-162px",onComplete:function(){
                        idName.style.background = "transparent url('images/d2.png') center no-repeat";
                        TweenMax.to(dName,0.5,{right:"0px"});
                    }});
                    TweenMax.to(q3,1,{alpha:1,onStart:function(){
                        q3.style.display = "block";
                    }});
                },onStart:function(){
                    showChoices();
                }});
                posterBox.style.background = "transparent url('images/poster"+(frame+1)+".jpg') center no-repeat";
            break;
        case 3:
            //
            console.log("showing items for frame 4...");
            TweenMax.to(q3,1,{alpha:0,onComplete:function(){
                q3.style.display = "none";
                TweenMax.to(dName,0.5,{right:"-162px",onComplete:function(){
                        idName.style.background = "transparent url('images/d3.png') center no-repeat";
                        TweenMax.to(dName,0.5,{right:"0px"});
                    }});
                TweenMax.to(q4,1,{alpha:1,onStart:function(){
                    q4.style.display = "block";
                }});
            },onStart:function(){
                    showChoices();
                }});
                posterBox.style.background = "transparent url('images/poster"+(frame+1)+".jpg') center no-repeat";
            break;
        case 4:
            //
            removeChoices();
            console.log("showing items for frame 5...");
            TweenMax.to(q4,1,{alpha:0,onComplete:function(){
                q4.style.display = "none";
                TweenMax.to(dName,0.5,{right:"-162px"});
                TweenMax.to(q5,1,{alpha:1,onStart:function(){
                    q5.style.display = "block";
                }});
            }});
            callNum.style.background = "#FFF url('') center no-repeat";
            posterBox.style.background = "transparent url('images/poster"+(frame+1)+".jpg') center no-repeat";
            break;
        default:
            break;
    }
}

function showChoices(){
    TweenMax.to(yesno,1,{alpha:1,onStart:function(){
        yesno.style.display = "block";
    }});
}

function removeChoices(){
    
    yesno.style.opacity = 0;
    yesno.style.display = "none";
    TweenMax.killTweensOf(yesno);
    
    finishedQ = false;
}

function mouseOver(e){
    vidBox.style.opacity = 1;
    adDiv.removeEventListener("mouseover",mouseOver);
    mouseOverState = true;
    madeChoice = true;
    vidBox.currentTime = 0;
    vidBox.removeAttribute('muted');
    TweenMax.to(orangeTab,1,{top:"410px"});
    pauseBtn.style.display = "block";
    playBtn.style.display = "none";
    vidBox.muted = false;
    vidBox.play();
}

function checkCue(){
    console.log(vidBox.duration);
    vidBox.currentTime = 0;
    vidBox.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
    if(madeChoice){
        setNext(currFrame+1,0,false);
    } 
}

function setNext(f,c,m){
    currFrame = f;
    madeChoice = m;
    vidBox.setAttribute('poster','images/poster'+(f+1)+'.jpg');
    vidBox.setAttribute('src','videos/'+videos[f][c]);
    if(c == 0){
        renderItems(f);
        noBtn.style.background = "transparent url('images/noBtn.png') center no-repeat";
        yesBtn.style.background = "transparent url('images/yesBtn.png') center no-repeat";
        yesBtn.addEventListener("click",chosen);
        noBtn.addEventListener("click",chosen);
    }
}

function chosen(e){
    console.log("click!");
    if(e.target.id == 'noBtn'){
        choice = 1;
    } else {
        choice = 2;
    }
    this.style.backgroundImage = "url('images/"+e.target.id+"O.png')";
    yesBtn.removeEventListener("click",chosen);
    noBtn.removeEventListener("click",chosen);
    madeChoice = true;
    console.log(this);
    setNext(currFrame,choice,true);
}

function addEventListeners() {
    document.getElementById("clickthrough-button").addEventListener("click", clickthrough);
    document.getElementById("user-action-button").addEventListener("click", userActionCounter);
    adDiv.addEventListener("mouseover",mouseOver);
    banner.addEventListener("click",clickthrough);
    vidBox.addEventListener("ended",checkCue);
    yesBtn.addEventListener("click",chosen);
    noBtn.addEventListener("click",chosen);
}

function clickthrough(e) {
    var item = e.target.id;
    if(item != "yesBtn" && item != "noBtn"){
        if(item != video1 && item != playBtn && item != pauseBtn && item != p1 && item != p2){
             if(vidBox){
                if(vidBox.paused == false){
                    EB.clickthrough();
                    vidBox.pause();
                    pauseBtn.style.display = "none";
                    playBtn.style.display = "block";
                } else {
                    pauseBtn.style.display = "block";
                    playBtn.style.display = "none";
                    vidBox.play();
                }
            }
        } else {
            if(vidBox.paused == false){
                vidBox.pause();
                pauseBtn.style.display = "none";
                playBtn.style.display = "block";
            } else {
                vidBox.play();
                pauseBtn.style.display = "block";
                playBtn.style.display = "none";
            }
        }
    }
    console.log("video");
    console.log("click: "+e.target.id);
}

function userActionCounter() {
    EB.userActionCounter("CustomInteraction");
}

window.addEventListener("load", initEB);

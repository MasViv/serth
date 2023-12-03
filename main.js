song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseyNet is on :)");
}

function draw()
{
    image(video,0,0,600,500);

    fill("red");
    stroke("green");
    strokeWeight(5);
    
    circle(rightWristY,rightWristX,20);
if(scoreRightWrist>0.2)
{
    if (rightWristY>0&&rightWristY<=100)
    {
        document.getElementById("speed").innerHTML="speed 0.5x"
        rate(0.5)
    }

    else if (rightWristY>100&&rightWristY<=200)
    {
        document.getElementById("speed").innerHTML="Speed 1x"
        rate(1)
    }    
    
    else if (rightWristY>200&&rightWristY<=300)
    {
        document.getElementById("speed").innerHTML="SpEeD 1.5x"
        rate(1.5)
    }    
    
    else if (rightWristY>400&&rightWristY<=500)
    {
        document.getElementById("speed").innerHTML="SPEED 2x"
        rate(2)
    }    
    
    else if (rightWristY>500&&rightWristY<=600)
    {
        document.getElementById("speed").innerHTML="SAIKUUUUUUUU 2.5x"
        rate(2.5)
    }
}

    if (scoreLeftWrist>0.2)
    {
    circle(leftWristX,leftWristY,15);
    InNumberleftWristY=Number(leftWristY);
    remove_decimal=Math.floor(InNumberleftWristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="Da vOlUmE Is " + volume;
    song.setVolume(volume);
    }
}

function preload()
{
    song=loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if (results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("ScOrErIgHtWrIsT" + scoreRightWrist + "ScOrElEfTwRiSt is" + scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("LWX=" + leftWristX + "LWY" + leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("RWX=" + rightWristX + "RWY" + rightWristY);
    }
}


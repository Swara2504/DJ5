song1= "";
song2="";
song1_status="";
song2_status="";
leftWristX= 0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload()
{
    song1= loadSound("Roadtrip.mp3");
    song2= loadSound("Faded.mp3");
}
function setup()
{
    canvas= createCanvas(250,250);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video, 0,0,250,250);
    fill("#FF10F0");
    stroke("#FF10F0");
    song1.play();
    song1_status= song1.isPlaying();
    song2_status= song2.isPlaying();
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
    if(song2_status==false)
    {
        song2.play();
        document.getElementById("song_names").innerHTML="song= "+ "Roadtrip";
    }
}
if(scoreRightWrist>0.2)
    {
        circle(rightWristX,rightWristY,20);
        song2.stop();
    if(song1_status==false)
    {
        song1.play();
        document.getElementById("song_names").innerHTML="song= "+ "Faded";
    }
}
}
function modelLoaded()
{
    console.log("poseNet is Initialized");
}
function gotPoses(results)
{
  if(results.length > 0)
  {
      console.log("results");
      leftWristX= results[0].pose.leftWrist.x;
      leftWristY= results[0].pose.leftWrist.y;
      scoreLeftWrist= results[0].pose.keypoints[9].score;
      console.log("scoreLeftWrist = "+ scoreLeftWrist);
      console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
      rightWristX= results[0].pose.rightWrist.x;
      rightWristY= results[0].pose.rightWrist.y;
      console.log("rightWristX=" + rightWristX +"rightWristY=" + rightWristY);
  }
}
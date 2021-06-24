const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const progress = document.querySelector('#progress')
const title = document.querySelector('#title')
const curTime = document.querySelector('#cur_point')
const endTime = document.querySelector('#end_point')
const music = document.getElementById("music_id")

const songs = ["alone"]
let songIndex = 0
loadSong(songs[songIndex])

var playing = false;

function loadSong(song)
{
	music.src = "Nightingale - Norah Jones Cover Song from Come Away With Me Album.mp3"
	title.innerText = music.src.split(/(\\|\/)/g).pop().replace('.mp3','').replace(/%20/g, " ")
}

function smartTime(time)
{
	return time < 10 ? "0" + time.toString().trim() : time;
}

function playSong()
{
	music.play()
	playing = true;
	var endMin = smartTime(Math.floor(music.duration / 60));
	var endSec = smartTime(Math.floor(music.duration % 60));
	endTime.innerText = endMin + " : " + endSec
}

function pauseSong()
{
	music.pause()
	playing = false;
}

function playState()
{
	if(playing)
	{
		pauseSong()
	}else{
		playSong()
	}
}

function changeTime()
{
	music.play()
	music.currentTime = (progress.value / 100) * music.duration
}

music.addEventListener("timeupdate", function(event){
	var curMin = smartTime(Math.floor(music.currentTime / 60));
	var curSec = smartTime(Math.floor(music.currentTime % 60));
	curTime.innerText = curMin + " : " + curSec
	progress.value = (music.currentTime/music.duration) * 100
},false);

dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
  evt.preventDefault();
};

dropContainer.ondrop = function(evt) {
  // pretty simple -- but not for IE :(
  fileInput.files = evt.dataTransfer.files;

  // If you want to use some of the dropped files
  const dT = new DataTransfer();
  dT.items.add(evt.dataTransfer.files[0]);
  fileInput.files = dT.files;
  if(fileInput.files.name.contains(".mp3"))
  {
	  music.src = fileInput.files;
  }

  evt.preventDefault();
};
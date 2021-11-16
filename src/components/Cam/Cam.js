import React, { useState } from 'react';
import './cam.css';

function Cam() {
	const [playing, setPlaying] = useState(false);

	//const HEIGHT = 500;
	//const WIDTH = 500;

	const startVideo = () => {
		setPlaying(true);
		navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
					video.srcObject = stream;
				}
			},
			(err) => console.error(err)
		);
	};

	const stopVideo = () => {
		setPlaying(false);
		let video = document.getElementsByClassName('app__videoFeed')[0];
		video.srcObject.getTracks()[0].stop();
	};

	return (
		<div className="cam">
            <div className="cam__input">
				{playing ? (
					<button className="start-stop-button" onClick={stopVideo}>Stop</button>
				) : (
					<button className="start-stop-button" onClick={startVideo}>Start</button>
				)}
			</div>
			<div className="cam__container">
				<video
					
					muted
					autoPlay
					className="app__videoFeed"
				></video>
			</div>
			
		</div>
	);
}

export default Cam;

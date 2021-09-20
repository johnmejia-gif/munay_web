import React from "react";
import "../components/styles/Program.css";
import audio1 from "../assets/media/audio1.mp3";
const Program = () => {
	return (
		<div className="contenedor-program">
			<div>
				{/* <audio
					src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
					controls
					// autoPlay
					loop="1"
				/> */}
				{/* <audio controlsList="nodownload" controls>
					<source
						src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
						type="audio/mpeg"
					/>
				</audio> */}
				<audio controls volume="1.0" autoPlay>
					<source src={audio1} />
				</audio>
			</div>

			<h2>Contendio de Programa de Felicidad</h2>
		</div>
	);
};

export default Program;

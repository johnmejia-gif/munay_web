import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ActivityProgress = ({ percentage }) => {
	console.log("<<<<< En percentage hay:", percentage);
	return (
		<Box sx={{ width: 700 }}>
			<Slider
				disabled
				aria-label="Restricted values"
				value={percentage}
				// valueLabelFormat={valueLabelFormat}

				// step={null}
				valueLabelDisplay="on"
			/>
			{/* <Slider
				disabled
				defaultValue={percentage}
				aria-label="Disabled slider"
				valueLabelDisplay="on"
				
			/> */}
		</Box>
	);
};

export default ActivityProgress;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// const marks = [
//   {
//     value: 0,
//     label: '0°C',
//   },
//   {
//     value: 20,
//     label: '20°C',
//   },
//   {
//     value: 37,
//     label: '37°C',
//   },
//   {
//     value: 100,
//     label: '100°C',
//   },
// ];

// function valuetext(value) {
//   return `${value}°C`;
// }

// export default function DiscreteSliderLabel() {
//   return (
//     <Box sx={{ width: 300 }}>
//       <Slider
//         aria-label="Always visible"
//         defaultValue={80}
//         getAriaValueText={valuetext}
//         step={10}
//         marks={marks}
//         valueLabelDisplay="on"
//       />
//     </Box>
//   );
// }

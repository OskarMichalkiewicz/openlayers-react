import React, { useContext, useEffect } from "react";
import { MousePosition } from "ol/control";
import MapContext from "../Map/MapContext";
import { createStringXY } from "ol/coordinate";

const MousePositionControl = ({lenght: len}) => {
	const { map } = useContext(MapContext);

    let mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        target: document.querySelector('#coords-container > .MuiChip-label')
    });
	useEffect(() => {
		if (!map) return;


		map.controls.push(mousePositionControl);

		return () => map.controls.remove(mousePositionControl);
	}, [map]);
    
    useEffect(() => {
        mousePositionControl.setCoordinateFormat(createStringXY(len))
    }, [len])

	return null;
};

export default MousePositionControl;
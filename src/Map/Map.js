import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import { Select, Translate, defaults} from 'ol/interaction';

const Map = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
    const view = new ol.View({ zoom, center })
    var select = new Select();
    var translate = new Translate({
        features: select.getFeatures()
    })
    

	useEffect(() => {
		let options = {
            interactions: defaults().extend([select, translate]),
			view: view,
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, []);

	useEffect(() => {
		if (!map) return;
		map.getView().setZoom(zoom);
	}, [map]);

	useEffect(() => {
		if (!map) return;
		map.getView().setCenter(center)
	}, [map])

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;
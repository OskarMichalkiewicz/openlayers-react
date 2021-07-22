import React, { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Draw, Modify } from 'ol/interaction';

const DrawInteraction = ({type, withModify}) => {
	const { map } = useContext(MapContext);
    
    const vectorSource = new VectorSource()
    const vectorLayer = new VectorLayer({
        source: vectorSource
    })
    let modify = new Modify({source: vectorSource})
    let draw = new Draw({
        source: vectorSource,
        type: type || 'LineString'
    });
    
	useEffect(() => {
		if (!map) return;
        if (!type) return;


		map.addInteraction(draw);
        map.addLayer(vectorLayer)
        if(withModify){
            map.addInteraction(modify)
        }

		return () => {
            map.removeInteraction(draw)
            map.removeInteraction(modify)
        };
	}, [map, type]);

	return null;
};

export default DrawInteraction;
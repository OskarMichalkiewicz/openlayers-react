import React, { useContext, useEffect } from "react";
import { OverviewMap } from "ol/control";
import MapContext from "../Map/MapContext";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const OverviewMapControl = ({ source }) => {
	const { map } = useContext(MapContext);

        let element = document.getElementsByClassName('ol-overviermap')
	useEffect(() => {
		if (!map) return;

		let overviewMapControl = new OverviewMap({
            layers: [
                new TileLayer({
                    source: new OSM({})
                })
            ],
            collapsible: false,
            collapsed: false
        });

		map.controls.push(overviewMapControl);

		return () => map.controls.remove(overviewMapControl);
	}, [map]);

    useEffect(() => {
        if(element.style){

        console.log(element)
        element.style.width = '100px'
        element.style.height = '100px'
        }
    }, [element])
	return null;
};

export default OverviewMapControl;
import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";

const TileLayer = ({ source, zIndex = 0, name, visible }) => {
	const { map } = useContext(MapContext);
    
		let tileLayer = new OLTileLayer({
			source,
			zIndex,
            name,
            visible
		});

	useEffect(() => {
		if (!map) return;
		map.addLayer(tileLayer);
		tileLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(tileLayer);
			}
		};
	}, [map]);
    useEffect(() => {
       if(!map) return;
       tileLayer.setVisible(visible) 
    }, [visible])

	return null;
};

export default TileLayer;

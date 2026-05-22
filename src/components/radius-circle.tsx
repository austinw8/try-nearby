import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export function RadiusCircle({
	lat,
	lng,
	radiusMiles,
}: {
	lat: number;
	lng: number;
	radiusMiles: number;
}) {
	const map = useMap();
	const mapsLib = useMapsLibrary("maps");

	useEffect(() => {
		if (!map || !mapsLib) return;

		const circle = new mapsLib.Circle({
			map,
			center: { lat, lng },
			radius: radiusMiles * 1609.34,
			fillColor: "#4fb8b2",
			fillOpacity: 0.12,
			strokeColor: "#4fb8b2",
			strokeOpacity: 0.6,
			strokeWeight: 2,
		});

		return () => circle.setMap(null);
	}, [map, mapsLib, lat, lng, radiusMiles]);

	return null;
}

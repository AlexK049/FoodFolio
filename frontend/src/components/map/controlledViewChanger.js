import { useMap } from "react-leaflet"
import { useEffect } from "react";

const ControlledViewChanger = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, []);
    return null;
}

export default ControlledViewChanger;

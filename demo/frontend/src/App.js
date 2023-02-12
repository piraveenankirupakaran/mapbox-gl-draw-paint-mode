import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "./App.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import PaintMode from "mapbox-gl-draw-paint-mode";
import "maplibre-gl/dist/maplibre-gl.css";
import { extendDrawBar } from "./utils/extendDrawBar";

const App = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const mapboxDrawRef = useRef(null);

  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/hybrid/style.json?key=HMeYX3yPwK7wfZQDqdeC",
      center: [16.62662018, 49.2125578],
      zoom: 14,
    });

    console.log("afafa");

    mapboxDrawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      modes: {
        ...MapboxDraw.modes,
        draw_paint_mode: PaintMode,
      },
    });
    console.log(mapboxDrawRef.current);
    const drawPaintBtn = {
      on: "click",
      action: () => {
        mapboxDrawRef.current.changeMode("draw_paint_mode");
      },
      classes: ["paint-brush-icon"],
      title: "Paint tool",
    };
    const drawPointBtn = {
      on: "click",
      action: () => {
        mapboxDrawRef.current.changeMode("draw_point");
      },
      classes: ["mapbox-gl-draw_point"],
      title: "Marker tool",
    };
    const trashBtn = {
      on: "click",
      action: () => {
        mapboxDrawRef.current.trash();
      },
      classes: ["mapbox-gl-draw_trash"],
      title: "Delete",
    };
    let drawBar = new extendDrawBar({
      draw: mapboxDrawRef.current,
      buttons: [
        // drawLineString,
        // drawPolygon,
        drawPaintBtn,
        drawPointBtn,
        trashBtn,
      ],
    });
    mapRef.current.addControl(drawBar);
  }, []);
  return (
    <div className="map-wrap">
      <button
        className="custom_btn"
        onClick={() => {
          console.log(mapboxDrawRef.current.getAll());
          console.log(mapRef.current.queryRenderedFeatures());
        }}
      >
        Get Feature Collection (Check Console)
      </button>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
      <div className="footer">
        <p>Custom Mode Developed By Piraveenan Kirupakaran</p>
      </div>
    </div>
  );
};

export default App;
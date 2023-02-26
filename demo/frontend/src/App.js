import React, { useRef, useEffect, useState } from "react";
import maplibregl from "!maplibre-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./App.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import PaintMode from "mapbox-gl-draw-paint-mode";
import "maplibre-gl/dist/maplibre-gl.css";
import { extendDrawBar } from "./utils/extendDrawBar";
import styles from "./drawStyles";

const App = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const mapboxDrawRef = useRef(null);
  const [colour, setColour] = useState("#000000");

  useEffect(() => {
    if (!mapContainer) {
      return;
    }
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/hybrid/style.json?key=HMeYX3yPwK7wfZQDqdeC",
      center: [16.62662018, 49.2125578],
      zoom: 14,
    });

    mapboxDrawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
        line_string: true,
      },
      modes: {
        ...MapboxDraw.modes,
        draw_paint_mode: PaintMode,
      },
      styles: styles,
    });
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

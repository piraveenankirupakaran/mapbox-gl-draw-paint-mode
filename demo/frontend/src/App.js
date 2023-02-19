import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "./App.css";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import PaintMode from "mapbox-gl-draw-paint-mode";
import "maplibre-gl/dist/maplibre-gl.css";
import { extendDrawBar } from "./utils/extendDrawBar";

import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
mapboxgl.workerClass = MapboxWorker; // Wire up loaded worker to be used instead of the default

const App = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const mapboxDrawRef = useRef(null);
  const [markerLabel, setMarkerLabel] = useState("Marker Label");

  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [lineColor, setLineColor] = useState("#f4424b");

  const handleMarkerButtonClick = () => {
    setIsAddingMarker(!isAddingMarker);
  };

  const handleMapClick = (event) => {
    const lngLat = event.lngLat;
    const marker = new maplibregl.Marker({ draggable: true })
      .setLngLat(lngLat)
      .setPopup(null)
      .addTo(mapRef.current);

    setIsAddingMarker(false);
  };

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
      // styles: [
      //   // Customize the line style to use the lineColor state variable
      //   {
      //     id: "gl-draw-line",
      //     type: "line",
      //     filter: [
      //       "all",
      //       ["==", "$type", "LineString"],
      //       ["!=", "mode", "static"],
      //     ],
      //     layout: {
      //       "line-cap": "round",
      //       "line-join": "round",
      //     },
      //     paint: {
      //       "line-color": lineColor,
      //       "line-dasharray": [0.2, 2],
      //       "line-width": 4,
      //       "line-opacity": 0.7,
      //     },
      //   },
      // ],
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

  useEffect(() => {
    if (!mapContainer || !isAddingMarker) {
      return;
    }

    mapRef.current.on("click", handleMapClick);
    return () => {
      mapRef.current.off("click", handleMapClick);
    };
  }, [isAddingMarker]);

  return (
    <div className="map-wrap">
      <button onClick={handleMarkerButtonClick}>
        {isAddingMarker ? "Stop Adding Markers" : "Add Marker"}
      </button>
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

// import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
// import maplibregl from "maplibre-gl";
// import "./App.css";
// import Map from "react-map-gl";
// import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import PaintMode from "mapbox-gl-draw-paint-mode";
// import "maplibre-gl/dist/maplibre-gl.css";

// const App = () => {
//   const [selectedLayer, setSelectedLayer] = useState(null);
//   const [showTrash, setShowTrash] = useState(false);
//   const mapRef = useRef(null);
//   const mapboxDrawRef = useRef(null);
//   const [features, setFeatures] = useState([]);

//   useEffect(() => {
//     console.log("afafa 1");

//     if (!mapRef.current) return;
//     else {
//       const maplibreMap = mapRef.current.getMap();
//       console.log("afafa 2");

//       maplibreMap.on("draw.selectionchange", (event) => {
//         console.log("afafa 3");

//         const selectedFeatures = event.features;
//         if (!selectedFeatures || selectedFeatures.length === 0) {
//           setShowTrash(false);
//           setSelectedLayer(null);
//           return;
//         }

//         // const polygonFeatures = selectedFeatures.filter(
//         //   (feature) => feature.geometry.type === "MultiLineString"
//         // );

//         if (selectedFeatures.length === 0) {
//           setShowTrash(false);
//           setSelectedLayer(null);
//           return;
//         }
//         setSelectedLayer(selectedFeatures[0]);
//         setShowTrash(true);
//       });

//       maplibreMap.on("draw.update", (event) => {
//         const updatedFeature = event.features[0];
//         const featureId = updatedFeature.id;
//         const updatedFeatures = features.map((feature) => {
//           if (feature.id === featureId) {
//             return updatedFeature;
//           }
//           return feature;
//         });
//         setFeatures(updatedFeatures);
//       });
//     }
//   }, [features]);

//   useEffect(() => {
//     document.addEventListener("keydown", (event) => {
//       if (event.key === "Backspace" && selectedLayer) {
//         console.log("Backspace pressed");
//         handleTrashButton();
//       }
//     });
//   }, [showTrash]);

//   const handleMultiLineStringButton = () => {
//     if (!mapRef.current) return;

//     const maplibreMap = mapRef.current.getMap();
//     if (!mapboxDrawRef.current) {
//       console.log("Running! ");

//       mapboxDrawRef.current = new MapboxDraw({
//         displayControlsDefault: false,
//         controls: {
//           polygon: false,
//           trash: false,
//         },
//         defaultMode: "paint_mode",
//         //create a mode which add points and add texts beside the point
//         styles: [
//           {
//             id: "gl-draw-line-inactive",
//             type: "line",
//             filter: [
//               "all",
//               ["==", "active", "false"],
//               ["==", "$type", "LineString"],
//               ["!=", "mode", "static"],
//             ],
//             layout: {
//               "line-cap": "round",
//               "line-join": "round",
//             },
//             paint: {
//               "line-color": [
//                 "case",
//                 ["==", ["get", "user_my_property"], null],
//                 "#fff",
//                 "#000",
//               ],
//               "line-width": 16,
//             },
//           },
//           {
//             id: "gl-draw-line-active",
//             type: "line",
//             filter: [
//               "all",
//               ["==", "$type", "LineString"],
//               ["==", "active", "true"],
//             ],
//             layout: {
//               "line-cap": "round",
//               "line-join": "round",
//             },
//             paint: {
//               "line-color": [
//                 "case",
//                 ["==", ["get", "user_my_property"], null],
//                 "#fff",
//                 "#000",
//               ],
//               "line-width": 6,
//             },
//           },
//           {
//             id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
//             type: "circle",
//             filter: [
//               "all",
//               ["==", "meta", "vertex"],
//               ["==", "$type", "Point"],
//               ["!=", "mode", "static"],
//             ],
//             paint: {
//               "circle-radius": 2,
//               "circle-color": [
//                 "case",
//                 ["==", ["get", "user_my_property"], null],
//                 "#f6343f",
//                 "#f6343f",
//               ],
//             },
//           },
//           {
//             id: "gl-draw-polygon-and-line-vertex-inactive",
//             type: "circle",
//             filter: [
//               "all",
//               ["==", "meta", "vertex"],
//               ["==", "$type", "Point"],
//               ["!=", "mode", "static"],
//             ],
//             paint: {
//               "circle-radius": [
//                 "case",
//                 ["==", ["get", "user_my_property"], null],
//                 5,
//                 10,
//               ],
//               "circle-color": [
//                 "case",
//                 ["==", ["get", "user_my_property"], null],
//                 "#f6343f",
//                 "#f6343f",
//               ],
//             },
//           },
//         ],
//         modes: Object.assign(
//           {
//             paint_mode: PaintMode,
//           },
//           MapboxDraw.modes
//         ),
//       });

//       console.log("Running 2! ");
//       console.log("Afafafafafa", mapboxDrawRef.current);
//       maplibreMap.addControl(mapboxDrawRef.current);
//       console.log("Afafafafafa", maplibreMap);
//     } else {
//       mapboxDrawRef.current.changeMode("paint_mode");
//     }

//     maplibreMap.on("draw.create", (event) => {
//       // Add the new polygon to the features array
//       console.log("features: ", mapboxDrawRef.current.getAll());
//       console.log(event);
//       console.log("afafa", event.features[0].geometry.coordinates);

//       setFeatures((prevFeatures) => {
//         let newFeatures = [...prevFeatures];
//         const newFeature = event.features.slice(-1).pop();
//         let duplicate = false;
//         for (let i = 0; i < prevFeatures.length; i++) {
//           if (prevFeatures[i].id === newFeature.id) {
//             duplicate = true;
//             break;
//           }
//         }
//         console.log(duplicate);
//         console.log("NewFeature: ", newFeature);
//         if (!duplicate) {
//           newFeatures.push(newFeature);
//         }
//         return newFeatures;
//       });
//     });
//   };

//   const handlePolygonButton = () => {
//     if (!mapRef.current) return;

//     const maplibreMap = mapRef.current.getMap();
//     if (!mapboxDrawRef.current) {
//       console.log("Running! ");

//       mapboxDrawRef.current = new MapboxDraw({
//         displayControlsDefault: false,
//         controls: {
//           polygon: false,
//           trash: false,
//         },
//         defaultMode: "draw_polygon",
//         modes: Object.assign(
//           {
//             paint_mode: PaintMode,
//           },
//           MapboxDraw.modes
//         ),
//       });

//       console.log("Running 2! ");
//       console.log("Afafafafafa", mapboxDrawRef.current);
//       maplibreMap.addControl(mapboxDrawRef.current);
//       console.log("Afafafafafa", maplibreMap);
//     } else {
//       mapboxDrawRef.current.changeMode("draw_polygon");
//     }

//     maplibreMap.on("draw.create", (event) => {
//       // Add the new polygon to the features array
//       console.log("features: ", mapboxDrawRef.current.getAll());
//       console.log(event);
//       console.log("afafa", event.features[0].geometry.coordinates);

//       setFeatures((prevFeatures) => {
//         let newFeatures = [...prevFeatures];
//         const newFeature = event.features.slice(-1).pop();
//         let duplicate = false;
//         for (let i = 0; i < prevFeatures.length; i++) {
//           if (prevFeatures[i].id === newFeature.id) {
//             duplicate = true;
//             break;
//           }
//         }
//         console.log(duplicate);
//         console.log("NewFeature: ", newFeature);
//         if (!duplicate) {
//           newFeatures.push(newFeature);
//         }
//         return newFeatures;
//       });
//     });
//   };

//   const handleLineButton = () => {
//     if (!mapRef.current) return;

//     const maplibreMap = mapRef.current.getMap();
//     if (!mapboxDrawRef.current) {
//       console.log("Running! ");

//       mapboxDrawRef.current = new MapboxDraw({
//         displayControlsDefault: false,
//         controls: {
//           polygon: false,
//           trash: false,
//         },
//         defaultMode: "draw_line_string",
//         modes: Object.assign(
//           {
//             paint_mode: PaintMode,
//           },
//           MapboxDraw.modes
//         ),
//       });

//       console.log("Running 2! ");
//       console.log("Afafafafafa", mapboxDrawRef.current);
//       maplibreMap.addControl(mapboxDrawRef.current);
//       console.log("Afafafafafa", maplibreMap);
//     } else {
//       mapboxDrawRef.current.changeMode("draw_line_string");
//     }

//     maplibreMap.on("draw.create", (event) => {
//       // Add the new polygon to the features array
//       console.log("features: ", mapboxDrawRef.current.getAll());
//       console.log(event);
//       console.log("afafa", event.features[0].geometry.coordinates);

//       setFeatures((prevFeatures) => {
//         let newFeatures = [...prevFeatures];
//         const newFeature = event.features.slice(-1).pop();
//         let duplicate = false;
//         for (let i = 0; i < prevFeatures.length; i++) {
//           if (prevFeatures[i].id === newFeature.id) {
//             duplicate = true;
//             break;
//           }
//         }
//         console.log(duplicate);
//         console.log("NewFeature: ", newFeature);
//         if (!duplicate) {
//           newFeatures.push(newFeature);
//         }
//         return newFeatures;
//       });
//     });
//   };

//   const handleTrashButton = () => {
//     if (!mapboxDrawRef.current) return;
//     console.log(selectedLayer.id);
//     mapboxDrawRef.current.delete(selectedLayer.id);
//     setFeatures((prevFeatures) =>
//       prevFeatures.filter((feature) => feature.id !== selectedLayer.id)
//     );
//     setShowTrash(false);
//     setSelectedLayer(null);
//   };

//   return (
//     <div className="map-wrap">
//       <button onClick={handleMultiLineStringButton}>Add MultiLineString</button>
//       <button onClick={handlePolygonButton}>Add Polygon</button>
//       <button onClick={handleLineButton}>Add Line String</button>

//       {showTrash && <button onClick={handleTrashButton}>Trash</button>}
//       <button
//         onClick={() => {
//           console.log("afafaafa: ", mapboxDrawRef.current.getAll());
//         }}
//         //maplibreref.current
//       >
//         Affa
//       </button>

//       <Map
//         ref={mapRef}
//         mapLib={maplibregl}
//         initialViewState={{
//           longitude: 16.62662018,
//           latitude: 49.2125578,
//           zoom: 14,
//         }}
//         style={{ width: "100%", height: "100%" }}
//         mapStyle="https://api.maptiler.com/maps/hybrid/style.json?key=HMeYX3yPwK7wfZQDqdeC"
//       ></Map>
//     </div>
//   );
// };

// export default App;

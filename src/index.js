import * as doubleClickZoom from "./lib/double_click_zoom";
import * as Constants from "./lib/Constants";
import "./icon/paint-brush.css";

var PaintMode = {};

PaintMode.onSetup = function () {
  var state = {};
  state.features = [];
  state.currentLine = null;
  state.currentLineFeature = null;
  doubleClickZoom.disable(this);
  return state;
};

PaintMode.onTap = PaintMode.onClick = function (state, e) {
  if (e.originalEvent.detail === 2) {
    state.features.push(state.currentLine);
    state.currentLine = null;
    this.changeMode(Constants.modes.SIMPLE_SELECT);
    this.map.fire("draw.create", {
      type: "FeatureCollection",
      features: state.features.map((coordinates) => ({
        type: "Feature",
        properties: {},
        geometry: {
          type: "MultiLineString",
          coordinates: [coordinates],
        },
      })),
    });
    doubleClickZoom.disable(this);
  } else {
    state.currentLine = state.currentLine || [];
    state.currentLine.push([e.lngLat.lng, e.lngLat.lat]);
  }
};

PaintMode.onMouseMove = function (state, e) {
  if (!state.currentLine) return;

  state.currentLine.push([e.lngLat.lng, e.lngLat.lat]);

  if (!state.currentLineFeature) {
    state.currentLineFeature = this.newFeature({
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiLineString",
        coordinates: [state.currentLine],
      },
    });
    this.addFeature(state.currentLineFeature);
    this.map.fire("draw.selectionchange", {
      featureIds: [state.currentLineFeature.id],
    });
  } else {
    let updatedLineFeature = this.newFeature({
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiLineString",
        coordinates: [state.currentLine],
      },
    });
    this.deleteFeature(state.currentLineFeature.id);
    state.currentLineFeature = updatedLineFeature;
    this.addFeature(state.currentLineFeature);
    this.map.fire("draw.selectionchange", {
      featureIds: [state.currentLineFeature.id],
    });
  }
};

PaintMode.toDisplayFeatures = function (state, geojson, display) {
  display(geojson);
};

export default PaintMode;

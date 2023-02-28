# mapbox-gl-draw-paint-mode

# Mapbox Paint Mode

This is a custom mode for [@mapbox/mapbox-gl-draw]() that allows user to paint freestyle on the map
This mode used to be one of the core modes prior to the `v1.0.0` release of Mapbox Draw.

To install:
`npm i mapbox-gl-draw-paint-mode`

Live demo is [here](https://mapbox-gl-draw-paint-mode.vercel.app/)

![Demo gif](docs/PaintModeDemo.gif)

## Features:

- Allows users to draw freestyle on the map by drawing multiple lines.
- The drawn feature can be moved to a different location.
- The drawn feature can be deleted.
- Works with both MapLibre GL and Mapbox GL _(Demo uses MapLibre GL)_

## Getting Started

To use the Mapbox GL Draw Freestyle Mode, you need to have a Mapbox GL JS map with Mapbox GL Draw integrated into it. Follow these steps to get started:

1. Add Mapbox GL JS/MapLibre GL and Mapbox GL Draw to your project. You can use a package manager like npm to install the dependencies.

   ` npm i mapbox-gl mapbox-gl-draw mapbox-gl-draw-paint-mode`

   ` npm i maplibre-gl mapbox-gl-draw mapbox-gl-draw-paint-mode`

2. Import Mapbox GL JS/MapLibre GLMapbox GL JS and Mapbox GL Draw in your project.

   ```
   import maplibregl from "!maplibre-gl";
   import mapboxgl from 'mapbox-gl';
   import MapboxDraw from '@mapbox/mapbox-gl-draw';
   import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
   ```

3. Import the PaintMode.

   ```
    import PaintMode from "mapbox-gl-draw-paint-mode";
    ....
    const draw = new MapboxDraw({
           displayControlsDefault: false,
           controls: {
           },

           modes: Object.assign({
               draw_paint_mode: PaintMode,
           }, MapboxDraw.modes),

           styles: drawStyle,
       });
   ```
To use the Mapbox GL Draw Freestyle Mode, simply click anywhere on the map to start drawing. To stop drawing, double click on the map. The drawn feature can then be moved or deleted using the Mapbox Draw toolbar.

## Contributing
If you find a bug or have a feature request, please open an issue or submit a pull request on the GitHub repository.


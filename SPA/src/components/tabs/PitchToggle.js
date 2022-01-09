import CustomZoomControl from '../tabs/CustomZoomControl';

class PitchToggle {

    constructor({ bearing = -20, pitch = 70, minpitchzoom = null }) {
      this._bearing = bearing;
      this._pitch = pitch;
      this._minpitchzoom = minpitchzoom;
    }
  
    onAdd(map) {
      this._map = map;
      let _this = this;
  
      this._btn = document.createElement('button');
      this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
      this._btn.type = 'button';
      this._btn['aria-label'] = 'Toggle Pitch';
      this._btn.onclick = function () {
        if (map.getPitch() === 0) {
          let options = { pitch: _this._pitch, bearing: _this._bearing };
          if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
            options.zoom = _this._minpitchzoom;
          }
          //3d
          /* ativar orbit do mapa 3D*/
          map.dragRotate.enable();
          map.touchZoomRotate.enableRotation();
          map.easeTo(options);
          _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d';
          map.addLayer({
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
  
              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,/*aqui*/
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          });
          let zoomControl = new CustomZoomControl();
          map.addControl(zoomControl, 'bottom-right');
        } else {
          //2d
          document.getElementById("myRange").remove();
          /* desativar orbit do mapa 2D*/
          map.dragRotate.disable();
          map.touchZoomRotate.disableRotation();

          if (map.getLayer("3d-buildings")) {
            map.removeLayer("3d-buildings");
          }
          map.easeTo({ pitch: 0, bearing: 0 });
          _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
  
        }
      };
  
  
      this._container = document.createElement('div');
      this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
      this._container.appendChild(this._btn);
  
      return this._container;
    }
  };

  export default PitchToggle;
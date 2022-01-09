import React, { Component } from "react";
import { Row } from "react-bootstrap";
import mapboxgl from 'mapbox-gl';
import '../structure/site.css';
import PitchToggle from '../tabs/PitchToggle';

mapboxgl.accessToken = 'pk.eyJ1IjoidmVyYXBpbnRvMjEiLCJhIjoiY2tpdGU1djNoMmIxbDJxcDMxMGlkMzFwayJ9.dh2-1KNwIQnTZceaY1POAA';

var { axiosMDR } = require('../core/URLConfiguration');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: undefined,
      lat: 41.2084,
      lng: -8.3464,
      zoom: 11,
      markers: [],
      nodes: [],
      lines: [],
      linepaths: [],
      paths: [],
      pathNodes: [],
      polylines: [],
      linesAdded: [],
      vezes: []

    };

    this.getNodes();
    this.getLines();
    this.getLinePaths();
    this.getPaths();
    this.getPathNodes();

  }


  getNodes = async () => {
    try {

      let n = await axiosMDR.get("node");
      this.setState({
        nodes: n.data,
      });
    } catch (error) {
      console.log("error:" + error);
    }
  };

  getLines = async () => {
    try {

      let l = await axiosMDR({
        method: 'get',
        url: 'line',
        params: {
          filter: "NOFILTER"
        }
      });
      this.setState({
        lines: l.data,
      });
    } catch (error) {
      console.log("error:" + error);
    }
  };

  getLinePaths = async () => {
    try {
      let lp = await axiosMDR({
        method: 'get',
        url: 'linePath',
        params: {
          filter: "NOFILTER"
        }
      });
      this.setState({
        linepaths: lp.data,
      });
    } catch (error) {
      console.log("error:" + error);
    }
  };

  getPaths = async () => {
    try {

      let p = await axiosMDR.get("path");
      this.setState({
        paths: p.data,
      });
    } catch (error) {
      console.log("error:" + error);
    }
  };

  getPathNodes = async () => {
    try {

      let pn = await axiosMDR.get("pathNode");
      this.setState({
        pathNodes: pn.data,
      });
    } catch (error) {
      console.log("error:" + error);
    }
  };



  buildMarkers = () => {
    let markers = [];
    let nodes = this.state.nodes;
    let cor = 'red';
    nodes.forEach((node) => {
      if (node.IsDepot === true) { cor = 'blue' }
      else { cor = 'red' }
      new mapboxgl.Marker({
        color: cor,
        scale: 1
      })
        .setLngLat([node.Longitude, node.Latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(node.Name))
        .addTo(this.state.map);
    });
    this.setState({ markers: markers });
  };

  buildPolylines = () => {

    let linhas = this.state.lines;
    let id = "0";
    linhas.forEach((linha) => {
      var cor = this.checkColor(linha.color);

      let cords = [];

      for (var i = 0; i < linha.linePaths.length; i++) {
        for (var j = 0; j < this.state.linepaths.length; j++) {
          if (linha.linePaths[i] === this.state.linepaths[j].code) {
            for (var l = 0; l < this.state.paths.length; l++) {
              if (this.state.linepaths[j].path === this.state.paths[l].code) {
                var pathNos = this.state.paths[l].pathNodes;
                for (var x = 0; x < pathNos.length; x++) {
                  for (var y = 0; y < this.state.pathNodes.length; y++) {

                    if (pathNos[x] === this.state.pathNodes[y].code) {
                      for (var z = 0; z < this.state.nodes.length; z++) {
                        if (this.state.pathNodes[y].node === this.state.nodes[z].ShortName) {
                          cords.push([this.state.nodes[z].Longitude, this.state.nodes[z].Latitude]);
                        }
                      }
                    }
                  }
                }
                //pathNos=[];
              }
            }
          }
        }
        this.buildPolyline(cords, cor, id, linha.name);
        id = (Number(id) + 1).toString();
        cords = [];
      }

    });

  }

  checkColor = (cor) => {
    var color, rgbValues, r, g, b;
    var color = "#111111";

    if (cor.includes('#')) {
      color = cor;
    }
    else {

      rgbValues = cor.substring(cor.lastIndexOf("(") + 1,
        cor.lastIndexOf(")")).split(",");
      r = rgbValues[0];
      g = rgbValues[1];
      b = rgbValues[2];

      var res = "#" + (this.rgbToHex(r) + this.rgbToHex(g) + this.rgbToHex(b));

      color = res.trim();

    }

    return color;
  }

  checkIfLineIsAdded(coord) {
    let coordRev = [coord[2], coord[3], coord[0], coord[1]];
    for (let j = 0; j < this.state.linesAdded.length; j++) {
      if (JSON.stringify(this.state.linesAdded[j]) == JSON.stringify(coord) ||
        JSON.stringify(this.state.linesAdded[j]) == JSON.stringify(coordRev)) {
        return j;
      }
    }
    return -1;
  }

  buildPolyline = (coords, color, id, lineName) => {

    console.log(lineName);

    var map = this.state.map;
    var newCoords = [];
    var d = 0.000015;
    var xA1, yA1, xB1, yB1, r, sinBeta, cosBeta, xA2, yA2, xB2, yB2,i;
    
    for ( i = 0; i<coords.length; i++) {
      
      var coord1 = coords[i];
      var coord2 = coords[i + 1];
      if(coord2 != undefined){
      var index = this.checkIfLineIsAdded([coord1, coord2]);
      if (index == -1) {
        this.state.linesAdded.push([coord1, coord2]);
         this.state.vezes[i] = 0;
      } else {
        this.state.vezes[i] = this.state.vezes[i] + 1;
      }

       xA1 = coord1[0];
       yA1 = coord1[1];
       xB1 = coord2[0];
       yB1 = coord2[1];

       r = Math.sqrt((Math.pow((xB1 - xA1), 2) + Math.pow((yB1 - yA1), 2)))
       sinBeta = (xB1 - xA1) / r
       cosBeta = -(yB1 - yA1) / r
       
      if(!this.state.vezes[i]/2==0){
        d = d * Math.ceil((this.state.vezes[i]/2));
      } else{
        d = -d * Math.ceil((this.state.vezes[i]/2));
      }
      
       xA2 = xA1 + d * cosBeta
     
       yA2 = yA1 + d * sinBeta

       xB2 = xB1 + d  * cosBeta

       yB2 = yB1 + d  * sinBeta
       

      newCoords.push([xA2, yA2]);
      
      }
    }
    newCoords.push([xA2,yA2]);
    

    this.state.map.addSource(id, {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {
          'description':
            '<strong>' + lineName + '</strong>'
        },
        'geometry': {
          'type': 'LineString',
          'coordinates': newCoords
        }
      }
    });
    
    this.state.map.addLayer({
      'id': id,
      'type': 'line',
      'source': id,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': color,
        'line-width': 6
      }
    });

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.state.map.on('mouseenter', id , function (e) {

      map.getCanvas().style.cursor = 'pointer';

      var description = e.features[0].properties.description;


      popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
    });

    this.state.map.on('mouseleave', id, function () {
      map.getCanvas().style.cursor = '';
      popup.remove();

    });
    this.setState({map:map});
    

  }

  rgbToHex = (rgb) => {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };



  createCustomLayer = (name, longitude, latitude, modelLink) => {
    // parameters to ensure the model is georeferenced correctly on the map
    var modelOrigin = [longitude, latitude];
    var modelAltitude = 0;
    var modelRotate = [Math.PI / 2, 0, 0];

    var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    var modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since our 3D model is in real world meters, a scale transform needs to be
      * applied since the CustomLayerInterface expects units in MercatorCoordinates.
      */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    };

    var THREE = window.THREE;

    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    var customLayer = {
      id: name,
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        var light1 = new THREE.PointLight(0xffffff, 5.0);
        light1.position.set(0, 30, -30);
        light1.castShadow = true;
        this.scene.add(light1);
        this.scene.add(new THREE.PointLightHelper(light1, 1));
        light1.shadow.mapSize.width = 512; // default
        light1.shadow.mapSize.height = 512; // default
        light1.shadow.camera.near = 0.5; // default
        light1.shadow.camera.far = 500;
        // use the three.js GLTF loader to add the 3D model to the three.js scene
        var loader = new THREE.GLTFLoader();
        loader.load(modelLink,
          function (gltf) {
            gltf.scene.traverse(function (model) {
              if (model.isMesh) {
                model.castShadow = true;
                //model.receiveShadow = false;
              }
            });
           
            this.scene.add(gltf.scene);
            const s = new THREE.Box3().setFromObject(gltf.scene).getSize(new THREE.Vector3(0, 0, 0));
            const sizes = [s.x, s.y, s.z];
            const planeSize = Math.max(...sizes) * 10;
            const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
            const planeMat = new THREE.ShadowMaterial();
            planeMat.opacity = 0.5;
            let plane = new THREE.Mesh(planeGeo, planeMat);
            plane.rotateX(-Math.PI / 2);
            plane.receiveShadow = true;
            this.scene.add(plane);
          }.bind(this), undefined, function (error) {

            console.error(error);

          }
        );
        
        this.map = map;
        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true
        });

        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        //this.renderer.shadowMap.type = THREE.BasicShadowMap;

      },
      render: function (gl, matrix) {
        var rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        var rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        var rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        var m = new THREE.Matrix4().fromArray(matrix);
        var l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();

      }

    };
    return customLayer;
  }


  componentDidMount() {
    let map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    map.addControl(new PitchToggle({ minpitchzoom: 11 }), "top-right");

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    this.setState({ map: map });
    map.on('load', () => {
      this.buildMarkers();
      this.buildPolylines();
      this.state.nodes.forEach((node) => {
        map.addLayer(this.createCustomLayer(node.Name, node.Longitude, node.Latitude, node.Model), 'waterway-label');
      });

      this.setState({ map: map });
    });




  }

  render() {
    return (

      <div style={{ height: "100vh", width: "100%" }}>
        <Row className="margem">
          <div>
            <div>
              <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
            </div>
            <div ref={el => this.mapContainer = el} className='mapContainer' />
          </div>
        </Row>
      </div>
    );
  }
};
export default Map;




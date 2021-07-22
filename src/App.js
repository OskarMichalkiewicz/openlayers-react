import React, { useState } from "react";
import Map from "./Map";
import { Layers, TileLayer } from "./Layers";
import { osm } from "./Source";
import { fromLonLat } from "ol/proj";
import { Controls, FullScreenControl, MousePositionControl } from "./Controls";
import { Interactions, DrawInteraction } from "./Interactions";
import TileWMS from 'ol/source/TileWMS';
import LayerSwitcher from "./Layers/LayerSwitcher";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import TableControl from './Controls/TableControl'

import mapConfig from "./config.json";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px',
    position: 'absolute',
    left: 'calc(100% - 200px)',
    top: '20px',
    zIndex: 9999,
    background: "rgba(256, 256, 256, 0.9)"
  },
  formControl: {
    margin: theme.spacing(3),
  },
  chip: {
      background: 'white',
      border: '1px grey solid',
      position: "absolute",
      width: '150px',
      top: '95%',
      left: '0',
      right: '0',
      margin: '0 auto',
      zIndex: 999
  },
  iconButton: {
      position: 'absolute',
      zIndex: 99999,
      bottom: '6%',
      left: '0',
      right: '0',
      margin: '0 auto',
  },
  table: {
      minWidth: 650,
      zIndex: 99999
  },
}));



const App = () => {
  const classes = useStyles();
  const [center] = useState(mapConfig.center);
  const [zoom] = useState(mapConfig.defaultZoom);
  
  const osmSource = osm();

    const [type, setType] = useState(null)
    const handleIntChange = (value) => {
        setType(type === value ? null : value);
    }
  
    const [checked, setChecked] = useState(
        new Array(mapConfig.WMS.length).fill(false)
    );
    
    const handleChange = (position) => {
        const UpdatedCheckedState = checked.map((item, index) => index === position ? !item : item);
        
        setChecked(UpdatedCheckedState);
    }
    const tileLayers = mapConfig.WMS.map((source, index) => checked[index] && <TileLayer key={source.name} source={new TileWMS(source)} zIndex={index*10} name={source.name} visible={true}/>)

        
  return (
    <div>
    <CssBaseline/>
      <Chip className={classes.chip} id='coords-container' />
        <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Draw Interactions</FormLabel>
            <FormGroup>
                {mapConfig.interactions.draw.map((item) => (
                    <FormControlLabel
                        control={<Checkbox checked={type === item} onChange={() => handleIntChange(item)} name={item}/>}
                        label={item}
                    />
                ))}
            </FormGroup>
        </FormControl>
        </div>
    <LayerSwitcher checked={checked} handleChange={handleChange} />
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Interactions>
            <DrawInteraction withModify type={type}/>
        </Interactions>
        <Layers sources={tileLayers}>
          <TileLayer source={osmSource} zIndex={0} name='core'/>
          {tileLayers}
        </Layers>
        <Controls>
          <MousePositionControl length={5}/>
      <TableControl/>
        </Controls>
      </Map>
    </div>
  );
};

export default App;

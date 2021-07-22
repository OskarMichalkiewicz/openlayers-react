import React from 'react'
import mapConfig from "../config.json";
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px',
    position: 'absolute',
    left: '1vw',
    top: '20px',
    zIndex: 9999,
    background: "rgba(256, 256, 256, 0.9)"
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));


export default ({checked, handleChange}) => {
  const classes = useStyles();
    return (
        <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Layers</FormLabel>
            <FormGroup>
                {mapConfig.WMS.map((item, index) => (
                    <FormControlLabel
                        control={<Checkbox checked={checked[index]} onChange={() => handleChange(index)} name={item.name}/>}
                        label={item.name}
                    />
                ))}
            </FormGroup>
        </FormControl>
        </div>
    )
}


import React, { useContext, useEffect, useState } from "react";
import MapContext from "../Map/MapContext";
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './tableControl.css'

const useStyles = makeStyles((theme) => ({
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

const TableControl = () => {
    const classes = useStyles();
    const { map } = useContext(MapContext);
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState(null)
    const [tableInfo, setTableInfo] = useState(null)
    const handleOpen = (e) => {
        setOpen(!open)
    }
    
    let tooltipSpan = document.getElementById('tooltip-span');
	useEffect(() => {
		if (!map) return;
        const view = map.getView()
        map.on('pointermove', function(evt){
            const viewResolution =  (view.getResolution());
            map.forEachLayerAtPixel(evt.pixel, (layer) => {
                if(layer.get('name') && layer.get('name') !== 'core'){
                        const url = layer.get('source').getFeatureInfoUrl(
                        evt.coordinate,
                        viewResolution,
                        'EPSG:3857',
                        {'INFO_FORMAT': 'application/json'}
                        );
                    if (url) {
                    fetch(url)
                        .then((response) => response.json())
                        .then((json) => {
                            if(json && json.features[0]) {
                                tooltipSpan.style.display = 'block'
                                setInfo(json.features[0].properties)
                            }  
                        })
                    }
                }else {
                    tooltipSpan.style.display = 'none'
                }
            })
        })
	}, [map]);
    
    useEffect(() => {
        if(!map) return;
        if(!info) return;
        map.on('singleclick', function(e) {
            setTableInfo(info)
        })
        window.onmousemove = function (e) {
            let x = e.clientX,
                y = e.clientY;
            tooltipSpan.style.top = (y + 20) + 'px';
            tooltipSpan.style.left = (x + 20) + 'px';
        };
    }, [map, info])
	return (
        <>
    <Fab size="small" style={{bottom: open ? '130px' : '6%'}} disabled={!tableInfo} className={classes.iconButton} onClick={handleOpen}>
            {open ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
        </Fab>
        <Drawer anchor='bottom' open={open} onClose={handleOpen}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        {tableInfo && Object.keys(tableInfo).map(item => <TableCell>{item}</TableCell>)}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableInfo && Object.values(tableInfo).map(item => <TableCell>{item}</TableCell>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Drawer>
        <span id='tooltip-span'>{info ? info.id ? info.id : info.id1 : ''}</span>
        </>
    )

};

export default TableControl;
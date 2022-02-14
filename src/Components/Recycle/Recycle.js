import React, { useState, useEffect } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import plastic from '../../Images/icons/plastic.svg';
import glass from '../../Images/icons/glass.svg';
import paper from '../../Images/icons/paper.svg';
import can from '../../Images/icons/can.svg';
import { IoMdQrScanner } from 'react-icons/io';
import classes from './Recycle.module.css';
import { useSearchParams } from 'react-router-dom';
import RecycleBinService from '../../Services/recycleBin.service';
import RecycleResult from '../RecycleResult/RecycleResult';
import UserService from '../../Services/user.service';
import UtilService from '../../Services/util.service';

const types = ['plastic', 'glass', 'paper', 'can'];
function Recycle(props) {
    const [type, setType] = useState('');
    const [binId, setBinId] = useState('');
    const [bin, setBin] = useState({});
    const [searchParam, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        setBinId(searchParam.get('binId'));
    }, []);

    const getBinType = async () => {
        try {
            const respond = await RecycleBinService.getBin(binId); 
            setBin(respond.data);
            setType(types.includes(respond.data.type) ?
                respond.data.type : 'other');
        } catch (err) {
            console.error(`get bin failed: ${err}`);
            return;
        }
    }

    useEffect(() => {
        if (binId) {
            getBinType();
        }
    }, [binId]);

    const submitRecycle = async () => {
        try {
            setLoading(true);
            const respond = await UserService.addActivity(
                new Date().toLocaleString(), 
                binId, 
                type,
                await UtilService.fetchAddress(bin.location.lat, bin.location.lng));
            setActivity(respond.data);
            UserService.updateCurrentUser();
        } catch (err) {
            console.error(err);
            setActivity({points: 0});
        }
    }

    return (
        loading ? <RecycleResult proccessing={activity === null} points={activity?.points} /> : <>
            <div className={classes.cover} />

            <h3 className={classes.h3}>
                Are you ready?
            </h3>

            <span className={classes.info}>
                before start to scan, let's select the items you want to recycle
            </span>

            <div className={classes.items}>
                <ItemCard icon={plastic} type='plastic' selected={type === 'plastic' ? true : false} />
                <ItemCard icon={glass} type='glass' selected={type === 'glass' ? true : false} />
                <ItemCard icon={paper} type='paper' selected={type === 'paper' ? true : false} />
                <ItemCard icon={can} type='can' selected={type === 'can' ? true : false} />
                <ItemCard type='other' width='100%' height='41px' selected={type === 'other' ? true : false} />
            </div>

            <a href='/qrscanner' className={classes.a}>
                <IoMdQrScanner style={{ verticalAlign: 'middle' }} /> Scan
            </a>

            {type ? <button className={classes.next} onClick={submitRecycle}></button> : ''}
        </>
    )
}

export default Recycle;
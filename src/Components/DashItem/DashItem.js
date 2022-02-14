import React from 'react';
import { RiCopperCoinLine } from 'react-icons/ri';
import { FaPen, FaTrash } from 'react-icons/fa';
import './DashItem.css';

export default function DashItem(props) {
    function edit() {
        props.edit(props.isCoupon ?
            {
                _id: props._id,
                name: props.name,
                info: props.info,
                code: props.code,
                imgUrl: props.imgUrl,
                cost: props.cost
            } : {
                _id: props._id,
                type: props.type,
                location: props.location,
                maxCapacity: props.maxCapacity,
                currentCapacity: props.currentCapacity
            });
    }
    const focused = props.editing ? { outline: "2px #189A46 solid" } : {};
    return (
        <div className='dash-card' style={focused}>
            {props.isCoupon ?
                <>
                    <img
                        className='dash-img'
                        src={props.imgUrl}
                        alt={props.name}
                    />
                    <div className='dash-content'>
                        <span className='overflow-text' title={props.name}>
                            <b>Name:</b> {props.name}
                        </span>
                        <span className='overflow-text' title={props.info}>
                            <b>Info:</b> {props.info}
                        </span>
                        <span className='overflow-text' title={props.code}>
                            <b>Code:</b> {props.code}
                        </span>
                        <span className='overflow-text' title={props.cost}>
                            <b>Cost:</b> <RiCopperCoinLine style={{ verticalAlign: 'middle' }} /> {props.cost}
                        </span>
                    </div>
                </>
                :
                <>
                    <div className='dash-content'>
                        <img
                            className='dash-img'
                            src={require(`../../Images/icons/${props.type}-bin.png`)}
                            alt={props.type}
                        />
                        <span className='overflow-text' title={props.type}>
                            <b>Type:</b> {props.type}
                        </span>
                        <span className='overflow-text' title={props.location.lat}>
                            <b>Latitude:</b> {props.location.lat}
                        </span>
                        <span className='overflow-text' title={props.location.lng}>
                            <b>Longitude:</b> {props.location.lng}
                        </span>
                        <span className='overflow-text' title={props.maxCapacity}>
                            <b>Max Capacity:</b> {props.maxCapacity}
                        </span>
                        <span className='overflow-text' title={props.currentCapacity}>
                            <b>Current Capacity:</b> {props.currentCapacity}
                        </span>
                    </div>
                </>
            }
            <div className='dash-tool-box'>
                <button className='dash-tool btn-round' onClick={edit}><FaPen /></button>
                <button className='dash-tool btn-round' onClick={() => props.delete(props.index)}><FaTrash /></button>
            </div>
        </div >
    );
}
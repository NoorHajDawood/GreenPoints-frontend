import React, { useState, useEffect } from 'react';
import { BsPlusLg, BsXLg, BsCheckLg } from 'react-icons/bs'
import './DashFormPage.css';

const typeOptions = [
    {
        label: 'Plastic',
        value: 'plastic'
    },
    {
        label: 'Glass',
        value: 'glass'
    },
    {
        label: 'Paper',
        value: 'paper'
    },
    {
        label: 'Can',
        value: 'can'
    },
    {
        label: 'Other',
        value: 'other'
    },
];
export default function DashFormPage(props) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [type, setType] = useState('other');
    const [code, setCode] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [cost, setCost] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [currentCapacity, setCurrentCapacity] = useState('');
    const [isCoupon, setIsCoupon] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsCoupon(props.isCoupon);
        if (props.editing && props.currentObject._id !== id) {
            setId(props.currentObject._id ?? '');
            setName(props.currentObject.name ?? '');
            setInfo(props.currentObject.info ?? '');
            setType(props.currentObject.type ?? 'other');
            setCode(props.currentObject.code ?? '');
            setImgUrl(props.currentObject.imgUrl ?? '');
            setCost(props.currentObject.cost ?? '');
            setLat(props.currentObject.location?.lat ?? '');
            setLng(props.currentObject.location?.lng ?? '');
            setMaxCapacity(props.currentObject.maxCapacity ?? '');
            setCurrentCapacity(props.currentObject.currentCapacity ?? '');
            setError('');
        }
    }, [props]);

    function validateFields() {
        const validURL = (str) => {
            var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return !!pattern.test(str);
        }

        let error = "";
        if (isCoupon && (name === "" || info === "" || code === "" || imgUrl === "")) {
            error += "Fields can't be empty!\n";
        } else if (!isCoupon && type === "") {
            error += "Fields can't be empty!\n";
        }
        if (isCoupon && +cost < 0) {
            error += "Cost can't be negative!\n";
        }
        if (!isCoupon && +maxCapacity <= 0) {
            error += "Max Capacity must be positive!\n";
        }
        if (!isCoupon && +currentCapacity < 0) {
            error += "Current Capacity can't be negative!\n";
        }
        if (imgUrl && !validURL(imgUrl)) {
            error += "Image url is an invalid URL!\n"
        }

        if (error === "") {
            return true;
        }

        setError(error);
        return false;
    }

    function clearFields() {
        setId('');
        setName('');
        setInfo('');
        setType('other');
        setCode('');
        setImgUrl('');
        setCost('');
        setLat('');
        setLng('');
        setMaxCapacity('');
        setCurrentCapacity('');
        setError('');
    }

    function createObject() {
        const obj = {
            _id: id,
            type
        };
        if (isCoupon) {
            obj.name = name;
            obj.info = info;
            obj.code = code;
            obj.imgUrl = imgUrl;
            obj.cost = cost;
        } else {
            obj.location = {
                lat,
                lng
            };
            obj.maxCapacity = +maxCapacity;
            obj.currentCapacity = +currentCapacity;
        }
        return obj;
    }

    function add(e) {
        e.preventDefault();
        if (validateFields()) {
            const obj = createObject();
            clearFields();
            props.add(obj);
        }
    }

    function cancel(e) {
        e.preventDefault();
        clearFields();
        props.cancel();
    }

    function save(e) {
        e.preventDefault();
        if (validateFields()) {
            const obj = createObject();
            clearFields();
            props.save(obj);
        }
    }

    function onHandleChange({ target: { value } }, setCallback) {
        setCallback(value);
    }

    return (
        <div className='dashform-wrapper'>
            <form className='dashform' style={props.editing ? { backgroundImage: "none" } : {}}>
                <span className='dashform-title'>{props.editing ? "Edit a" : "Add a new"} {props.isCoupon ? 'coupon' : 'recycle bin'}</span>
                <input type="hidden" name="id" value={id} />

                {isCoupon ?
                    <>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Name"
                            value={name} onChange={e => onHandleChange(e, setName)}
                            className='overflow-text' />

                        <label htmlFor="info">Information</label>
                        <input type="text" name="info" placeholder="Information"
                            value={info} onChange={e => onHandleChange(e, setInfo)}
                            className='overflow-text' />

                        <label htmlFor="code">Code</label>
                        <input type="text" name="code" placeholder="Code"
                            value={code} onChange={e => onHandleChange(e, setCode)}
                            className='overflow-text' />

                        <label htmlFor="imgUrl">Image url</label>
                        <input type="url" name="imgUrl" placeholder="Image url"
                            value={imgUrl} onChange={e => onHandleChange(e, setImgUrl)}
                            className='overflow-text' />

                        <label htmlFor="cost">Cost</label>
                        <input type="number" name="cost" placeholder="Cost" min="0"
                            value={cost} onChange={e => onHandleChange(e, setCost)}
                            className='overflow-text' />
                    </>
                    :
                    <>
                        <label htmlFor="type">Type</label>
                        <select value={type} onChange={e => onHandleChange(e, setType)}>
                            {typeOptions.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>

                        <label htmlFor="lat">Latitude</label>
                        <input type="number" name="lat" placeholder="Latitude"
                            value={lat} onChange={e => onHandleChange(e, setLat)}
                            className='overflow-text' />

                        <label htmlFor="lng">Longitue</label>
                        <input type="number" name="lng" placeholder="Longitue"
                            value={lng} onChange={e => onHandleChange(e, setLng)}
                            className='overflow-text' />

                        <label htmlFor="maxCapacity">Max Capacity</label>
                        <input type="number" name="maxCapacity" placeholder="Max Capacity" min="0"
                            value={maxCapacity} onChange={e => onHandleChange(e, setMaxCapacity)}
                            className='overflow-text' />

                        <label htmlFor="currentCapacity">Current Capacity</label>
                        <input type="number" name="currentCapacity" placeholder="Current Capacity" min="0"
                            value={currentCapacity} onChange={e => onHandleChange(e, setCurrentCapacity)}
                            className='overflow-text' />
                    </>}


                <div className='dashform-tool-box'>
                    <button className='btn-round' style={{ display: props.editing ? "none" : "block" }}
                        onClick={add}><BsPlusLg /></button>
                    <button className='btn-round' style={{ display: props.editing ? "block" : "none" }}
                        onClick={cancel}><BsXLg /></button>
                    <button className='btn-round' style={{ display: props.editing ? "block" : "none" }}
                        onClick={save}><BsCheckLg /></button>
                </div>
                <div style={{ color: 'red', whiteSpace: "pre-line" }}>{error}</div>
            </form>
        </div>
    );

}
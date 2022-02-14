import React, { useState, useEffect } from 'react';
import classes from './AdminDashboard.module.css'
import CouponService from '../../Services/coupon.service';
import RecycleBinService from '../../Services/recycleBin.service';
import DashFormPage from '../DashFormPage/DashFormPage';
import DashHomePage from '../DashHomePage/DashHomePage';
import ItemCard from '../ItemCard/ItemCard';
import AuthService from '../../Services/auth.service';
import { useNavigate } from 'react-router-dom';


function AdminDashboard(props) {
    const [recycleBins, setRecyclebins] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [editing, setEditing] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [listType, setListType] = useState('Coupons');
    const [currentObject, setCurrentObject] = useState({});
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const initArrays = async () => {
        try {
            setCoupons((await CouponService.getCoupons()).data);
            setRecyclebins((await RecycleBinService.getBins()).data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
        initArrays();
    }, []);

    useEffect(()=>{
        if(user && ! user.moderator){
            navigate('/');
        }
    },[user]);

    const addObject = async (obj) => {
        if (listType === 'Coupons') {
            if (currentObject) {
                try {
                    const result = await CouponService.addCoupon(obj.name, obj.info, obj.code, obj.imgUrl, obj.cost);
                    setCoupons([...coupons, result.data]);
                } catch (err) {
                    console.error(err);
                }
            }
        } else {
            if (currentObject) {
                try {
                    const result = await RecycleBinService.addBin(obj.type, obj.location.lat, obj.location.lng, obj.maxCapacity, obj.currentCapacity);
                    setRecyclebins([...recycleBins, result.data]);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    const cancelEdit = () => {
        setCurrentObject({});
        setEditing(false);
    }

    useEffect(() => {
        cancelEdit();
    },[listType]);

    const saveObject = async (obj) => {
        if (listType === 'Coupons') {
            if (currentObject) {
                try {
                    const result = await CouponService.updateCoupon(obj._id, obj.name, obj.info, obj.code, obj.imgUrl, obj.cost);
                    setCoupons(coupons.map(coupon => coupon._id === obj._id ? obj : coupon));
                } catch (err) {
                    console.error(err);
                }
            }
        } else {
            if (currentObject) {
                try {
                    const result = await RecycleBinService.updateBin(obj._id, obj.type, obj.location.lat, obj.location.lng, obj.maxCapacity, obj.currentCapacity);
                    setRecyclebins(recycleBins.map(bin => bin._id === obj._id ? obj : bin));
                } catch (err) {
                    console.error(err);
                }
            }
        }
        setCurrentObject({});
        setEditing(false);
    }

    const deleteObject = async (id) => {
        if (listType === 'Coupons') {
            try {
                await CouponService.deleteCoupon(id);
                setCoupons(coupons.filter(coupon => coupon._id !== id));
            } catch (err) {
                console.error(err);
            }

        } else {
            try {
                await RecycleBinService.deleteBin(id);
                setRecyclebins(recycleBins.filter(bin => bin._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
        if (id === currentObject._id) {
            cancelEdit();
        }
    }

    const editObject = (obj) => {
        setCurrentObject(obj);
        setEditing(true);
    }

    const searchObject = (searchValue) => {
        setSearchValue(searchValue);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.flexwrapper} style={{gap: 0, textAlign: 'center'}}>
                <ItemCard width='150px' type='Recycle Bin' selected={listType !== 'Coupons'} onClick={setListType} />
                <ItemCard width='150px' type='Coupons' selected={listType === 'Coupons'} onClick={setListType} />
            </div>
            <div className={classes.flexwrapper}>
                <DashHomePage bins={recycleBins} coupons={coupons} searchValue={searchValue}
                    delete={deleteObject} edit={editObject} editObject={currentObject._id ?? ''}
                    search={searchObject} isCoupon={listType === 'Coupons'} />
                <DashFormPage currentObject={currentObject} editing={editing} isCoupon={listType === 'Coupons'}
                    add={addObject} cancel={cancelEdit} save={saveObject} />
            </div>
        </div>
    )
}

export default AdminDashboard;
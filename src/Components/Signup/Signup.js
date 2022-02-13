import React, { useState, useEffect } from 'react';
import profilePic from '../../Images/default-profile-picture.svg';
import ready from '../../Images/ready-picture.svg';
import ItemCard from '../ItemCard/ItemCard';
import classes from './Signup.module.css';

function Signup(props) {
    const [stage, setStage] = useState(0);
    const [title, setTitle] = useState('Please enter your e-mail address');
    const [gender, setGender] = useState('Other');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [picture, setPicture] = useState('');

    useEffect(() => {
        if (stage === 0) {
            setTitle('Please enter your e-mail address');
        } else if (stage === 1) {
            setTitle('Please enter a password');
        } else if (stage === 2) {
            setTitle('What is your name?');
        } else if (stage === 3) {
            setTitle('How old are you?');
        } else if (stage === 4) {
            setTitle('What is your gender?');
        } else if (stage === 5) {
            setTitle('Almost there!\nUpload your image.');
        } else if (stage === 6) {
            setTitle('Your account is ready!');
        }
    }, [stage]);

    const handleChange = (value, callback) => {
        callback(value);
    }

    return (
        <div className={classes.container}>
            <span className={classes.title}>{title}</span>
            {stage === 0 ?
                <input type='email' value={email} placeholder='E-mail' className={classes.input}
                    onChange={e => handleChange(e.target.value, setEmail)} />
                : <></>
            }
            {stage === 1 ?
                <input type='password' placeholder='Password' className={classes.input}
                onChange={e => handleChange(e.target.value, setPassword)} />
                : <></>
            }
            {stage === 2 ?
                <input type='text' placeholder='Your Name' className={classes.input} style={{ width: '50%' }}
                onChange={e => handleChange(e.target.value, setName)} />
                : <></>
            }
            {stage === 3 ?
                <input type='number' placeholder='Your Age' className={classes.input} style={{ width: '30%' }}
                onChange={e => handleChange(e.target.value, setAge)} />
                : <></>
            }
            {stage === 4 ?
                <div className={classes.genders}>
                    <ItemCard type='Male' width='154px' height='76px' onClick={setGender} selected={gender === 'Male' ? true : false}/>
                    <ItemCard type='Female' width='154px' height='76px' onClick={setGender} selected={gender === 'Female' ? true : false}/>
                    <ItemCard type='Other' width='154px' height='76px' onClick={setGender} selected={gender === 'Other' ? true : false}/>
                    
                </div>
                : <></>
            }
            {stage === 5 ?
                <>
                    <img src={profilePic} className={classes.img} />
                    <span className={classes.skip}>SKIP</span>
                </>
                : <></>
            }
            {stage === 6 ?
                <>
                    <img src={ready} />
                    <span className={classes.skip}>Redirecting...</span>
                </>
                : <button className={classes.next}
                onClick={() => setStage(stage + 1)}></button>
            }
        </div>
    )
}

export default Signup;
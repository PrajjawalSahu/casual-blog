import React, { useState, useEffect } from 'react'
import { auth } from './firebase';
import { Button, Container, TextField, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Home from './Home'
import { useHistory } from 'react-router-dom';
import './Auth.css'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        transform: 'translateX(-10%)',
        '& .MuiTextField-root': {
            margin: '15px',
            width: '100%',
            border: '#ff0000',
            display: 'flex',
            flexDirection: 'column',
        },
        '& .MuiButton-root':{
            margin: '15px',
            width: '100%',
            backgroundColor: '#2D4F6B',
            color: 'white',
        }
    },
    paper: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 3, 4),
    },
}));

export default function Auth({ userLog, setUserLog }) {

    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    // const [userLog, setUserLog] = useState(null);
    const validate = () => {
        let temp;
        temp = { username } ? "" : "Please choose a username"
    }

    async function signUp(event) {
        event.preventDefault();
        try {
            await auth
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: username
                    })
                })
            history.push("/");
            // window.location.href = '/';
        }
        catch (error) {
            alert(error.message);
        }

        setUserLog(username);
        setOpen(false);
    }

    async function signIn(event) {
        event.preventDefault();
        try {
            await auth
                .signInWithEmailAndPassword(email, password);
            history.push("/");
            // window.location.href = '/';
        }
        catch (error) {
            alert(error.message);
        }

        setOpenSignIn(false);
    }





    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser?.displayName) {
                //if user has logged in
                // console.log(authUser.displayName);
                setUserLog(authUser.displayName);
            }
        })
    }, [])

    return (
        <div className="Auth-component">
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}      //onClose listens for clicks outside the modal --and-- the inline function sets the state "open" to false when clicked outside the modal that means modal will close when clicked outside
            >
                {
                    <div style={modalStyle} className={classes.paper}>
                        <form className={classes.root} onSubmit={signUp} noValidate autoComplete="off">
                            <TextField
                                required 
                                id="standard-required"
                                label="Username"
                                type="text"
                                // placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            // error
                            // helperText="Some error"
                            />
                            <TextField
                                required={true}
                                type="text"
                                label="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                required={true}
                                type="text"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" onClick={signUp}>Sign Up</Button>
                        </form>
                    </div>
                }
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => { setOpenSignIn(false) }}      //onClose listens for clicks outside the modal --and-- the inline function sets the state "open" to false when clicked outside the modal that means modal will close when clicked outside
            >
                {
                    <div style={modalStyle} className={classes.paper}>
                        <form className={classes.root} onSubmit={signIn} noValidate autoComplete="off">
                            <TextField
                                label="E-mail"
                                type="text"
                                // placeholder="E-mail"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                type="text"
                                label="Password"
                                value={password}
                                required={true}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" onClick={signIn}>Sign In</Button>
                        </form>
                    </div>
                }
            </Modal>

            {userLog ? (
                <div className="login-container">
                    <Button className="auth-page-button" onClick={() => { auth.signOut(); setUserLog(null) }}>Log Out</Button>
                </div>
            ) : (
                <div className="login-container">
                    <div className="login-inner-container">
                        <div className="logo auth-page-logo">
                            casual blogs.
                        </div>
                        <h3 className="auth-page-subheadings">
                            Log in to your account
                        </h3>
                        <Button className="auth-page-button auth-page-button-login" onClick={() => { setOpenSignIn(true) }}>Sign In</Button>
                        <div className="pseudo">
                            <h3 className="auth-page-or">
                                OR
                            </h3>
                        </div>

                        <h3 className="auth-page-subheadings">
                            Create your account
                        </h3>
                        <Button className="auth-page-button" onClick={() => { setOpen(true) }}>Sign Up</Button>
                    </div>
                </div>
            )
            }
            <div className="auth-right-side">
                {/* this is right side */}
            </div>

        </div>
    )
}

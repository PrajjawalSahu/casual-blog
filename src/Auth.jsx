import React, { useState, useEffect } from 'react'
import { auth } from './firebase';
import { Button, Container, TextField, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Home from './Home'
import { useHistory } from 'react-router-dom';

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
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
        temp={username}?"":"Please choose a username"
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
        <div>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}      //onClose listens for clicks outside the modal --and-- the inline function sets the state "open" to false when clicked outside the modal that means modal will close when clicked outside
            >
                {
                    <div style={modalStyle} className={classes.paper}>
                        <form className={classes.root} onSubmit={signUp} noValidate autoComplete="off">
                            <TextField
                                required id="standard-required" 
                                label="UserName"
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
                                label="e-mail"
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
                            <Button onClick={signUp}>Sign Up</Button>
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
                        <form onSubmit={signIn} noValidate autoComplete="off">
                            <TextField
                                type="text"
                                placeholder="E-mail"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                type="text"
                                placeholder="Password"
                                value={password}
                                required={true}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button onClick={signIn}>Sign In</Button>
                        </form>
                    </div>
                }
            </Modal>

            {userLog ? (
                <Button onClick={() => { auth.signOut(); setUserLog(null) }}>Log Out</Button>
            ) : (
                <div className="login-container">
                    <Button onClick={() => { setOpenSignIn(true) }}>Sign In</Button>
                    <Button onClick={() => { setOpen(true) }}>Sign Up</Button>
                </div>
            )
            }


        </div>
    )
}

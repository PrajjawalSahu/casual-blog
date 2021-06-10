import React, {useState, useEffect} from 'react'
import Header from './Header'
import PostList from './PostList.jsx'
import CreatePost from './CreatePost'
import './App.css';

import { Button, Container, Input, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from './firebase';

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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));





function App() {
//useState
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLog, setUserLog] = useState(null); 

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  // console.log(userLog);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser?.displayName){
        //if user has logged in
        console.log(authUser.displayName);
        setUserLog(authUser.displayName);

      }

    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();
  
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
      setUserLog(username);
      setOpen(false);

  }
  
  const  signIn =  (event) => {
    event.preventDefault();
  
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

      setOpenSignIn(false);
  }

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}      //onClose listens for clicks outside the modal --and-- the inline function sets the state "open" to false when clicked outside the modal that means modal will close when clicked outside
      >
        {
          <div style={modalStyle} className={classes.paper}>
            <form>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Password"
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
        onClose={() => {setOpenSignIn(false)}}      //onClose listens for clicks outside the modal --and-- the inline function sets the state "open" to false when clicked outside the modal that means modal will close when clicked outside
      >
        {
          <div style={modalStyle} className={classes.paper}>
            <form>
            <Input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signIn}>Sign In</Button>
            </form>
          </div>
        }
      </Modal>

      {userLog?(
          <Button onClick={() => {auth.signOut(); setUserLog(null)}}>Log Out</Button>
        ): (
          <div className="login-container">
          <Button onClick={() => {setOpenSignIn(true)}}>Sign In</Button>
          <Button onClick={() => {setOpen(true)}}>Sign Up</Button>
          </div>
        )
      }

      {/* header */}
      <Header />
      {/* special feature in central column single row long maybe like trending blogs or something else - not fixed - 1 row of multiple cards*/}
      {/* main central body with lots of posts 
            {so many posts as a list of Post components as i did in to-do list app}
      */}
      {userLog?(
          <CreatePost username={userLog}/>
        ): (
          <div>
          <h2>log in to create a post</h2>
          </div>
        )
      }
      
      

      <PostList />
      {/* footer/ending of some sort (only if needed) */}
    </div>
  );
}

export default App;

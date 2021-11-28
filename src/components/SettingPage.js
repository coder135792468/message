import React, { useContext, useState } from "react";
import { Button, Chip } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import ChatContext from "../store/ChatContext";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
const SettingPage = () => {
  //initilizing chat context;
  const chatContext = useContext(ChatContext);
  const { login, user } = chatContext;

  console.log(auth.currentUser.emailVerified);
  //declaring variables
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(user?.photoUrl ? user.photoUrl : "");
  const [email, setEmail] = useState(user?.email ? user.email : "");
  const [password, setPassword] = useState(user?.password ? user.password : "");

  //events start here

  //for handleing iamge change
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //uploading image to firebase storage
  const uploadImage = () => {
    const uploadTask = storage.ref(`images/${image?.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image?.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            setProgress(0);
            setImage(null);

            db.collection("Users")
              .doc(user?.id)
              .update({
                photoUrl: url,
                lastseen: new Date().toLocaleString("en-US"),
              });
            auth.currentUser.updateProfile({
              photoURL: url,
            });
          });
      }
    );
  };

  //change password
  const changePassword = () => {
    console.log(password);
    auth.currentUser
      .updatePassword(password)
      .then(() => {
        db.collection("Users")
          .doc(user?.id)
          .update({
            password,
          })
          .then(() => {
            alert("Password Update Sucessfully!!!");
          });
      })
      .catch((error) => {
        alert("Somethings wents wrong.\n Please Try Again");
        console.log(error);
      });
  };

  //change email
  const changeEmail = () => {
    auth.currentUser
      .updateEmail(email)
      .then(() => {
        db.collection("Users")
          .doc(user?.id)
          .update({
            email,
          })
          .then(() => {
            alert("Email Update Sucessfully!!!");
          });
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error);
      });
  };

  //send verification link
  const sendVerficationLink = () => {
    auth.currentUser.sendEmailVerification().then(() => {
      alert(
        "Verification Link has been sent.\nPlease verify and login to see verified"
      );
    });
  };
  return login ? (
    <Container>
      <Header>
        <Link to="/">
          <ArrowBackIos />
        </Link>
        <span>Setting</span>
      </Header>

      <Section>
        <Pic>{url && <Image src={url} />}</Pic>
        <UserPic>
          <Progress value={progress} max="100" />
          <input
            style={{ margin: "5px auto" }}
            type="file"
            onChange={handleChange}
          />
          <Button
            style={{ margin: "5px auto" }}
            variant="contained"
            color="primary"
            onClick={uploadImage}
          >
            Upload
          </Button>
          <Chip
            variant="contained"
            color="primary"
            label={
              auth.currentUser.emailVerified ? "Verified Email" : "Not Verified"
            }
          />
        </UserPic>
        <Button
          onClick={sendVerficationLink}
          fullWidth
          variant="contained"
          color="primary"
        >
          Verify Email
        </Button>
      </Section>
      {/* //chnage your email settins */}
      <Section>
        <Input
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          type="text"
          placeholder="Enter new Email"
        />
        <Button
          onClick={changeEmail}
          fullWidth
          variant="contained"
          color="primary"
        >
          Change Email
        </Button>
      </Section>
      <Section>
        <Input
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          type="text"
          placeholder="Enter new Password"
        />
        <Button
          onClick={changePassword}
          fullWidth
          variant="contained"
          color="primary"
        >
          Change Password
        </Button>
      </Section>
    </Container>
  ) : (
    <Redirect to="/login" />
  );
};

const Container = styled.div`
  height: 100%;
  background: white;
  overflow-y: scroll;
`;
const Header = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 5;
  background: white;
  > span:nth-child(2) {
    font-size: 1.3rem;
  }
`;
const Progress = styled.progress`
  width: 100%;
`;
const Section = styled.section`
  background: whitesmoke;
  width: 80%;
  margin: 20px auto;
  padding: 5%;
`;
const Pic = styled.div`
  width: 100px;
  height: 100px;
  background: black;
  margin: 0 auto;
  border-radius: 50%;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const UserPic = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px 0;
`;
const Input = styled.input`
  height: 40px;
  width: 96%;
  margin: 10px 0;
  outline: none;
  border-radius: 40px;
  padding: 0 2%;
  text-align: center;
  border: 2px solid whitesmoke;
`;
export default SettingPage;

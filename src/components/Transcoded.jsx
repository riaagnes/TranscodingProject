import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import axios from "axios";
import pic from "./pic.png";
import media from "./video.png";

const Transcoded = ({ user, onSearch }) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isTranscoded, setTranscode] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [userEmail, setEmail] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [bitRate, setBitRate] = useState(0);
  const [bitRateMessage, setbitRateMessage] = useState("");
  const [url, setUrl] = useState("");
  const [notify, setNotify] = useState("Let's start Transcoding!");

  useEffect(() => {
    if (isLoading) {
      const id = window.setInterval(() => {
        setProgressPercentage((progressPercentage) => progressPercentage + 10);
      }, 2800);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [isLoading]);

  const sendSnS = () => {
    axios
      .post("https://f3l7h6tnse.execute-api.us-west-2.amazonaws.com/test", {
        email: userEmail,
      })
      .then((response) => {
        console.log(userEmail);
      })
      .catch((error) => {
        console.log(userEmail);
        console.log(error);
      });
  };
  let modalElement = "";

  const performSearch = () => {
    if (bitRate === 0 || bitRate > 640000 || bitRate < 64000) {
      setbitRateMessage("Select a bitRate in the range of  64000 and 640000");
      return;
    }
    if (userEmail !== "") {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(userEmail).toLowerCase())) {
        setbitRateMessage(
          "Please enter a vilid email address. eg: joseagnesria@gmail.com"
        );
        return;
      }
      sendSnS();
    }
    setNotify("Transcoding Job in progress..");
    setLoading(true);

    setError("");

    axios
      .get(
        `https://ysahowljk6.execute-api.us-west-2.amazonaws.com/test/transcode?bitrate=${bitRate}`
      )
      .then((response) => {
        console.log("waiting");
        setTimeout(function () {
          setShowHide(!showHide);
          setProgressPercentage(0);
          setLoading(false);
          console.log(response, response);
          setTranscode(true);
          onSearch({ status: "done" });
          setUrl(response.data.url);
          console.log(response.data.url);
          setNotify("Let's start Transcoding!");
          console.log("Waiting complete");
        }, 15000);
      })
      .catch((error) => {
        console.log("waiting");
        setTimeout(function () {
          setShowHide(!showHide);
          setProgressPercentage(0);
          setLoading(false);
          setTranscode(true);
          onSearch({ status: "done" });
          console.log(error);
          console.log("Waiting complete");
          setNotify("Let's start Transcoding!");
        }, 15000);
      });
  };

  let output;

  if (isTranscoded) {
   
    output = (
      <Card className="mb-3" style={{ color: "#000" }}>
        <a href={url} target="_blank">
          <Card.Img src={pic} />
        </a>
        <Card.Body>
          <Card.Title>Video After Transcoding</Card.Title>
        </Card.Body>
      </Card>
    );
  }

  if (progressPercentage === 0) {
    modalElement = (
      <div className="col text-center">
        Would you like to recieve notification about your Transcoding task?
        <label> If yes, Please enter your email:</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="joseagnesria@gmail.com"
        />
        <br></br>
        <label for="quantity">BitRate (between 64000 and 640000):</label>
        <input
          type="number"
          onChange={(e) => setBitRate(e.target.value)}
          placeholder="64000"
          id="quantity"
          name="quantity"
          min="64000"
          max="640000"
        />
        <br></br>
        {bitRateMessage}
        <br></br>
        <Button variant="primary" onClick={performSearch}>
          Transcode
        </Button>
      </div>
    );
  } else {
    modalElement = <ProgressBar now={progressPercentage} />;
  }

  return (
    <div className="search">
      <p className="error">{error}</p>
      <div className="col text-center">
        <h1> Ria's Trascoding Playgroud</h1>
      </div>
      <Container>
        <Row>
          <Col>
            <Card className="mb-3" style={{ color: "#000" }}>
              <a
                href="https://dw00dsohded4a.cloudfront.net/source%20folder/bunnyoutput1.mp4"
                target="_blank"
              >
                <Card.Img src={pic} />
              </a>
              <Card.Body>
                <Card.Title>Video before Transcoding</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col>{output}</Col>
        </Row>
      </Container>
      <div class="col text-center">
        <div>
          <Button variant="primary" onClick={() => setShowHide(!showHide)}>
            Start Transcoding
          </Button>

          <Modal show={showHide}>
            <Modal.Header closeButton onClick={() => setShowHide(!showHide)}>
              <Modal.Title>{notify}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalElement}</Modal.Body>
            <Modal.Footer>
              <hr />

              {/* <Button variant="secondary" onClick={() => setShowHide(!showHide)}>
                Transcode without subscription
              </Button> */}
            </Modal.Footer>
          </Modal>
        </div>

        {/* <Button className="button" onClick={performSearch}>
          Start Transcoding the video
        </Button> */}
      </div>
      <section className="about">
        <div className="container p-1 p-sm-3">
          <hr />
          <div className="row">
            <div class="col text-center">
              <h2>About Project</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <img className="img-fluid" src={media} />
            </div>
            <div className="col-3">
              <p>
               The project uses AWS Elemental MediaConvert to transcode the video file based on the bitrate specified by the user. The static 
               content (HTML/CSS/JavaScript) is served using AWS Amplify. The project uses API Gateway and Lambda to invoke the MediaConvert Job.
               The user can also monitor the Job by subscribing to the SNS topic. The frontend is powered by React.

      
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
// Minimum: 64000

// Maximum: 640000
export default Transcoded;

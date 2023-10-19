import React from "react";
import "./About.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

function About() {
  return (
    <>
      {/* <section className="light">
        <div className="container py-2">
          <div className="h1 text-center text-dark" id="pageHeaderTitle">
            My Curiculum Vitae
          </div>
          <article className="postcard light blue">
            <a className="postcard__img_link" href="#">
              <img
                className="postcard__img"
                src={require("../../assets/foto-cv.jpg")}
                alt="Image Title"
              />
            </a>
            <div className="postcard__text t-dark">
              <h1 className="postcard__title blue">Hafief Maulana Aziz</h1>
              <div className="postcard__subtitle small">
                <FontAwesomeIcon icon={faCalendar} /> 4th April 2001
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
                My name is Hafief Maulana Aziz. I am freshly graduated from
                Mercu Buana University with Cum Laude category and GPA 3.87, i
                had some intern experience with Software Engineering position. I
                am a hardworking, trustworthy, friendly, helpful, and polite
                person. I am able to work in busy environments and also within a
                team setting. I am outgoing and tactful, and able to listen
                effectively when solving problems, high desire to learn
                something new.
              </div>
            </div>
          </article>
        </div>
      </section> */}
      <div className="text-center position-static">
        <img
            className="img-fluid"
            src={require("../../assets/cv.png")}
            alt=""
        />
      </div>
    </>
  );
}

export default About;

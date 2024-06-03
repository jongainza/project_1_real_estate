import React from "react";

const aboutStyle = {
  padding: "80px 16px",
  maxWidth: "768px",
  margin: "auto",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#374151",
};

const paragraphStyle = {
  marginBottom: "16px",
  color: "#4B5563",
};

export default function About() {
  return (
    <div style={aboutStyle}>
      <h1 style={titleStyle}>About Bootstrap Estate</h1>
      <p style={paragraphStyle}>
        Welcome to Bootstap Estate, where innovation meets excellence in the
        world of property management. Founded with a vision to redefine the real
        estate experience, we pride ourselves on leveraging cutting-edge
        technology to streamline processes and enhance client satisfaction. With
        a team of passionate professionals dedicated to delivering unparalleled
        service, we strive to exceed expectations at every turn.
      </p>
      <p style={paragraphStyle}>
        At Bootstap Estate, we understand that buying or selling a property can
        be a significant decision fraught with complexities. That's why we're
        committed to providing a seamless, transparent, and stress-free
        experience for all our clients. Whether you're a first-time homebuyer,
        an experienced investor, or a homeowner looking to list your property,
        we're here to guide you through every step of the process with expertise
        and integrity.
      </p>
      <p style={paragraphStyle}>
        Driven by a relentless pursuit of excellence, we continually innovate
        and adapt to the dynamic landscape of the real estate industry. Our
        commitment to staying ahead of the curve ensures that our clients have
        access to the latest tools, market insights, and resources necessary to
        make informed decisions and achieve their real estate goals. Discover
        the difference with Bootstap Estete and embark on your real estate
        journey with confidence.
      </p>
    </div>
  );
}

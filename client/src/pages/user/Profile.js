import React from "react";
import { useSelector } from "react-redux";
// import Button from "react-bootstrap/Button";
import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider, Space } from "antd";
const colors1 = ["#6253E1", "#04BEFE"];
const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div
      style={{
        padding: "3em",
        maxWidth: "90vw",
        margin: "0 auto",
        display: "flex ",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <h1 style={{ textAlign: "center", padding: "1em" }}>Profile</h1>
      <img
        src={user.currentUser.photo}
        alt="profile"
        className="rounded-circle"
        style={{
          width: "75px",
          height: "75px",
          borderRadius: "50%" /* Set 50% for a perfect circle */,
          objectFit: "cover" /* Maintain aspect ratio */,
          align: "center",
          marginBottom: "1em",
        }}
      />
      <h3>Name: {user.currentUser.username}</h3>
      <h3>Email: {user.currentUser.email}</h3>
      <div>
        {/* <Button
          variant="outline-warning"
          size="sm"
          onClick={() => {
            navigate("/update-profile");
          }}
        >
          Update User
        </Button>{" "} */}
        <Space>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(135deg, ${colors1.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                    colors1
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                    colors1
                  ).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button type="primary" size="small" href="/update-profile">
              Update User
            </Button>
          </ConfigProvider>

          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                    colors3
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                    colors3
                  ).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button type="primary" size="large" href="/listings">
              See your Listings
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                    colors3
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                    colors3
                  ).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button type="primary" size="large" href="/create-listing">
              Create Listing
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(90deg,  ${colors2.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                    colors2
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                    colors2
                  ).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button type="primary" size="small" href="/delete" danger="true">
              Delete User
            </Button>
          </ConfigProvider>
        </Space>
        {/* <Button
          variant="outline-danger"
          size="sm"
          onClick={() => {
            navigate("/delete");
          }}
        >
          Delete User
        </Button>{" "} */}
      </div>
    </div>
  );
};

export default Profile;

// import React, { useState } from "react";

// import { PlusOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Checkbox,
//   Form,
//   Input,
//   InputNumber,
//   Slider,
//   Upload,
// } from "antd";
// const { TextArea } = Input;
// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };
// const CreateListing = () => {
//   const [form] = Form.useForm();
//   const onFinish = (values) => {
//     console.log("form values", values);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "1em",
//         alignItems: "center",
//         maxWidth: "1200px", // Adjust the maximum width for larger screens
//         margin: "0 auto",
//       }}
//     >
//       <Form
//         labelCol={{
//           span: 4,
//         }}
//         wrapperCol={{
//           span: 14,
//         }}
//         layout="horizontal"
//         style={{
//           maxWidth: 600,
//         }}
//         onFinish={onFinish}
//       >
//         <Form.Item label="Title" name="title">
//           <Input />
//         </Form.Item>
//         <Form.Item label="Info" name="info">
//           <TextArea rows={2} />
//         </Form.Item>
//         <Form.Item label="Street" name="street">
//           <Input />
//         </Form.Item>
//         <Form.Item label="Number" name="number">
//           <InputNumber />
//         </Form.Item>
//         <Form.Item label="City" name="city">
//           <Input />
//         </Form.Item>
//         <Form.Item label="State" name="state">
//           <Input />
//         </Form.Item>
//         <Form.Item label="Country" name="country">
//           <Input />
//         </Form.Item>
//         <Form.Item label="Zip Code" name="zip_code">
//           <InputNumber min={0} max={100000000000000} step={100} />
//         </Form.Item>
//         <Form.Item label="Selling Price" name="selling_price">
//           <InputNumber min={10000} max={100000000000000} step={1000} />
//         </Form.Item>
//         <div style={{ display: "flex", gap: 16 }}>
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             <label htmlFor="bedrooms" name="bedrooms">
//               Bedrooms
//             </label>
//             <Slider id="bedrooms" name="bedrooms" />
//           </div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             <Form.Item
//               //   label="Bathrooms"
//               name="bathrooms"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//               }}
//             >
//               <label htmlFor="bathrooms" style={{ marginBottom: "8px" }}>
//                 Bathrooms
//               </label>
//               <Slider id="bathrooms" name="bathrooms" />
//             </Form.Item>{" "}
//           </div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             <label htmlFor="garage">Garage</label>
//             <Checkbox id="garage" name="garage" />
//           </div>
//         </div>

//         <Form.Item
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//           name="fileList"
//         >
//           <Upload action="/upload.do" listType="picture-card">
//             <button
//               style={{
//                 border: 0,
//                 background: "none",
//               }}
//               type="button"
//             >
//               <PlusOutlined />
//               <div
//                 style={{
//                   marginTop: 8,
//                 }}
//               >
//                 Upload Images
//               </div>
//             </button>
//           </Upload>
//         </Form.Item>
//         <Form.Item s>
//           <Button type="primary" htmlType="submit">
//             Create Listing
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };
// export default () => <CreateListing />;

import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function CreateListing() {
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    street: "",
    number: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    bedrooms: 0,
    bathrooms: 0,
    garage: false,
    price: "",
    images: [],
  });
  console.log({ photos });
  console.log({ formData });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (photos.length >= 6 && photos.length <= 12) {
      setFormData({ ...formData, images: photos });
    } else {
      alert("Please upload between 6 and 12 photos.");
    }
    console.log(formData);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: 30 }}>Create Listing</h1>
      <form
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
          <input
            type="text"
            placeholder="Name"
            id="title"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <textarea
            type="text"
            placeholder="Info"
            id="info"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, info: e.target.value });
            }}
          />
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 16,
            padding: 20,
          }}
        >
          <input
            type="text"
            placeholder="Street"
            id="Street"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, street: e.target.value });
            }}
          />
          <input
            type="number"
            placeholder="Street number"
            id="number"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, number: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="State"
            id="state"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, state: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Country"
            id="country"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value });
            }}
          />
          <input
            type="number"
            placeholder="Zip Code"
            id="zip_code"
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
            required
            onChange={(e) => {
              setFormData({ ...formData, zip_code: e.target.value });
            }}
          />
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 16,
            padding: 20,
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <label htmlFor="bedrooms">Number of Bedrooms: {bedrooms}</label>
            <input
              type="range"
              min="0"
              max="25"
              value={bedrooms}
              onChange={(e) => {
                setBedrooms(parseInt(e.target.value));
                setFormData({ ...formData, bedrooms: bedrooms });
              }}
              step="1"
              id="bedrooms"
              required
            />
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <label htmlFor="bathrooms">Number of Bathrooms: {bathrooms}</label>
            <input
              type="range"
              min="0"
              max="25"
              value={bathrooms}
              onChange={(e) => {
                setBathrooms(parseInt(e.target.value));

                setFormData({ ...formData, bathrooms: bathrooms });
              }}
              step="1"
              id="bathrooms"
              required
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, padding: 20 }}>
          <label htmlFor="garage">Garage </label>
          <input
            type="checkbox"
            id="garage"
            onChange={(e) => {
              setFormData({ ...formData, garage: e.target.checked });
            }}
          />
        </div>

        <CurrencyInput
          placeholder="Asking Price"
          prefix="$"
          decimalsLimit={2}
          onChange={(e) => {
            setFormData({ ...formData, price: e.target.value });
          }}
          style={{ border: "solid", padding: 3, borderRadius: 8 }}
          required
        />
        <div style={{ display: "flex", gap: 16, padding: 20 }}>
          <input
            // onChange={(e) => {
            //   const newPhotos = [...photos, ...e.target.files];
            //   if (newPhotos.length <= 12) {
            //     setPhotos(newPhotos);
            //   }
            // }}
            type="file"
            id="images"
            accept="image/*"
            multiple
            style={{ border: "solid", padding: 3, borderRadius: 8 }}
          />
          <button
            style={{ padding: 3, borderRadius: 8 }}
            onClick={(e) => {
              e.preventDefault();
              const newPhotos = [
                ...photos,
                ...document.getElementById("images").files,
              ];
              if (newPhotos.length <= 12) {
                setPhotos(newPhotos);
              }
            }}
          >
            Upload
          </button>
        </div>
        <button type="submit" style={{ padding: 3, borderRadius: 8 }}>
          CREATE
        </button>
      </form>
    </div>
  );
}

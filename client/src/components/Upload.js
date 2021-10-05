import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import background from "../img/background.jpg";

const {v4: uuidv4} = require("uuid");
const user = localStorage.getItem('user');

const initialState = {
    
    id: uuidv4(),
    toolName: "",
    type: "",
    category: "",
    pricePerDay: "",
    city: "",
    imgUrl:"",
    isAvailable:true,
    ownerId: user,
    renterId: "",
    toDate: ""
}

// Upload a Tool
const Upload = () => {
    
    let history = useHistory();

    const [state, setState] = useState("image-not-uploaded");
    const [image, setImage] = useState("");
    const [formData, setFormData] = useState(initialState);
    const [disabled, setDisabled] = useState(true);
    const [errMessage, setErrMessage] = useState("");
    const [subStatus, setSubStatus] = useState("idle");



    const uploadImage = async (e) => {

        // upload image to cloudinary and save image url in image state
        e.preventDefault()
        const files = e.target[0].files
        console.log("files", files)
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'toolboximages')
        setState("image-uploading")

        const res = await fetch("https://api.cloudinary.com/v1_1/eliew86/image/upload", 
        {
            method: 'POST',
            body:data
        })

        const file = await res.json()

        console.log(file)

        // setImage(file.secure_url)
        console.log("cloudinary url", file.secure_url);
        setState("image-done-uploading")

        // post the form info to add a tool for rent
        setSubStatus("pending");
        fetch("/addTools", {
            method: "POST",
            body: JSON.stringify({
                ...formData,
                imgUrl: file.secure_url
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
            const { status, error } = data;
            if(user){
                if (status === 200) {
                    window.localStorage.setItem("formData", JSON.stringify(data.data));
                    setSubStatus("confirmed");
                    history.push("/confirmedUpload");
                } else if (error) {
                    setSubStatus("error");
                    setErrMessage(data.message);
                }
            } else {
                alert("You must login to upload a tool for rent")
            }
        });

    }

    const handleChangeInput = (value, name) => {
        const newFormData = {...formData};
        newFormData[name] = value;
        setFormData(newFormData);
    };
    
    return (
        <Wrapper>

            <Header />
            <MainWrap>
                    <H1logo>Upload A tool!</H1logo>

                    <Form onSubmit={uploadImage} className="form">

                        <div>
                        <Input 
                            type="file" 
                            name="image"
                            required
                        />
                        </div>

                        <div>
                            <Input 
                                name="toolName"
                                type="text"
                                placeholder="Tool name"
                                onChange={(ev) => handleChangeInput(ev.target.value, "toolName")}
                            />
                        </div>

                        <div>
                            <Select
                                onChange={(ev) => handleChangeInput(ev.target.value, "type")}
                            >
                                <option value="">Type</option>
                                <option value="manual">Manual</option>
                                <option value="powertool">Power tool</option>
                                <option value="misc">Misc</option>
                            </Select>
                        </div>

                        <div>
                            <Select
                                onChange={(ev) => handleChangeInput(ev.target.value, "category")}
                            >
                                <option value="">Category</option>
                                <option value="handTool">Hand tool</option>
                                <option value="powerTool">Power tool</option>
                                <option value="measuringTool">Measuring tool</option>
                                <option value="toolKit">Tool kit</option>
                            </Select>
                        </div>

                        <div>
                            <Input 
                                name="pricePerDay"
                                type="text"
                                placeholder="Price per day"
                                onChange={(ev) => handleChangeInput(ev.target.value, "pricePerDay")}
                            />
                            <Ppd>$/day</Ppd>
                        </div>

                        <CityInput>
                            <Input 
                                name="city"
                                type="text"
                                placeholder="City"
                                onChange={(ev) => handleChangeInput(ev.target.value, "city")}
                            />
                        </CityInput>

                        <SubmitBtn>
                            <Submit className="btn" type="submit">Submit</Submit>
                        </SubmitBtn>
                    </Form>

            </MainWrap>
        </Wrapper>
    )

}

const Wrapper = styled.div`

`;

const MainWrap = styled.div`

`;

const Form = styled.form`

    position: absolute;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid 8px;
    border-image: linear-gradient(to top, black, #ff7366) 1;
    padding: 30px;
`;

const Input = styled.input`

    margin-bottom: 15px;
`;

const Submit = styled.button`

    width: fit-content;
    background-color: black;
    color: #ff7366;
    border: none;
    font-size: 15px;
    padding: 5px 10px 7px 10px;
    border-radius: 3px;
    position: absolute;
    left: 40%;
`;

const H1logo = styled.h1`

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 150px;
`;

const Select = styled.select`

    margin-bottom: 15px;
`;

const Ppd = styled.span`

    margin-left: 10px;
`;

const SubmitBtn = styled.div`

    display: flex;
    align-items: center;
`;

const CityInput = styled.div`

    margin-bottom: 35px;
`;

export default Upload;
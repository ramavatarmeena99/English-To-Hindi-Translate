import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

export default function Center() {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const [showAlertMessege, setShowAlertMessege] = useState(null);


  const url = (e) => {
    setVideoUrl(e.target.value);
  };

  const searchVideos = async () => {
    if (videoUrl === "") {
      setShowAlertMessege(true);
      setTimeout(() => {  
        setShowAlertMessege(false);
      }, 2000);
      return () => {
        clearTimeout(showAlertMessege);
      };
    }
   

    const encodedParams = new URLSearchParams();
    encodedParams.append("q", videoUrl);
    encodedParams.append("target", "hi");
    encodedParams.append("source", "en");
    await axios({
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',

      headers: {
        Accept: "application/json",
        'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
        "X-RapidAPI-Key": "73d75b16a0mshdc906e0ee650c31p1357e4jsn71a1c52758b2",
        // "X-RapidAPI-Key": "b3a78c0f08mshc9fad7e39ad0a01p18182ejsn65e17fd3055f",

        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'

      },
      data: encodedParams

    })
      .then((res) => {
        console.log(res.data.data.translations[0].translatedText);
        setDownloadLink(res.data.data.translations[0].translatedText)
      
      })
      .catch((err) => {
    
        console.log("err: ", err);
      });
  };

  return (
    <CenterContainer>
      <Box>
        <Top>
          <ForDots />
          <ForDots />
          <ForDots />
        </Top>
        <Bottom>
          <H1>Youtube2MP3 Online Video Downloader</H1>
          <ForSearchBox>
            <Input
              onChange={url}
              value={videoUrl}
              type="text"
              placeholder="Enter valid youtube Video url"
            />

            <SearchButton  onClick={searchVideos}>
             
                <BiSearch
                  style={{
                    fontSize: "22px",
                    fontWeight: "900",
                    color: "white",
                  }}
                />
             
            </SearchButton>
          </ForSearchBox>
          {showAlertMessege ? (
            <AlertMessege>
              <H3>*Please Enter Valid URL*</H3>
            </AlertMessege>
          ) : null}
        
        <p>{downloadLink}</p>
        
        </Bottom>
      </Box>

    </CenterContainer>
  );
}

const CenterContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
`;
const Box = styled.div`
  width: 70vw;
  height: 80%;
  border: 1px solid white;
  border-radius: 15px;
  @media (max-width: 768px) {
    width: 85vw;
    height: 75%;
  }
`;
const ForSearchBox = styled.div`
  width: 90%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  border: none;
  background-color: white;
  padding-left: 10px;
  outline: none;
  font-size: 16px;
  @media (max-width: 768px) {
    height: 40px;
  }
`;
const Input = styled.input`
  width: 90%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: transparent;
  @media (max-width: 768px) {
    border-radius: 5px;
    width: 84%;

    height: 40px;
  }
`;
const SearchButton = styled.button`
  width: 8%;
  height: 35px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: green;
  border: none;
  border-radius: 5px;
  background-image: linear-gradient(
    to left top,
    #327ff2,
    #4a8cf3,
    #5f98f3,
    #72a5f2,
    #86b1f1
  );
  @media (max-width: 768px) {
    width: 13%;
    height: 27px;
  }
  /* margin-bottom: 50px; */
`;

const Top = styled.div`
  width: 100%;
  height: 10%;
  border-bottom: 1px solid white;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const Bottom = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const ForDots = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #69a0eb;
  margin-left: 12px;
`;

const H1 = styled.h1`
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  padding: 10px 110px;
  color: white;
  @media (max-width: 768px) {
    font-size: 30px;

    padding: 20px 40px;
  }
`;

const AlertMessege = styled.div`
  width: auto;
  height: auto;
  border-radius: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  margin-top: 5px;
  @media (max-width: 768px) {
  }
`;

const H3 = styled.h3`
  color: red;
  font-weight: 500;
  font-size: 15px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

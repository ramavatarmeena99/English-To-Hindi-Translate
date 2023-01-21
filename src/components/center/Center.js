import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
// import { BiSearch } from "react-icons/bi";

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
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",

      headers: {
        Accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "73d75b16a0mshdc906e0ee650c31p1357e4jsn71a1c52758b2",
        // "X-RapidAPI-Key": "b3a78c0f08mshc9fad7e39ad0a01p18182ejsn65e17fd3055f",

        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    })
      .then((res) => {
        console.log(res.data.data.translations[0].translatedText);
        setDownloadLink(res.data.data.translations[0].translatedText);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <CenterContainer>
      <Box>
        <Left>
          {/* <H1>Youtube2MP3 Online Video Downloader</H1> */}

          <Input
            onChange={url}
            value={videoUrl}
            type="text"
            placeholder="Type here in English (for e.g I Love You)"
          />

          <SearchButton onClick={searchVideos}>TRANSLATE</SearchButton>
          {/* </ForSearchBox>s */}
          {showAlertMessege ? (
            <AlertMessege>
              <H3>*Please Enter Valid URL*</H3>
            </AlertMessege>
          ) : null}
        </Left>
        <Right>
          <TranslateHindi
            // onChange={url}
            value={downloadLink}
            type="text"
            placeholder="Get Hindi Translate (for e.g मुझे तुमसे प्यार है)"
          />
          {/* <p>{downloadLink}</p> */}
        </Right>
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
  border-radius: 5px;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    width: 85vw;
    height: 75%;
  }
`;

const Input = styled.textarea`
  min-width: 100%;
  max-width: 100%;

  min-height: 100%;
  max-height: 90%;
  padding: 10px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* border-radius: 9px; */
  border: none;
  outline: none;
  font-size: 16px;
  background-color: white;

  /* background-color: transparent; */
  @media (max-width: 768px) {
    border-radius: 5px;
    width: 84%;

    height: 40px;
  }
`;
const TranslateHindi = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  background-color: white;
  padding: 10px;
  min-height: 100%;
  max-height: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* border-radius: 9px; */
  border: none;
  outline: none;
  font-size: 16px;
  /* background-color: transparent; */
  @media (max-width: 768px) {
    border-radius: 5px;
    width: 84%;

    height: 40px;
  }
`;
const SearchButton = styled.button`
  width: 30%;
  height: auto;
  padding: 15px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: green;
  position: relative;
  bottom: 45px;
  right: -70px;
  border: none;
  /* border-radius: 5px; */
  background-image: linear-gradient(to right top, #238393, #358491, #438490, #4e858e, #58858d);
  @media (max-width: 768px) {
    width: auto;
    bottom: 30px;
    right: -50px;
    height: 27px;
  }
  /* margin-bottom: 50px; */
`;

const Left = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  /* padding: 10px; */
  justify-content: flex-start;
  align-items: flex-end;
  background-color: white;
  flex-direction: column;
`;
const Right = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  /* padding: 10px; */

  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  border-left: 1px solid black;
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
`;

const H3 = styled.h3`
  color: red;
  font-weight: 500;
  font-size: 15px;
`;

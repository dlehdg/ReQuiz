import { Rating } from "@mui/material";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const RandomDraw = () => {
  const data = [
    {
      option: "행운 카드",
      style: { backgroundColor: "#DDF8E8", textColor: "white" },
      percentage: 20,
    },
    {
      option: "10점",
      style: { backgroundColor: "#CDD5D1", textColor: "white" },
      percentage: 20,
    },
    {
      option: "상품",
      style: { backgroundColor: "#B4A6AB", textColor: "white" },
      percentage: 20,
    },
    {
      option: "꽝",
      style: { backgroundColor: "#946E83", textColor: "white" },
      percentage: 20,
    },
    {
      option: "경매",
      style: { backgroundColor: "#615055", textColor: "white" },
      percentage: 20,
    },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const navigate = useNavigate();


  
  // 룰렛 애니메이션을 실행시킬 함수
  const handleSpinClick = () => {
    if (!mustSpin) {
      // 가중치 랜덤 알고리즘(Weighted Random Picker) 적용
      // 1. 랜덤 기준점 설정
      const pivot = Math.floor(Math.random() * 99) + 1;
      let stack = 0; // 가중치

      let percentage = data.map((row, idx) => {
        {
          return row.percentage;
        }
      });

      let newPrizeNumber = -1; //당첨 인덱스

      percentage.some((row, idx) => {
        //2. 가중치 누적
        stack += row;

        // 3. 누적 가중치 값이 기준점 이상이면 종료
        if (pivot <= stack) {
          newPrizeNumber = idx;
          return true;
        }
      });
      // 당첨 인덱스를 가리킴

      if (newPrizeNumber >= 0 && newPrizeNumber < data.length) {
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
      } else {
        // 에러 처리 (예: alert 메시지 출력)
        alert("오류 발생: 당첨 번호를 찾을 수 없습니다.");
      }

      //   setPrizeNumber(newPrizeNumber);
      //   setMustSpin(true);
    }
  };


  const randomCheck = useSelector((state: RootState) => state.quizAuth.number);

  // 룰렛 애니메이션이 멈출 때 실행되는 함수

  const StopSpinning = () => {
    setMustSpin(false);
    alert(data[prizeNumber].option + "이 당첨되셨습니다");

    navigate("/");
  };

  return (
    <div>
      <RandomMenu>{randomCheck} 번째 가챠</RandomMenu>
      {/* <Wheel 
            spinDuration={0.2}
            startingOptionIndex={Math.floor(Math.random() * data.length)}
            mustStartSpinning={mustSpin}
            data={data}
            onStopSpinning={StopSpinning}
        /> */}

      <Wheel
        mustStartSpinning={mustSpin}
        spinDuration={0.5}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
        onStopSpinning={StopSpinning}
      />
      <RouletteStartBtn onClick={handleSpinClick}>
        <span>가챠</span>
      </RouletteStartBtn>
      {/* <div>{prizeNumber}</div> */}

      {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
    </div>
  );
};

export default RandomDraw;


const RandomMenu = styled.span`
  color: #fff;
  
`


const RouletteStartBtn = styled.button`
  border: none;
  display: block;

  border-radius: 25px;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  background-color: #222;
  padding: 15px 120px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  span {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 490%;
    width: 140%;
    background: #78c7d2;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
    transform: translateX(-98%) translateY(-25%) rotate(45deg);
  }

  &:hover:after {
    -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
    transform: translateX(-9%) translateY(-25%) rotate(45deg);
  }
`;

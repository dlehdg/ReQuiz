import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import QuizList from "../../components/QuizList/QuizList";
import { CHECK_RANDONBOX } from "../../redux/slice/quizSlice";
import Pagination from "../../components/pagination/Pagination";

const MainPage = () => {

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);


  const [check, setCheck] = useState(false);

  const navigate = useNavigate();

  const quizArr = useSelector((state : RootState) => state.quizAuth.arr);

  const quizArrLength = quizArr.length;

  const randomCheck = useSelector((state: RootState) => state.quizAuth.number);

  const dispatch = useDispatch();

  const [pageNumberIndex, setPageNumberIndex] = useState(1);

  const CheckQuizArrLength = () => {
    const number = Number(quizArrLength);
    if (number % 8 === 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  // useEffect(() => {
  //   CheckQuizArrLength();
  // }, [quizArr]);


  const onCheckNum = async () => {
      let num = Number(randomCheck);
      num++;
      await dispatch(CHECK_RANDONBOX(num));
      // console.log("현재 퀴즈 배열", quizArr);
    };

  useEffect(() => {
    // quizArr이 변경될 때만 실행
    if (quizArr.length > 0) {
      const number = Number(quizArrLength);
      if (number % 8 === 0) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    }
  }, [quizArr]);

  return (
    <>
    <MainBg>
      <MainHeader>
        <div>메인 페이지</div>
        <div>{quizArrLength} 개 클리어</div>
        {/* <div>{currentPage} 위치</div> */}
      </MainHeader>
      <QuizList size={currentPage * 8} />
      {/* <QuizList size={16} />
      <QuizList size={24} />
      <QuizList size={32} />
      <QuizList size={40} />
      <QuizList size={48} />
      <QuizList size={56} />
      <QuizList size={64} />
      <QuizList size={72} /> */}
      {check && (
        <QuizRouletteButton
          onClick={() => {
            onCheckNum();
            navigate("/random");
          }}
        >
          <span>랜덤 뽑기</span>
        </QuizRouletteButton>
      )}

      <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={72}
        productsPage={productsPerPage}
      />
    </MainBg>
    </>

  );
};

export default MainPage;



const MainBg = styled.div`
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: #1e1f24;
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 30px;
  padding-bottom: 50px;
  border-radius: 10px;
`;

const QuizRouletteButton = styled.button`
  font-size: 1.5rem;

  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 30px;
  height: 55px;
  text-align: center;
  border: none;
  background-size: 300% 100%;

  border-radius: 50px;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;

  background-image: linear-gradient(
    to right,
    #f5ce62,
    #e43603,
    #fa7199,
    #e85a19
  );
  box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
  &:hover {
    background-position: 100% 0;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
`;

const MainHeader = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 10px;

  div:first-child {
    margin-right: 80px; // 두 번째 div와의 간격 조절
  }

  div:last-child {
    text-align: right; // 두 번째 div를 오른쪽 정렬
  }

`;

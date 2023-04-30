import React, { useEffect, useState } from 'react';
import Chat from './Components/Chat/Chat';
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Inactive from './Pages/Inactive';
/* eslint-disable no-undef */

function App() {
  const [active, setActive] = useState(false)
  const navigate = useNavigate();

  const check = () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      var tabURL = tabs[0].url;
      if (tabURL.startsWith("https://leetcode.com/problems/")) {
        setActive(true)
        navigate("/leetcode")
      } else if (tabURL.startsWith("https://www.hackerrank.com/challenges/")) {
        setActive(true)
        navigate("/hackerrank")
      } else if (tabURL.startsWith("https://practice.geeksforgeeks.org/problems/")) {
        setActive(true)
        navigate("/gfg")
      } else if (tabURL.startsWith("https://www.interviewbit.com/problems/")) {
        setActive(true)
        navigate("/interviewbit")
      } else if (tabURL.startsWith("https://www.algoexpert.io/questions/")) {
        setActive(true)
        navigate("/algoexpert")
      }
      else {
        setActive(false)
      }
    });
  }

  useEffect(() => {
    check()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <Navbar />
      {!active ?
        <Inactive /> :
        <>
          <Routes>
            <Route path='/' element={<div>Home</div>} />
            <Route path="/hackerrank"
              element={
                <Chat
                  platform="Hackerrank"
                  questionTitleClass='ui-icon-label page-label'
                  questionBodyClass='challenge_problem_statement'
                />} />
            <Route path="/gfg"
              element={
                <Chat
                  platform="Geeksforgeeks"
                  questionTitleClass='g-m-0'
                  questionBodyClass='problems_problem_content__Xm_eO'
                />} />
            <Route path="/leetcode"
              element={
                <Chat
                  platform="Leetcode"
                  questionTitleClass='mr-2 text-lg font-medium text-label-1 dark:text-dark-label-1'
                  questionBodyClass='_1l1MA'
                />} />
            <Route path="/interviewbit"
              element={
                <Chat
                  platform="InterviewBit"
                  questionTitleClass='p-tile__title'
                  questionBodyClass='problem_description_markdown_content_value'
                />} />
            <Route path="/algoexpert"
              element={
                <Chat
                  platform="AlgoExpert"
                  questionTitleClass='wBpuKvBGWdd7o3KaUFOQ'
                  questionBodyClass='TLQjVhfBX4gHWkO9qYsJ'
                />} />
          </Routes>
        </>
      }
    </div>
  );
}

export default App;

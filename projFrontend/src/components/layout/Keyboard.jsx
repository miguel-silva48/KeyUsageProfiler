import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import "./../../utils/keyboard.css";

function Keyboard() {
  const token =
    "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QucHQiLCJpYXQiOjE3MDE5ODcxODIsImV4cCI6MTcwMTk4ODM4Mn0.4vx-G0_tf7XG7CIgAx4GUXDvmmG6KH0eRdULLf1b0HO0VGV5rDJjuYtr4y36Mg3Q";
  const [stompClient, setStompClient] = useState(null);

  // [lastKey, counter]
  // because if you receive two equal states (user presses 'A' and then 'A')
  // state change callbacks wont be changed
  const [lastKey, setLastKey] = useState(["", 0]);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + token,
    };

    const client = new Client({
      brokerURL: "ws://localhost:8080/websocket",
      connectHeaders: headers,
    });

    setStompClient(client);

    client.activate();

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      client.deactivate();
    };
  }, []);

  const updatePressedKey = useCallback(() => {
    const elem = document.getElementById(lastKey[0]);
    console.log("lastKey", lastKey);
    if (elem) {
      elem.classList.add("kb-pressed");
      setTimeout(() => {
        elem.classList.remove("kb-pressed");
      }, 400);
    }
  }, [lastKey]);

  useEffect(() => {
    updatePressedKey();
  }, [lastKey, updatePressedKey]);

  useEffect(() => {
    if (stompClient) {
      const onConnect = (frame) => {
        console.log("Connected: " + frame);
        stompClient.subscribe("/user/topic/keystrokes", (message) => {
          setLastKey((prevState) => [
            message.body.toLowerCase(),
            (prevState[1] + 1) % 10,
          ]);
        });
      };

      stompClient.onConnect = onConnect;

      stompClient.onWebSocketError = (error) => {
        console.error("Error with WebSocket", error);
      };

      stompClient.onStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      };
    }
  }, [stompClient]);

  return (
    <div className="kb-main-container">
      <div className="kb-row">
        <div className="kb-col" id="esc">
          Esc
        </div>
        {/* empty space between keys */}
        <div className="kb-empty"></div>
        <div className="kb-col" id="f1">
          F1
        </div>
        <div className="kb-col" id="f2">
          F2
        </div>
        <div className="kb-col" id="f3">
          F3
        </div>
        <div className="kb-col" id="f4">
          F4
        </div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="f5">
          F5
        </div>
        <div className="kb-col" id="f6">
          F6
        </div>
        <div className="kb-col" id="f7">
          F7
        </div>
        <div className="kb-col" id="f8">
          F8
        </div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="f9">
          F9
        </div>
        <div className="kb-col" id="f10">
          F10
        </div>
        <div className="kb-col" id="f11">
          F11
        </div>
        <div className="kb-col" id="f12">
          F12
        </div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="print">
          Print <span>Screen</span>
        </div>
        <div className="kb-col" id="scroll">
          Scroll <span>Lock</span>
        </div>
        <div className="kb-col" id="pause">
          Pause <span>Break</span>
        </div>
      </div>
      <div className="kb-row">
        <div className="kb-col symb" id="back quote">
          <span>~</span>`
        </div>
        <div className="kb-col symb" id="1">
          <span>!</span>1
        </div>
        <div className="kb-col symb" id="2">
          <span>@</span>2
        </div>
        <div className="kb-col symb" id="3">
          <span>#</span>3
        </div>
        <div className="kb-col symb" id="4">
          <span>$</span>4
        </div>
        <div className="kb-col symb" id="5">
          <span>%</span>5
        </div>
        <div className="kb-col symb" id="6">
          <span>^</span>6
        </div>
        <div className="kb-col symb" id="7">
          <span>&</span>7
        </div>
        <div className="kb-col symb" id="8">
          <span>*</span>8
        </div>
        <div className="kb-col symb" id="9">
          <span>(</span>9
        </div>
        <div className="kb-col symb" id="0">
          <span>)</span>0
        </div>
        <div className="kb-col symb" id="-">
          <span>_</span>-
        </div>
        <div className="kb-col symb" id="=">
          <span>+</span>=
        </div>
        <div className="kb-col kb-backspace" id="backspace">
          Backspace
        </div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="insert">
          Insert
        </div>
        <div className="kb-col" id="home">
          Home
        </div>
        <div className="kb-col" id="page up">
          Page<span>Up</span>
        </div>
      </div>
      <div className="kb-row">
        <div className="kb-col kb-tab" id="\\t">
          Tab
        </div>
        <div className="kb-col kb-col-key" id="q">
          q
        </div>
        <div className="kb-col kb-col-key" id="w">
          w
        </div>
        <div className="kb-col kb-col-key" id="e">
          e
        </div>
        <div className="kb-col kb-col-key" id="r">
          r
        </div>
        <div className="kb-col kb-col-key" id="t">
          t
        </div>
        <div className="kb-col kb-col-key" id="y">
          y
        </div>
        <div className="kb-col kb-col-key" id="u">
          u
        </div>
        <div className="kb-col kb-col-key" id="i">
          i
        </div>
        <div className="kb-col kb-col-key" id="o">
          o
        </div>
        <div className="kb-col kb-col-key" id="p">
          p
        </div>
        <div className="kb-col" id="{">
          <span>&#123;</span>
          <span>[</span>
        </div>
        <div className="kb-col" id="}">
          <span>&#125;</span>
          <span>]</span>
        </div>
        <div className="kb-col kb-slace" id="back slash">
          <span>&#124;</span>
          <span>&#92;</span>
        </div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="delete">
          Delete
        </div>
        <div className="kb-col" id="end">
          End
        </div>
        <div className="kb-col" id="page down">
          Page<span>Down</span>
        </div>
      </div>
      <div className="kb-row">
        <div className="kb-col kb-capslock" id="caps lock">
          caps <span>lock</span>
        </div>
        <div className="kb-col kb-col-key" id="a">
          a
        </div>
        <div className="kb-col kb-col-key" id="s">
          s
        </div>
        <div className="kb-col kb-col-key" id="d">
          d
        </div>
        <div className="kb-col kb-col-key" id="f">
          f
        </div>
        <div className="kb-col kb-col-key" id="g">
          g
        </div>
        <div className="kb-col kb-col-key" id="h">
          h
        </div>
        <div className="kb-col kb-col-key" id="j">
          j
        </div>
        <div className="kb-col kb-col-key" id="k">
          k
        </div>
        <div className="kb-col kb-col-key" id="l">
          l
        </div>
        <div className="kb-col" id=";">
          <span>:</span>
          <span>;</span>
        </div>
        <div className="kb-col" id="'">
          <span>"</span>
          <span>'</span>
        </div>
        <div className="kb-col kb-enter" id="\\n">
          Enter
        </div>
        <div className="kb-empty"></div>
        <div className="kb-empty"></div>
        <div className="kb-empty"></div>
        <div className="kb-empty"></div>
      </div>
      <div className="kb-row">
        <div className="kb-col kb-shift" id="shift">
          Shift
        </div>
        <div className="kb-col kb-col-key" id="z">
          z
        </div>
        <div className="kb-col kb-col-key" id="x">
          x
        </div>
        <div className="kb-col kb-col-key" id="c">
          c
        </div>
        <div className="kb-col kb-col-key" id="v">
          v
        </div>
        <div className="kb-col kb-col-key" id="b">
          b
        </div>
        <div className="kb-col kb-col-key" id="n">
          n
        </div>
        <div className="kb-col kb-col-key" id="m">
          m
        </div>
        <div className="kb-col" id=",">
          <span>&lt;</span>
          <span>,</span>
        </div>
        <div className="kb-col" id=".">
          <span>&gt;</span>
          <span>.</span>
        </div>
        <div className="kb-col" id="/">
          <span>?</span>
          <span>/</span>
        </div>
        <div className="kb-col kb-shift">Shift</div>
        <div className="kb-empty"></div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="up">
          &uarr;
        </div>
        <div className="kb-empty"></div>
      </div>
      <div className="kb-row">
        <div className="kb-col ctrl" id="control">
          Ctrl
        </div>
        <div className="kb-col" id="meta">
          win
        </div>
        <div className="kb-col" id="alt">
          Alt
        </div>
        <div className="kb-col kb-space" id=" "></div>
        <div className="kb-col" id="unused_alt">
          Alt
        </div>
        <div className="kb-col" id="context menu">
          Menu
        </div>
        <div className="kb-col ctrl" id="unused_ctrl">
          Ctrl
        </div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="left">
          &larr;
        </div>
        <div className="kb-col" id="down">
          &darr;
        </div>
        <div className="kb-col" id="right">
          &rarr;
        </div>
      </div>
    </div>
  );
}

export default Keyboard;

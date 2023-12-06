import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import "./../../utils/keyboard.css";


function Keyboard() {
  const token =
    "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QucHQiLCJpYXQiOjE3MDE4OTA2OTAsImV4cCI6MTcwMTg5MTg5MH0.QQ43pEzLotD3r4d-CLHnqSKFNzgK5meGppIikAnBJIsakIy6vp-vA-qvRwyLpV-I";
  const [stompClient, setStompClient] = useState(null);

  const [lastKey, setLastKey] = useState("");

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
    const elem = document.getElementById(lastKey);
    if (elem) {
      elem.classList.add("kb-pressed");
      setTimeout(() => {
        elem.classList.remove("kb-pressed");
      }, 700);
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
          setLastKey(message.body.toLowerCase());
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
        { /* empty space between keys */}
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
        <div className="kb-col symb" id="tilde">
          <span>~</span>`
        </div>
        <div className="kb-col symb" id="exclamation">
          <span>!</span>1
        </div>
        <div className="kb-col symb" id="at">
          <span>@</span>2
        </div>
        <div className="kb-col symb" id="hash">
          <span>#</span>3
        </div>
        <div className="kb-col symb" id="dollar">
          <span>$</span>4
        </div>
        <div className="kb-col symb" id="percent">
          <span>%</span>5
        </div>
        <div className="kb-col symb" id="caret">
          <span>^</span>6
        </div>
        <div className="kb-col symb" id="ampersand">
          <span>&</span>7
        </div>
        <div className="kb-col symb" id="asterisk">
          <span>*</span>8
        </div>
        <div className="kb-col symb" id="left_paren">
          <span>(</span>9
        </div>
        <div className="kb-col symb" id="right_paren">
          <span>)</span>0
        </div>
        <div className="kb-col symb" id="underscore">
          <span>_</span>-
        </div>
        <div className="kb-col symb" id="plus">
          <span>+</span>=
        </div>
        <div className="kb-col kb-backspace" id="backspace">
          Backspace
        </div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="pause">
          Insert
        </div>
        <div className="kb-col" id="pause">
          Home
        </div>
        <div className="kb-col" id="pause">
          Page<span>Up</span>
        </div>
      </div>
      <div className="kb-row">
        <div className="kb-col kb-tab" id="tab">
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
        <div className="kb-col" id="left_brace">
          <span>&#123;</span>
          <span>[</span>
        </div>
        <div className="kb-col" id="right_brace">
          <span>&#125;</span>
          <span>]</span>
        </div>
        <div className="kb-col kb-slace" id="pipe">
          <span>&#124;</span>
          <span>&#92;</span>
        </div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="pause">
          Delete
        </div>
        <div className="kb-col" id="pause">
          End
        </div>
        <div className="kb-col" id="pause">
          Page<span>Down</span>
        </div>
      </div>
      <div className="kb-row">
        <div className="kb-col kb-capslock" id="caps_lock">
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
        <div className="kb-col" id="colon">
          <span>:</span>
          <span>;</span>
        </div>
        <div className="kb-col" id="quote">
          <span>"</span>
          <span>'</span>
        </div>
        <div className="kb-col kb-enter" id="enter">
          Enter
        </div>
        <div className="kb-empty"></div>
        <div className="kb-empty"></div>
        <div className="kb-empty"></div>
        <div className="kb-empty"></div>

      </div>
      <div className="kb-row">
        <div className="kb-col kb-shift" id="left_shift">
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
        <div className="kb-col" id="left_angle_bracket">
          <span>&lt;</span>
          <span>,</span>
        </div>
        <div className="kb-col" id="greaterthan_dot">
          <span>&gt;</span>
          <span>.</span>
        </div>
        <div className="kb-col" id="questionmark_slash">
          <span>?</span>
          <span>/</span>
        </div>
        <div className="kb-col kb-shift" id="right_shift">
          Shift
        </div>
        <div className="kb-empty"></div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="questionmark_slash">
            &uarr;
        </div>
        <div className="kb-empty"></div>

      </div>
      <div className="kb-row">
        <div className="kb-col ctrl" id="left_ctrl">
          Ctrl
        </div>
        <div className="kb-col" id="left_win">
          win
        </div>
        <div className="kb-col" id="left_alt">
          Alt
        </div>
        <div className="kb-col kb-space" id="space"></div>
        <div className="kb-col" id="right_alt">
          Alt
        </div>
        <div className="kb-col">
          <div className="rightclickopt" id="right_click_opt">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="kb-col ctrl" id="right_ctrl">
          Ctrl
        </div>
        <div className="kb-empty"></div>
        <div className="kb-col" id="questionmark_slash">
            &larr;
        </div>
        <div className="kb-col" id="questionmark_slash">
            &darr;
        </div>
        <div className="kb-col" id="questionmark_slash">
            &rarr;
        </div>
        
      </div>
    </div>
  );
}

export default Keyboard;

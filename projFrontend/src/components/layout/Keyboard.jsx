import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";

function Keyboard() {
  const token =
    "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QucHQiLCJpYXQiOjE3MDE4ODU2NDAsImV4cCI6MTcwMTg4Njg0MH0.k2Zg3XE0XwxnMHhCvqFsMxYAT5Ko1tgTOySgfDE-CzmJvwfMzZ-88yiaRWWM2MV9";
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
    console.log("last key ", lastKey);
    const elem = document.getElementById(lastKey);
    console.log(elem);
    if (elem) {
      elem.classList.add("pressed");
      setTimeout(() => {
        console.log("depressing key");
        elem.classList.remove("pressed");
      }, 700);
    }
  }, [lastKey]);

  useEffect(() => {
    console.log("lastkey updated: ", lastKey);
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
    <div className="main-container">
      <div className="row">
        <div className="col" id="esc">
          Esc
        </div>
        <div className="col" id="f1">
          F1
        </div>
        <div className="col" id="f2">
          F2
        </div>
        <div className="col" id="f3">
          F3
        </div>
        <div className="col" id="f4">
          F4
        </div>
        <div className="col" id="f5">
          F5
        </div>
        <div className="col" id="f6">
          F6
        </div>
        <div className="col" id="f7">
          F7
        </div>
        <div className="col" id="f8">
          F8
        </div>
        <div className="col" id="f9">
          F9
        </div>
        <div className="col" id="f10">
          F10
        </div>
        <div className="col" id="f11">
          F11
        </div>
        <div className="col" id="f12">
          F12
        </div>
        <div className="col" id="print">
          Print <span>Screen</span>
        </div>
        <div className="col" id="scroll">
          Scroll <span>Lock</span>
        </div>
        <div className="col" id="pause">
          Pause <span>Break</span>
        </div>
      </div>
      <div className="row">
        <div className="col symb" id="tilde">
          <span>~</span>`
        </div>
        <div className="col symb" id="exclamation">
          <span>!</span>1
        </div>
        <div className="col symb" id="at">
          <span>@</span>2
        </div>
        <div className="col symb" id="hash">
          <span>#</span>3
        </div>
        <div className="col symb" id="dollar">
          <span>$</span>4
        </div>
        <div className="col symb" id="percent">
          <span>%</span>5
        </div>
        <div className="col symb" id="caret">
          <span>^</span>6
        </div>
        <div className="col symb" id="ampersand">
          <span>&</span>7
        </div>
        <div className="col symb" id="asterisk">
          <span>*</span>8
        </div>
        <div className="col symb" id="left_paren">
          <span>(</span>9
        </div>
        <div className="col symb" id="right_paren">
          <span>)</span>0
        </div>
        <div className="col symb" id="underscore">
          <span>_</span>-
        </div>
        <div className="col symb" id="plus">
          <span>+</span>=
        </div>
        <div className="col backspace" id="backspace">
          Backspace
        </div>
      </div>
      <div className="row">
        <div className="col tab" id="tab">
          Tab
        </div>
        <div className="col col-key" id="q">
          q
        </div>
        <div className="col col-key" id="w">
          w
        </div>
        <div className="col col-key" id="e">
          e
        </div>
        <div className="col col-key" id="r">
          r
        </div>
        <div className="col col-key" id="t">
          t
        </div>
        <div className="col col-key" id="y">
          y
        </div>
        <div className="col col-key" id="u">
          u
        </div>
        <div className="col col-key" id="i">
          i
        </div>
        <div className="col col-key" id="o">
          o
        </div>
        <div className="col col-key" id="p">
          p
        </div>
        <div className="col" id="left_brace">
          <span>&#123;</span>
          <span>[</span>
        </div>
        <div className="col" id="right_brace">
          <span>&#125;</span>
          <span>]</span>
        </div>
        <div className="col slace" id="pipe">
          <span>&#124;</span>
          <span>&#92;</span>
        </div>
      </div>
      <div className="row">
        <div className="col capslock" id="caps_lock">
          caps <span>lock</span>
        </div>
        <div className="col col-key" id="a">
          a
        </div>
        <div className="col col-key" id="s">
          s
        </div>
        <div className="col col-key" id="d">
          d
        </div>
        <div className="col col-key" id="f">
          f
        </div>
        <div className="col col-key" id="g">
          g
        </div>
        <div className="col col-key" id="h">
          h
        </div>
        <div className="col col-key" id="j">
          j
        </div>
        <div className="col col-key" id="k">
          k
        </div>
        <div className="col col-key" id="l">
          l
        </div>
        <div className="col" id="colon">
          <span>:</span>
          <span>;</span>
        </div>
        <div className="col" id="quote">
          <span>"</span>
          <span>'</span>
        </div>
        <div className="col enter" id="enter">
          Enter
        </div>
      </div>
      <div className="row">
        <div className="col shift" id="left_shift">
          Shift
        </div>
        <div className="col col-key" id="z">
          z
        </div>
        <div className="col col-key" id="x">
          x
        </div>
        <div className="col col-key" id="c">
          c
        </div>
        <div className="col col-key" id="v">
          v
        </div>
        <div className="col col-key" id="b">
          b
        </div>
        <div className="col col-key" id="n">
          n
        </div>
        <div className="col col-key" id="m">
          m
        </div>
        <div className="col" id="left_angle_bracket">
          <span>&lt;</span>
          <span>,</span>
        </div>
        <div className="col" id="greaterthan_dot">
          <span>&gt;</span>
          <span>.</span>
        </div>
        <div className="col" id="questionmark_slash">
          <span>?</span>
          <span>/</span>
        </div>
        <div className="col shift" id="right_shift">
          Shift
        </div>
      </div>
      <div className="row">
        <div className="col ctrl" id="left_ctrl">
          Ctrl
        </div>
        <div className="col" id="left_win">
          win
        </div>
        <div className="col" id="left_alt">
          Alt
        </div>
        <div className="col space" id="space"></div>
        <div className="col" id="right_alt">
          Alt
        </div>
        <div className="col">
          <div className="rightclickopt" id="right_click_opt">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="col ctrl" id="right_ctrl">
          Ctrl
        </div>
      </div>
    </div>
  );
}

export default Keyboard;

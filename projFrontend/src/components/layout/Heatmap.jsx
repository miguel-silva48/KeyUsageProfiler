import React, { useEffect } from "react";
import h337 from "@mars3d/heatmap.js";

import "../../utils/heatmap.css";

function Heatmap() {
  const coordinates = {
    escape: {
      x: 25,
      y: 29,
    },
    f1: {
      x: 83,
      y: 29,
    },
    f2: {
      x: 112,
      y: 29,
    },
    f3: {
      x: 141,
      y: 29,
    },
    f4: {
      x: 170,
      y: 29,
    },
    f5: {
      x: 226,
      y: 29,
    },
    f6: {
      x: 254,
      y: 29,
    },
    f7: {
      x: 283,
      y: 29,
    },
    f8: {
      x: 312,
      y: 29,
    },
    f9: {
      x: 368,
      y: 29,
    },
    f10: {
      x: 397,
      y: 29,
    },
    f11: {
      x: 426,
      y: 29,
    },
    f12: {
      x: 453,
      y: 29,
    },
    "print screen": {
      x: 513,
      y: 29,
    },
    "scroll lock": {
      x: 541,
      y: 29,
    },
    pause: {
      x: 570,
      y: 29,
    },
    "back quote": {
      x: 27,
      y: 62,
    },
    1: {
      x: 56,
      y: 62,
    },
    2: {
      x: 84,
      y: 62,
    },
    3: {
      x: 115,
      y: 62,
    },
    4: {
      x: 143,
      y: 62,
    },
    5: {
      x: 174,
      y: 62,
    },
    6: {
      x: 203,
      y: 62,
    },
    7: {
      x: 233,
      y: 62,
    },
    8: {
      x: 262,
      y: 62,
    },
    9: {
      x: 292,
      y: 62,
    },
    0: {
      x: 321,
      y: 62,
    },
    "-": {
      x: 351,
      y: 62,
    },
    "=": {
      x: 380,
      y: 62,
    },
    backspace: {
      x: 430,
      y: 62,
    },
    insert: {
      x: 511,
      y: 62,
    },
    home: {
      x: 541,
      y: 62,
    },
    "page up": {
      x: 570,
      y: 62,
    },
    "\\t": {
      x: 37,
      y: 94,
    },
    q: {
      x: 77,
      y: 94,
    },

    w: {
      x: 107,
      y: 94,
    },
    e: {
      x: 136,
      y: 94,
    },
    r: {
      x: 166,
      y: 94,
    },
    t: {
      x: 195,
      y: 94,
    },
    y: {
      x: 225,
      y: 94,
    },
    u: {
      x: 254,
      y: 94,
    },
    i: {
      x: 284,
      y: 94,
    },
    o: {
      x: 313,
      y: 94,
    },
    p: {
      x: 343,
      y: 94,
    },
    "{": {
      x: 372,
      y: 94,
    },
    "}": {
      x: 402,
      y: 94,
    },
    "back slash": {
      x: 442,
      y: 94,
    },
    delete: {
      x: 511,
      y: 94,
    },
    end: {
      x: 540,
      y: 94,
    },
    "page down": {
      x: 570,
      y: 94,
    },
    "caps lock": {
      x: 45,
      y: 127,
    },
    a: {
      x: 88,
      y: 127,
    },
    s: {
      x: 117,
      y: 127,
    },
    d: {
      x: 148,
      y: 127,
    },
    f: {
      x: 177,
      y: 127,
    },
    g: {
      x: 208,
      y: 127,
    },
    h: {
      x: 237,
      y: 127,
    },
    j: {
      x: 268,
      y: 127,
    },
    k: {
      x: 297,
      y: 127,
    },
    l: {
      x: 328,
      y: 127,
    },
    ";": {
      x: 358,
      y: 127,
    },
    "'": {
      x: 389,
      y: 127,
    },
    "\\n": {
      x: 420,
      y: 127,
    },
    shift: {
      x: 50,
      y: 159,
    },
    z: {
      x: 100,
      y: 159,
    },
    x: {
      x: 131,
      y: 159,
    },
    c: {
      x: 162,
      y: 159,
    },
    v: {
      x: 192,
      y: 159,
    },
    b: {
      x: 223,
      y: 159,
    },
    n: {
      x: 253,
      y: 159,
    },
    m: {
      x: 284,
      y: 159,
    },
    ",": {
      x: 314,
      y: 159,
    },
    ".": {
      x: 344,
      y: 159,
    },
    "/": {
      x: 374,
      y: 159,
    },
    up: {
      x: 540,
      y: 159,
    },
    control: {
      x: 27,
      y: 191,
    },
    meta: {
      x: 58,
      y: 191,
    },
    alt: {
      x: 88,
      y: 191,
    },
    left: {
      x: 230,
      y: 191,
    },
    " ": {
      x: 230,
      y: 191,
    },
    "context menu": {
      x: 417,
      y: 191,
    },
    left: {
      x: 509,
      y: 191,
    },
    down: {
      x: 539,
      y: 191,
    },
    right: {
      x: 570,
      y: 191,
    },
  };

  useEffect(() => {
    const heatmap = document.querySelector(".Heatmap");
    if (heatmap) {
      var heatmapInstance = h337.create({
        container: heatmap,
        radius: 35,
        maxOpacity: 0.5,
        minOpacity: 0.0,
        blur: 0.75,
      });
      const keyCounts = {
        q: 276,
        control: 270,
        o: 270,
        "'": 268,
        z: 265,
        y: 265,
        a: 260,
        up: 258,
        n: 257,
        j: 252,
        ".": 251,
        "=": 251,
        ",": 250,
        s: 250,
        7: 250,
        ";": 249,
        r: 248,
        k: 248,
        "scroll lock": 248,
        alt: 248,
        f7: 247,
        pause: 247,
        3: 246,
        f3: 245,
        i: 244,
        h: 244,
        delete: 243,
        e: 243,
        f2: 243,
        v: 242,
        f12: 242,
        f6: 241,
        meta: 241,
        right: 241,
        "print screen": 240,
        "back quote": 240,
        "page up": 240,
        4: 237,
        9: 237,
        t: 236,
        f9: 236,
        8: 235,
        backspace: 235,
        g: 234,
        6: 234,
        "page down": 233,
        insert: 233,
        f11: 233,
        f5: 232,
        x: 231,
        "/": 231,
        w: 231,
        " ": 230,
        b: 229,
        c: 229,
        left: 229,
        "back slash": 228,
        m: 228,
        f1: 228,
        "-": 227,
        "{": 227,
        0: 226,
        l: 225,
        "caps lock": 225,
        f10: 225,
        5: 224,
        "}": 220,
        d: 220,
        f: 219,
        shift: 218,
        f8: 217,
        "context menu": 217,
        end: 217,
        p: 216,
        u: 216,
        down: 214,
        f4: 213,
        2: 211,
        home: 211,
        1: 202,
      };

      console.log(keyCounts);

      const testData = {
        a: 9000,
        b: 21,
        c: 500,
        d: 10000,
        e: 71,
        f: 10,
        g: 562,
        h: 91,
        i: 23,
        j: 250,
        k: 10,
        l: 25,
        m: 12,
        n: 12,
        o: 12,
        p: 25,
        q: 60,
        r: 8,
        s: 7960,
        t: 290,
        u: 120,
        v: 90,
        w: 8000,
        x: 700,
        y: 120,
        z: 790,
        "\\t": 120,
        1: 120,
        2: 60,
        3: 90,
        "back quote": 120,
        4: 90,
        5: 90,
        6: 120,
        7: 920,
        8: 512,
        9: 1000,
        0: 60,
        "-": 120,
        "=": 760,
        backspace: 8000,
        "caps lock": 160,
        shift: 7000,
        control: 1200,
        meta: 7000,
        alt: 7000,
        " ": 1200,
        "context menu": 120,
        escape: 1210,
        f1: 70,
        f2: 120,
        f3: 1000,
        f4: 1200,
        f5: 1200,
        f6: 1800,
        f7: 1200,
        f8: 900,
        f9: 1200,
        f10: 1200,
        f11: 1200,
        f12: 12,
        "print screen": 1200,
        "scroll lock": 1200,
        pause: 1200,
        insert: 5000,
        home: 6000,
        "page up": 3000,
        delete: 1200,
        end: 6000,
        "page down": 2000,
        "{": 1200,
        "}": 3000,
        "back slash": 6000,
        ";": 1200,
        "'": 3000,
        "\\n" : 7000,
        "," : 1600,
        "." : 7000,
        "/" : 8000,
        "up" : 6000,
        "left" : 10000,
        "down" : 7000,
        "right" : 6000
      };
      var points2 = [];
      var max = 0;
      var min = 1000000000;
      for (const k in testData) {
        var v = Math.floor(testData[k]);
        console.log("current k", k);
        points2.push({
          x: coordinates[k].x,
          y: coordinates[k].y,
          value: testData[k],
        });
        if (v > max) {
          max = v;
        }
        if (v < min) {
          min = v;
        }
      }
      // heatmap data format
      var data1 = {
        max: max,
        min: min - Math.floor(max / 5),
        data: points2,
      };

      console.log("my data: ", data1);
      heatmapInstance.setData(data1);
    }
  }, []);

  return <div className="Heatmap"></div>;
}

export default Heatmap;

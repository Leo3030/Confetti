import { ButtonBase, makeStyles } from "@material-ui/core";
import cls from "classnames";
import React, { useCallback, useRef } from "react";

const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

const getChunksFromString = (st, chunkSize) =>
  st.match(new RegExp(`.{${chunkSize}}`, "g"));

const convertHexUnitTo256 = (hexStr) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16);

const getAlphafloat = (a, alpha) => {
  if (typeof a !== "undefined") {
    return a / 256;
  }
  if (typeof alpha !== "undefined") {
    if (alpha > 1 && alpha <= 100) {
      return alpha / 100;
    }
    if (alpha >= 0 && alpha <= 1) {
      return alpha;
    }
  }
  return 1;
};

const hexToRGBA = (hex, alpha) => {
  if (!isValidHex(hex)) {
    throw new Error("Invalid HEX");
  }
  const chunkSize = Math.floor((hex.length - 1) / 3);
  const hexArr = getChunksFromString(hex.slice(1), chunkSize);
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
};

export const useStyles = makeStyles((theme) => ({
  wrap: {
    height: 28,
    marginLeft: 16,
  },
  "@keyframes fall": {
    from: {
      top: -10,
      transform: "rotate(0)",
    },
    to: {
      top: "110vh",
      transform: "rotate(720deg)",
    },
  },
  "@keyframes ripple": {
    from: {
      transform: "scale(0)",
      opacity: 1,
    },
    to: {
      opacity: 0,
      transform: "scale(250)",
    },
  },
  "@keyframes showFade": {
    from: {
      transform: "scale(0)",
      opacity: 0,
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  confetti: {
    position: "absolute",
    transition: "all 0.1s ease",
    pointerEvents: "none",
    width: 16,
    height: 16,
    fontSize: "30px",
    animation: "$fall 4s cubic-bezier(0.25, 0.46, 0.8, 1)",
    zIndex: 99999,
  },
  muiButton: {
    display: "flex",
    alignItems: "center",
    boxShadow: `0 0 10px 0.5px rgba('transparent', 0)`,
    position: "relative",
    margin: 0,
    height: "100%",
    width: 28,
    border: "none",
    background: "#F9A600",
    color: "#FBE8D3",
    transition: "all  0.15s linear, width  0.2s linear",
    borderRadius: 30,
    animation: "$showFade 0.3s",

    "&:hover": {
      boxShadow: `0 0 10px 0.5px rgba('black', 0)`,
      transform: "scale(0.98)",
      background: "shade(#FBE8D3, 5%)",
      cursor: "pointer",
    },
    "&:active": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
  muiButtonShowed: {
    display: "flex",
    alignItems: "center",
    boxShadow: `0 0 10px 0.5px rgba('transparent', 0)`,
    position: "relative",
    margin: 0,
    height: "100%",
    width: 254,
    border: "none",
    background: "#F9A600",
    color: "#FBE8D3",
    transition: "all  0.15s linear",
    borderRadius: 30,
    animation: "none",

    "&:hover": {
      boxShadow: `0 0 10px 0.5px rgba('black', 0)`,
      transform: "scale(0.98)",
      background: "shade(#FBE8D3, 5%)",
      cursor: "pointer",
    },
    "&:active": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
  expand: {
    width: 256,
  },
  ripple: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    backgroundColor: `${hexToRGBA("#FBE8D3", 0.2)}`,
    border: "1px solid transparent",
    borderRadius: "50%",
    animation: "$ripple 0.75s 1",
    top: "50%",
    left: "50%",
  },
  icon: {
    position: "absolute",
    height: 30,
    width: 33,
    left: 0,
    bottom: 0,
    opacity: 0,
    animation: "$showFade 0.3s forwards",
    animationDelay: "0.3s",
  },
  iconShowed: {
    opacity: 1,
    animation: "none",
  },
  content: {
    whiteSpace: "nowrap",
    opacity: 0,
    transform: "translateX(-10px)",
  },
  contentShowed: {
    opacity: 1,
    transform: "translateX(0)",
  },
  contentActive: {
    opacity: 1,
    transform: "translateX(0)",
    transition: "all  0.3s cubic-bezier(0.25, 0.46, 0.8, 1)",
    transitionDelay: "0.2s",
  },
  closeBtn: {
    display: "none",
    position: "absolute",
    right: 8,
    top: "50%",
    width: 20,
    height: 28,
    transform: "translateY(-50%)",
  },
  closeBtnActive: {
    display: "block",
  },
}));

function ConfettiBtn() {
  const classes = useStyles();
  const rippleRef = useRef(null);
  const btnRef = useRef(null);
  const closeBtnRef = useRef(null);

  const confetti = useCallback(() => {
    const htmlWidth = document.body.offsetWidth;
    const contentContainer = document.createElement("div");
    [
      {
        bg: "yellow",
        position: Math.random() * htmlWidth,
      },
      {
        bg: "orange",
        position: Math.random() * htmlWidth,
      },
      {
        bg: "red",
        position: Math.random() * htmlWidth,
      },
      {
        bg: "green",
        position: Math.random() * htmlWidth,
      },
      {
        bg: "blue",
        position: Math.random() * htmlWidth,
      },
      {
        bg: "red",
        position: Math.random() * htmlWidth,
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "🎂",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "❤️",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "🎊",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "✨",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "💰",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "🎉",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "💍",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "⭐️",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "🎈",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "💖",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "🍺",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "🌼",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "🌈",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "🍾",
      },
      {
        bg: "transparent",
        position: Math.random() * htmlWidth,
        internal: "🥇",
      },
    ].map((options) => {
      const content = document.createElement("div");
      content.classList.add(classes.confetti);
      content.style.setProperty("background", options.bg);
      content.style.setProperty("left", `${options.position}px`);
      content.style.setProperty("margin-top", `${Math.random() * 100}px`);
      content.appendChild(document.createTextNode(options.internal || ""));
      contentContainer.appendChild(content);

      return true;
    });
    document.body.append(contentContainer);
    setTimeout(() => contentContainer.remove(), 6000);
  }, [classes]);

  const handleBtnClick = (e) => {
    if (!(closeBtnRef?.current && closeBtnRef?.current.contains(e.target))) {
      confetti();
    }
  };

  return (
    <div className={classes.wrap}>
      <ButtonBase
        ref={btnRef}
        className={cls(classes.muiButtonShowed, classes.expand)}
        onClick={handleBtnClick}
      >
        <div className={classes.ripple} ref={rippleRef}></div>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <p
            className={cls(classes.content, classes.contentShowed)}
          >
            Happy 1st Birthday, Student Suite!
          </p>
        </div>
      </ButtonBase>
    </div>
  );
}

export default ConfettiBtn;

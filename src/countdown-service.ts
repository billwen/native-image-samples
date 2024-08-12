import {RequestHandler} from "express";
import {CountdownOptions, HexadecimalColor, NativeImage} from "@billwen/native-image";
import path from "node:path";

// Initialize the countdown service
const labelColor: HexadecimalColor = "#ffffff";
const digitColor: HexadecimalColor = "#ffffff";
const fontRegularFile = path.resolve(__dirname, "../outputs/fonts/NotoIKEALatin-Regular.ttf");
const fontBoldFile = path.resolve(__dirname, "../outputs/fonts/NotoIKEALatin-Bold.ttf");

const countdownOptions: CountdownOptions = {
  name: "red-v1-en",
  width: 273,
  height: 71,
  bgColor: "#cc0008",
  langs: ["en"],
  labels: {
    days: {
      text: "<span foreground='#ffffff' face='Noto IKEA Latin' weight='normal' size='16pt' >days</span>",
      position: {x: 0, y: 40, width: 60, height: 31},
      color: labelColor,
      textAlignment: "center",
      fontFile: fontRegularFile
    },
    hours: {
      text: "<span foreground='#ffffff' face='Noto IKEA Latin' weight='normal' size='16pt' >hrs</span>",
      paddingBottom: 3,
      position: {x: 71, y: 40, width: 60, height: 31},
      color: labelColor,
      textAlignment: "center",
      fontFile: fontRegularFile
    },
    minutes: {
      text: "<span foreground='#ffffff' face='Noto IKEA Latin' weight='normal' size='16pt' >min</span>",
      paddingTop: 1,
      paddingBottom: 4,
      position: {x: 142, y: 40, width: 60, height: 31},
      color: labelColor,
      textAlignment: "center",
      fontFile: fontRegularFile
    },
    seconds: {
      text: "<span foreground='#ffffff' face='Noto IKEA Latin' weight='normal' size='16pt' >sec</span>",
      paddingTop: 4,
      paddingBottom: 3,
      position: {x: 213, y: 40, width: 60, height: 31},
      color: labelColor,
      textAlignment: "center",
      fontFile: fontRegularFile
    }
  },
  digits: {
    positions: {
      days: {
        position: {x: 0, y: 5},
      },
      hours: {
        position: {x: 71, y: 5},
      },
      minutes: {
        position: {x: 142, y: 5},
      },
      seconds: {
        position: {x: 213, y: 5},
      }
    },
    style: {

      color: digitColor,
      width: 60,
      height: 40,
      textAlignment: "center",
      fontFile: fontBoldFile
    },
    textTemplate: "<span foreground='#ffffff' face='Noto IKEA Latin' weight='bold' size='32pt' >%s</span>",

  }
}

export function countdownService(): RequestHandler {
  const countdownTemplate = NativeImage.createCountdownAnimation(countdownOptions);

  return (req, res) => {

    try {
      res.setHeader('Cache-Control', 'public, max-age=30');
      const start = Date.now();
      const buf = countdownTemplate.renderCountdownAnimation({days: 1, hours: 2, minutes: 3, seconds: 4}, 60);
      const pt = Date.now() - start;
      console.log(`Processing time ${pt}`);
      res.setHeader("Content-Type", "image/gif");
      res.send(buf);
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal server error");
      return;
    }

    return;
  };
}
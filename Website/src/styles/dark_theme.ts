const dark_theme: any = {
  "@global": {
    html: {
      height: "100%",
      width: "100%",
    },
    body: {
      position: "absolute",
      overflow: "hidden",
      top: "0",
      right: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      margin: "0",
      webkitTextSizeAdjust: "100%",
      touchAction: "manipulation",
    },
    "a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video":
      {
        webkitUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        webkitTapHighlightColor: "transparent",
        webkitTouchCallout: "none",
      },
    "input, select, textarea": {
      webkitUserSelect: "auto",
      msUserSelect: "auto",
      userSelect: "auto",
      mozUserSelect: "text",
      webkitTouchCallout: "none",
    },
    "a, button, input, select, textarea": {
      touchAction: "manipulation",
    },
    "input:active, input:focus, select:active, select:focus, textarea:active, textarea:focus": {
      outline: "0",
    },
    h1: {
      fontSize: "36px",
    },
    h2: {
      fontSize: "30px",
    },
    h3: {
      fontSize: "24px",
    },
    "h4, h5, h6": {
      fontSize: "18px",
    },
    ".page": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      backgroundColor: "#121212",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      overflowX: "visible",
      overflowY: "hidden",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          webkitFontSmoothing: "antialiased",
        },
        {
          color: "#fff",
        },
      ],
      msOverflowStyle: "none",
    },
    ".page::-webkit-scrollbar": {
      display: "none",
    },
    ".page__content": {
      backgroundColor: "#121212",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      boxSizing: "border-box",
      fallbacks: [
        {
          bottom: "0",
        },
        {
          top: "0",
        },
      ],
      paddingTop: "0",
    },
    ".page__background": {
      backgroundColor: "#121212",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      boxSizing: "border-box",
    },
    ".page--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      backgroundColor: "#121212",
    },
    ".page--material__content": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
    },
    ".page__content h1, .page__content h2, .page__content h3, .page__content h4, .page__content h5": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "500",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      margin: "0.6em 0",
      padding: "0",
    },
    ".page__content h1": {
      fontSize: "28px",
    },
    ".page__content h2": {
      fontSize: "24px",
    },
    ".page__content h3": {
      fontSize: "20px",
    },
    ".page--material__content h1, .page--material__content h2, .page--material__content h3, .page--material__content h4, .page--material__content h5":
      {
        fontFamily: "Roboto, Noto, sans-serif",
        webkitFontSmoothing: "antialiased",
        fontWeight: "500",
        fallbacks: [
          {
            fontWeight: "400",
          },
        ],
        margin: "0.6em 0",
        padding: "0",
      },
    ".page--material__content h1": {
      fontSize: "28px",
    },
    ".page--material__content h2": {
      fontSize: "24px",
    },
    ".page--material__content h3": {
      fontSize: "20px",
    },
    ".page--material__background": {
      backgroundColor: "#121212",
    },
    ".switch": {
      display: "inline-block",
      verticalAlign: "top",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      position: "relative",
      minWidth: "51px",
      fontSize: "17px",
      padding: "0 20px",
      border: "none",
      overflow: "visible",
      width: "51px",
      height: "32px",
      zIndex: "0",
      textAlign: "left",
    },
    ".switch__input": {
      position: "absolute",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      border: "0",
      backgroundColor: "transparent",
      zIndex: "0",
      verticalAlign: "top",
      outline: "0",
      width: "100%",
      height: "100%",
      margin: "0",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
      fallbacks: [
        {
          zIndex: "1",
        },
      ],
    },
    ".switch__toggle": {
      backgroundColor: "#fff",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      borderRadius: "30px",
      transitionProperty: "all",
      transitionDuration: "0.35s",
      transitionTimingFunction: "ease-out",
      boxShadow: "inset 0 0 0 2px #e5e5e5",
    },
    ".switch__handle": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      position: "absolute",
      content: '""',
      borderRadius: "28px",
      height: "28px",
      width: "28px",
      backgroundColor: "#fff",
      left: "1px",
      top: "2px",
      transitionProperty: "all",
      transitionDuration: "0.35s",
      transitionTimingFunction: "cubic-bezier(0.59, 0.01, 0.5, 0.99)",
      boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25), 0 3px 2px rgba(0, 0, 0, 0.25)",
    },
    ".switch--active__handle": {
      transition: "none",
    },
    ":checked + .switch__toggle": {
      boxShadow: "inset 0 0 0 2px #44db5e",
      backgroundColor: "#44db5e",
    },
    ":checked + .switch__toggle > .switch__handle": {
      left: "21px",
      boxShadow: "0 3px 2px rgba(0, 0, 0, 0.25)",
    },
    ":disabled + .switch__toggle": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".switch__touch": {
      position: "absolute",
      top: "-5px",
      bottom: "-5px",
      left: "-10px",
      right: "-10px",
    },
    ".switch--material": {
      width: "36px",
      height: "24px",
      padding: "0 10px",
      minWidth: "36px",
    },
    ".switch--material__toggle": {
      backgroundColor: "#b0afaf",
      marginTop: "5px",
      height: "14px",
      boxShadow: "none",
    },
    ".switch--material__input": {
      position: "absolute",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      border: "0",
      backgroundColor: "transparent",
      zIndex: "0",
      verticalAlign: "top",
      outline: "0",
      width: "100%",
      height: "100%",
      margin: "0",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
      fallbacks: [
        {
          zIndex: "1",
        },
      ],
    },
    ".switch--material__handle": {
      backgroundColor: "#f1f1f1",
      left: "0",
      marginTop: "-5px",
      width: "20px",
      height: "20px",
      boxShadow: "0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),\r\n    0 2px 4px -1px rgba(0, 0, 0, 0.4)",
    },
    ":checked + .switch--material__toggle": {
      backgroundColor: "#7c43bd",
      boxShadow: "none",
    },
    ":checked + .switch--material__toggle > .switch--material__handle": {
      left: "16px",
      backgroundColor: "#bb86fc",
      boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
    },
    ":disabled + .switch--material__toggle": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".switch--material__handle:before": {
      background: "0 0",
      content: '""',
      display: "block",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      zIndex: "0",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.12)",
      transition: "box-shadow 0.1s linear",
    },
    ".switch--material__toggle > .switch--active__handle:before": {
      boxShadow: "0 0 0 14px rgba(0, 0, 0, 0.12)",
    },
    ":checked + .switch--material__toggle > .switch--active__handle:before": {
      boxShadow: "0 0 0 14px color-mod(#bb86fc alpha(20%))",
    },
    ".switch--material__touch": {
      position: "absolute",
      top: "-10px",
      bottom: "-10px",
      left: "-15px",
      right: "-15px",
    },
    ".range": {
      display: "inline-block",
      position: "relative",
      width: "100px",
      height: "30px",
      margin: "0",
      padding: "0",
      backgroundImage: "linear-gradient(#a4aab3, #a4aab3)",
      backgroundPosition: "left center",
      backgroundSize: "100% 2px",
      backgroundRepeat: "no-repeat",
      backgroundColor: "transparent",
    },
    ".range__input": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      verticalAlign: "top",
      outline: "0",
      lineHeight: "1",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
      backgroundImage: "linear-gradient(#4a148c, #4a148c)",
      backgroundPosition: "left center",
      backgroundSize: "0 2px",
      backgroundRepeat: "no-repeat",
      height: "30px",
      position: "relative",
      zIndex: "1",
      width: "100%",
    },
    ".range__input::-moz-range-track": {
      position: "relative",
      border: "none",
      background: "0 0",
      boxShadow: "none",
      top: "0",
      margin: "0",
      padding: "0",
    },
    ".range__input::-ms-track": {
      position: "relative",
      border: "none",
      backgroundColor: "#a4aab3",
      height: "0",
      borderRadius: "50%",
    },
    ".range__input::-webkit-slider-thumb": {
      cursor: "pointer",
      position: "relative",
      height: "28px",
      width: "28px",
      backgroundColor: "#fff",
      border: "none",
      boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25), 0 3px 2px rgba(0, 0, 0, 0.25)",
      borderRadius: "50%",
      margin: "0",
      padding: "0",
      boxSizing: "border-box",
      webkitAppearance: "none",
      appearance: "none",
      top: "0",
      zIndex: "1",
    },
    ".range__input::-moz-range-thumb": {
      cursor: "pointer",
      position: "relative",
      height: "28px",
      width: "28px",
      backgroundColor: "#fff",
      border: "none",
      boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25), 0 3px 2px rgba(0, 0, 0, 0.25)",
      borderRadius: "50%",
      margin: "0",
      padding: "0",
    },
    ".range__input::-ms-thumb": {
      cursor: "pointer",
      position: "relative",
      height: "28px",
      width: "28px",
      backgroundColor: "#fff",
      border: "none",
      boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25), 0 3px 2px rgba(0, 0, 0, 0.25)",
      borderRadius: "50%",
      margin: "0",
      padding: "0",
      top: "0",
    },
    ".range__input::-ms-fill-lower": {
      height: "2px",
      backgroundColor: "#4a148c",
    },
    ".range__input::-ms-tooltip": {
      display: "none",
    },
    ".range__input:disabled": {
      opacity: "1",
      pointerEvents: "none",
    },
    ".range__focus-ring": {
      pointerEvents: "none",
      top: "0",
      left: "0",
      display: "none",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      verticalAlign: "top",
      outline: "0",
      lineHeight: "1",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
      fallbacks: [
        {
          background: "0 0",
        },
      ],
      height: "30px",
      position: "absolute",
      zIndex: "0",
      width: "100%",
    },
    ".range--disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
      fallbacks: [
        {
          pointerEvents: "none",
        },
      ],
    },
    ".range--material": {
      position: "relative",
      backgroundImage: "linear-gradient(#bdbdbd, #bdbdbd)",
    },
    ".range--material__input": {
      backgroundImage: "linear-gradient(#bb86fc, #bb86fc)",
      backgroundPosition: "center left",
      backgroundSize: "0 2px",
    },
    ".range--material__focus-ring": {
      display: "block",
    },
    ".range--material__focus-ring::-webkit-slider-thumb": {
      webkitAppearance: "none",
      appearance: "none",
      width: "14px",
      height: "14px",
      border: "none",
      boxShadow: "0 0 0 9px #bb86fc",
      backgroundColor: "#bb86fc",
      borderRadius: "50%",
      opacity: "0",
      transition: "opacity 0.25s ease-out, transform 0.25s ease-out,\r\n    -webkit-transform 0.25s ease-out",
      fallbacks: [
        {
          transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
        },
        {
          transition: "opacity 0.25s ease-out, -webkit-transform 0.25s ease-out",
        },
      ],
    },
    ".range--material__input.range__input--active\r\n  + .range--material__focus-ring::-webkit-slider-thumb": {
      opacity: "0.2",
      webkitTransform: "scale(1.5, 1.5, 1.5)",
      transform: "scale(1.5, 1.5, 1.5)",
    },
    ".range--material__input::-webkit-slider-thumb": {
      position: "relative",
      boxSizing: "border-box",
      border: "none",
      backgroundColor: "transparent",
      width: "14px",
      height: "32px",
      borderRadius: "0",
      boxShadow: "none",
      backgroundImage:
        "radial-gradient(\r\n    circle farthest-corner,\r\n    #bb86fc 0,\r\n    #bb86fc 6.6px,\r\n    transparent 7px\r\n  )",
      transition: "transform 0.1s linear, -webkit-transform 0.1s linear",
      fallbacks: [
        {
          transition: "transform 0.1s linear",
        },
        {
          transition: "-webkit-transform 0.1s linear",
        },
      ],
      overflow: "visible",
    },
    ".range--material__input[_zero]::-webkit-slider-thumb": {
      backgroundImage:
        "radial-gradient(\r\n    circle farthest-corner,\r\n    #f2f2f2 0,\r\n    #f2f2f2 4px,\r\n    #bdbdbd 4px,\r\n    #bdbdbd 6.4px,\r\n    transparent 7px\r\n  )",
    },
    ".range--material__input[_zero]\r\n  + .range--material__focus-ring::-webkit-slider-thumb": {
      boxShadow: "0 0 0 9px #bdbdbd",
    },
    ".range--material__input::-moz-range-track": {
      background: "0 0",
    },
    ".range--material__input::-moz-range-thumb, .range--material__input:focus::-moz-range-thumb": {
      boxSizing: "border-box",
      border: "none",
      width: "14px",
      height: "32px",
      borderRadius: "0",
      backgroundColor: "transparent",
      backgroundImage:
        "-moz-radial-gradient(\r\n    circle farthest-corner,\r\n    #bb86fc 0,\r\n    #bb86fc 6.6px,\r\n    transparent 7px\r\n  )",
      boxShadow: "none",
    },
    ".range--material__input.range__input--active::-webkit-slider-thumb, .range--material__input:active::-webkit-slider-thumb": {
      webkitTransform: "scale(1.5)",
      transform: "scale(1.5)",
      transition: "transform 0.1s linear, -webkit-transform 0.1s linear",
      fallbacks: [
        {
          transition: "transform 0.1s linear",
        },
        {
          transition: "-webkit-transform 0.1s linear",
        },
      ],
    },
    ".range--disabled.range--material": {
      opacity: "1",
    },
    ".range--disabled > .range--material__input": {
      backgroundImage: "none",
    },
    ".range--material__input:disabled::-webkit-slider-thumb": {
      backgroundImage:
        "radial-gradient(\r\n    circle farthest-corner,\r\n    #b0b0b0 0,\r\n    #b0b0b0 4px,\r\n    #eee 4.4px,\r\n    #eee 7.6px,\r\n    transparent 7.6px\r\n  )",
      transition: "none",
    },
    ".range--material__input:disabled::-moz-range-thumb": {
      backgroundImage:
        "-moz-radial-gradient(\r\n    circle farthest-corner,\r\n    #b0b0b0 0,\r\n    #b0b0b0 4px,\r\n    #eee 4.4px,\r\n    #eee 7.6px,\r\n    transparent 7.6px\r\n  )",
      transition: "none",
    },
    ".notification": {
      position: "relative",
      display: "inline-block",
      verticalAlign: "top",
      font: "inherit",
      border: "none",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0 4px",
      margin: "0",
      fallbacks: [
        {
          fontWeight: "400",
        },
        {
          lineHeight: "normal",
        },
        {
          color: "inherit",
        },
        {
          padding: "0",
        },
        {
          margin: "0",
        },
        {
          border: "none",
        },
        {
          font: "inherit",
        },
      ],
      color: "#fff",
      background: "0 0",
      lineHeight: "19px",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textDecoration: "none",
      width: "auto",
      height: "19px",
      borderRadius: "19px",
      backgroundColor: "#fe3824",
      textAlign: "center",
      fontSize: "16px",
      minWidth: "19px",
    },
    ".notification:empty": {
      display: "none",
    },
    ".notification--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "500",
      backgroundColor: "#bb86fc",
      fontSize: "16px",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      color: "#fff",
    },
    ".toolbar": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      whiteSpace: "nowrap",
      overflow: "hidden",
      wordSpacing: "0",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "#1f1f21",
      background: "#fafafa",
      border: "none",
      lineHeight: "normal",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      zIndex: "2",
      display: "flex",
      fallbacks: [
        {
          boxSizing: "border-box",
        },
        {
          whiteSpace: "nowrap",
        },
        {
          fontWeight: "400",
        },
        {
          color: "inherit",
        },
        {
          background: "0 0",
        },
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      webkitBoxAlign: "stretch",
      webkitAlignItems: "stretch",
      alignItems: "stretch",
      webkitFlexWrap: "nowrap",
      flexWrap: "nowrap",
      height: "44px",
      paddingLeft: "0",
      paddingRight: "0",
      boxShadow: "none",
      width: "100%",
      borderBottom: "none",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(0deg, #b2b2b2, #b2b2b2 100%)",
      top: "0",
      paddingTop: "0",
    },
    "@media (-webkit-min-device-pixel-ratio: 2),\r\n  (min-resolution: 192dpi),\r\n  (min-resolution: 2dppx)": {
      ".toolbar": {
        backgroundImage: "linear-gradient(\r\n      0deg,\r\n      #b2b2b2,\r\n      #b2b2b2 50%,\r\n      transparent 50%\r\n    )",
      },
      ".bottom-bar": {
        backgroundImage: "linear-gradient(\r\n      180deg,\r\n      #b2b2b2,\r\n      #b2b2b2 50%,\r\n      transparent 50%\r\n    )",
      },
      ".tabbar": {
        borderTop: "none",
        backgroundSize: "100% 1px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundImage: "linear-gradient(180deg, #ccc, #ccc 50%, transparent 50%)",
      },
      ".tabbar__button": {
        borderTop: "none",
      },
      ".tabbar--top": {
        borderBottom: "none",
        backgroundSize: "100% 1px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
      },
      ".list": {
        backgroundImage:
          "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%),\r\n      linear-gradient(180deg, #ccc, #ccc 50%, transparent 50%)",
      },
      ".list-item--expandable": {
        backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
      },
      ".list-item__center": {
        backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
      },
      ".list-item__right": {
        backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
      },
      ".list-header": {
        backgroundImage: "linear-gradient(180deg, #ccc, #ccc 50%, transparent 50%)",
      },
      ".list-item--material__center, .list-item--material__left:empty": {
        backgroundImage: "linear-gradient(\r\n      0deg,\r\n      #1f1f1f,\r\n      #1f1f1f 50%,\r\n      transparent 50%\r\n    )",
      },
      ".list-item--material__right": {
        backgroundImage: "linear-gradient(\r\n      0deg,\r\n      #1f1f1f,\r\n      #1f1f1f 50%,\r\n      transparent 50%\r\n    )",
      },
      ".list-item--material.list-item--expandable": {
        backgroundImage: "linear-gradient(\r\n      0deg,\r\n      #1f1f1f,\r\n      #1f1f1f 50%,\r\n      transparent 50%\r\n    )",
      },
      ".list-item--material.list-item--expandable.list-item--longdivider, .list-item--material.list-item--longdivider": {
        backgroundImage: "linear-gradient(\r\n      0deg,\r\n      #1f1f1f,\r\n      #1f1f1f 50%,\r\n      transparent 50%\r\n    )",
      },
      ".list-header--material:not(:first-of-type)": {
        backgroundImage: "linear-gradient(\r\n      180deg,\r\n      #1f1f1f,\r\n      #1f1f1f 50%,\r\n      transparent 50%\r\n    )",
      },
      ".list-item--longdivider": {
        backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
      },
      ".alert-dialog-button": {
        borderTop: "none",
        backgroundSize: "100% 1px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundImage: "linear-gradient(180deg, #ddd, #ddd 50%, transparent 50%)",
      },
      ".alert-dialog-button--rowfooter": {
        borderTop: "none",
        borderLeft: "none",
        backgroundSize: "100% 1px, 1px 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top, left",
        backgroundImage:
          "linear-gradient(\r\n        0deg,\r\n        transparent,\r\n        transparent 50%,\r\n        #ddd 50%\r\n      ),\r\n      linear-gradient(90deg, transparent, transparent 50%, #ddd 50%)",
      },
      ".alert-dialog-button--rowfooter:first-child": {
        borderTop: "none",
        backgroundSize: "100% 1px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top, left",
        backgroundImage: "linear-gradient(\r\n      0deg,\r\n      transparent,\r\n      transparent 50%,\r\n      #ddd 50%\r\n    )",
      },
      ".alert-dialog-button--material": {
        background: "0 0",
      },
      ".alert-dialog-button--rowfooter--material, .alert-dialog-button--rowfooter--material:first-child": {
        background: "0 0",
      },
      ".alert-dialog-button--primal--material": {
        background: "0 0",
      },
      ".action-sheet-button": {
        backgroundImage:
          "linear-gradient(\r\n      0deg,\r\n      rgba(0, 0, 0, 0.1),\r\n      rgba(0, 0, 0, 0.1) 50%,\r\n      transparent 50%\r\n    )",
      },
      ".action-sheet-title": {
        backgroundImage:
          "linear-gradient(\r\n      0deg,\r\n      rgba(0, 0, 0, 0.1),\r\n      rgba(0, 0, 0, 0.1) 50%,\r\n      transparent 50%\r\n    )",
      },
    },
    ".toolbar__bg": {
      background: "#fafafa",
    },
    ".toolbar__item": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      height: "44px",
      overflow: "visible",
      display: "block",
      verticalAlign: "middle",
    },
    ".toolbar__left": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      lineHeight: "44px",
      maxWidth: "50%",
      width: "27%",
      textAlign: "left",
      fallbacks: [
        {
          lineHeight: "normal",
        },
      ],
    },
    ".toolbar__right": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      lineHeight: "44px",
      maxWidth: "50%",
      width: "27%",
      textAlign: "right",
      fallbacks: [
        {
          lineHeight: "normal",
        },
      ],
    },
    ".toolbar__center": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "#1f1f21",
      background: "0 0",
      border: "none",
      lineHeight: "44px",
      width: "46%",
      textAlign: "center",
      fallbacks: [
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
      ],
      fontSize: "17px",
      fontWeight: "500",
    },
    ".toolbar__title": {
      lineHeight: "44px",
      fontSize: "17px",
      fontWeight: "500",
      color: "#1f1f21",
      margin: "0",
      padding: "0",
      overflow: "visible",
    },
    ".toolbar__center:first-child:last-child": {
      width: "100%",
    },
    ".bottom-bar": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      whiteSpace: "nowrap",
      overflow: "hidden",
      wordSpacing: "0",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "#1f1f21",
      background: "#fafafa",
      border: "none",
      lineHeight: "normal",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      zIndex: "2",
      display: "block",
      height: "44px",
      paddingLeft: "0",
      paddingRight: "0",
      fallbacks: [
        {
          boxSizing: "border-box",
        },
        {
          bottom: "0",
        },
        {
          borderTop: "1px solid #b2b2b2",
        },
        {
          fontWeight: "400",
        },
        {
          color: "inherit",
        },
        {
          background: "0 0",
        },
      ],
      boxShadow: "none",
      borderBottom: "none",
      borderTop: "none",
      position: "absolute",
      bottom: "0",
      right: "0",
      left: "0",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top",
      backgroundImage: "linear-gradient(180deg, #b2b2b2, #b2b2b2 100%)",
      paddingBottom: "0",
    },
    ".bottom-bar__line-height": {
      lineHeight: "44px",
      paddingBottom: "0",
      paddingTop: "0",
    },
    ".bottom-bar--aligned": {
      display: "flex",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      webkitFlexWrap: "nowrap",
      flexWrap: "nowrap",
      lineHeight: "44px",
    },
    ".bottom-bar--transparent": {
      backgroundColor: "transparent",
      backgroundImage: "none",
      border: "none",
    },
    ".toolbar--material": {
      display: "flex",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      webkitFlexWrap: "nowrap",
      flexWrap: "nowrap",
      webkitBoxPack: "justify",
      webkitJustifyContent: "space-between",
      justifyContent: "space-between",
      height: "56px",
      borderBottom: "0",
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
      padding: "0",
      backgroundColor: "#1f1f1f",
      backgroundSize: "0",
    },
    ".toolbar--noshadow": {
      boxShadow: "none",
      backgroundImage: "none",
      borderBottom: "none",
    },
    ".toolbar--material__left, .toolbar--material__right": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "500",
      fontSize: "20px",
      fallbacks: [
        {
          color: "#fff",
        },
        {
          fontWeight: "400",
        },
      ],
      color: "rgba(255, 255, 255, 1)",
      height: "56px",
      minWidth: "72px",
      width: "auto",
      lineHeight: "56px",
    },
    ".toolbar--material__center": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "500",
      fontSize: "20px",
      fallbacks: [
        {
          color: "#fff",
        },
        {
          fontWeight: "400",
        },
      ],
      color: "rgba(255, 255, 255, 1)",
      height: "56px",
      width: "auto",
      webkitBoxFlex: "1",
      webkitFlexGrow: "1",
      flexGrow: "1",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "left",
      lineHeight: "56px",
    },
    ".toolbar--material__center:first-child": {
      marginLeft: "16px",
    },
    ".toolbar--material__center:last-child": {
      marginRight: "16px",
    },
    ".toolbar--material__left:empty, .toolbar--material__right:empty": {
      minWidth: "16px",
    },
    ".toolbar--transparent": {
      backgroundColor: "transparent",
      boxShadow: "none",
      backgroundImage: "none",
      borderBottom: "none",
    },
    ".button": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "4px 10px",
      margin: "0",
      font: "inherit",
      color: "#fff",
      background: "0 0",
      border: "0 solid currentColor",
      lineHeight: "32px",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "auto",
      textDecoration: "none",
      fallbacks: [
        {
          border: "none",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
        {
          padding: "0",
        },
      ],
      fontSize: "17px",
      letterSpacing: "0",
      verticalAlign: "middle",
      backgroundColor: "#4a148c",
      borderRadius: "3px",
      transition: "none",
    },
    ".button::-moz-focus-inner": {
      outline: "0",
    },
    ".button:hover": {
      transition: "none",
    },
    ".button:active": {
      backgroundColor: "#4a148c",
      transition: "none",
      opacity: "0.2",
    },
    ".button:focus": {
      outline: "0",
    },
    ".button:disabled, .button[disabled]": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".button--outline": {
      backgroundColor: "transparent",
      border: "1px solid #4a148c",
      color: "#4a148c",
    },
    ".button--outline:active": {
      backgroundColor: "color-mod(#4a148c tint(70%))",
      border: "1px solid #4a148c",
      color: "#4a148c",
      opacity: "1",
    },
    ".button--outline:hover": {
      border: "1px solid #4a148c",
      transition: "0",
    },
    ".button--light": {
      backgroundColor: "transparent",
      color: "color-mod(black a(40%))",
      border: "1px solid color-mod(black a(20%))",
    },
    ".button--light:active": {
      backgroundColor: "color-mod(black a(5%))",
      color: "color-mod(black a(40%))",
      border: "1px solid color-mod(black a(20%))",
      opacity: "1",
    },
    ".button--quiet": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "4px 10px",
      margin: "0",
      font: "inherit",
      color: "#4a148c",
      background: "0 0",
      border: "none",
      lineHeight: "32px",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "auto",
      textDecoration: "none",
      fallbacks: [
        {
          border: "1px solid transparent",
        },
        {
          color: "#fff",
        },
        {
          background: "0 0",
        },
        {
          border: "0 solid currentColor",
        },
        {
          background: "0 0",
        },
        {
          border: "none",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
        {
          padding: "0",
        },
      ],
      fontSize: "17px",
      letterSpacing: "0",
      verticalAlign: "middle",
      backgroundColor: "#4a148c",
      borderRadius: "3px",
      transition: "none",
      boxShadow: "none",
    },
    ".button--quiet:disabled, .button--quiet[disabled]": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
      border: "none",
    },
    ".button--quiet:hover": {
      transition: "none",
    },
    ".button--quiet:focus": {
      outline: "0",
    },
    ".button--quiet:active": {
      backgroundColor: "transparent",
      border: "none",
      transition: "none",
      opacity: "0.2",
      color: "#4a148c",
    },
    ".button--cta": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "4px 10px",
      margin: "0",
      font: "inherit",
      color: "#fff",
      background: "0 0",
      border: "none",
      lineHeight: "32px",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "auto",
      textDecoration: "none",
      fallbacks: [
        {
          color: "#fff",
        },
        {
          backgroundColor: "#4a148c",
        },
        {
          border: "0 solid currentColor",
        },
        {
          border: "none",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
        {
          padding: "0",
        },
      ],
      fontSize: "17px",
      letterSpacing: "0",
      verticalAlign: "middle",
      backgroundColor: "#7c43bd",
      borderRadius: "3px",
      transition: "none",
    },
    ".button--cta:hover": {
      transition: "none",
    },
    ".button--cta:focus": {
      outline: "0",
    },
    ".button--cta:active": {
      color: "#fff",
      backgroundColor: "#7c43bd",
      transition: "none",
      opacity: "0.2",
    },
    ".button--cta:disabled, .button--cta[disabled]": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".button--large": {
      fontSize: "17px",
      fontWeight: "500",
      lineHeight: "36px",
      padding: "4px 12px",
      display: "block",
      width: "100%",
      textAlign: "center",
    },
    ".button--large:active": {
      backgroundColor: "#4a148c",
      transition: "none",
      opacity: "0.2",
      fallbacks: [
        {
          transition: "none",
        },
      ],
    },
    ".button--large:disabled, .button--large[disabled]": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".button--large:hover": {
      transition: "none",
    },
    ".button--large:focus": {
      outline: "0",
    },
    ".button--large--quiet": {
      position: "relative",
      display: "block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "4px 12px",
      margin: "0",
      font: "inherit",
      color: "#4a148c",
      background: "0 0",
      border: "1px solid transparent",
      lineHeight: "36px",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "500",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "auto",
      textDecoration: "none",
      fallbacks: [
        {
          color: "#fff",
        },
        {
          border: "0 solid currentColor",
        },
        {
          background: "0 0",
        },
        {
          display: "inline-block",
        },
        {
          padding: "4px 10px",
        },
        {
          lineHeight: "32px",
        },
        {
          fontWeight: "400",
        },
        {
          fontSize: "17px",
        },
        {
          border: "none",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
        {
          padding: "0",
        },
      ],
      fontSize: "17px",
      letterSpacing: "0",
      verticalAlign: "middle",
      backgroundColor: "#4a148c",
      borderRadius: "3px",
      transition: "none",
      width: "100%",
      boxShadow: "none",
      textAlign: "center",
    },
    ".button--large--quiet:active": {
      transition: "none",
      opacity: "0.2",
      color: "#4a148c",
      background: "0 0",
      border: "1px solid transparent",
      boxShadow: "none",
    },
    ".button--large--quiet:disabled, .button--large--quiet[disabled]": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".button--large--quiet:hover": {
      transition: "none",
    },
    ".button--large--quiet:focus": {
      outline: "0",
    },
    ".button--large--cta": {
      position: "relative",
      display: "block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "4px 12px",
      margin: "0",
      font: "inherit",
      color: "#fff",
      background: "0 0",
      border: "none",
      lineHeight: "36px",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "500",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "auto",
      textDecoration: "none",
      fallbacks: [
        {
          display: "inline-block",
        },
        {
          padding: "4px 10px",
        },
        {
          lineHeight: "32px",
        },
        {
          fontWeight: "400",
        },
        {
          fontSize: "17px",
        },
        {
          color: "#fff",
        },
        {
          backgroundColor: "#4a148c",
        },
        {
          border: "0 solid currentColor",
        },
        {
          border: "none",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
        {
          padding: "0",
        },
      ],
      fontSize: "17px",
      letterSpacing: "0",
      verticalAlign: "middle",
      backgroundColor: "#7c43bd",
      borderRadius: "3px",
      transition: "none",
      width: "100%",
      textAlign: "center",
    },
    ".button--large--cta:hover": {
      transition: "none",
    },
    ".button--large--cta:focus": {
      outline: "0",
    },
    ".button--large--cta:active": {
      color: "#fff",
      backgroundColor: "#7c43bd",
      transition: "none",
      opacity: "0.2",
    },
    ".button--large--cta:disabled, .button--large--cta[disabled]": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".button--material": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0 16px",
      margin: "0",
      font: "inherit",
      color: "#fff",
      background: "0 0",
      border: "0 solid currentColor",
      lineHeight: "36px",
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "500",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "auto",
      textDecoration: "none",
      fallbacks: [
        {
          transition: "background-color 0.25s linear",
        },
        {
          transition: "none",
        },
        {
          fontWeight: "400",
        },
        {
          color: "#fff",
        },
        {
          backgroundColor: "#4a148c",
        },
        {
          fontSize: "17px",
        },
        {
          padding: "4px 10px",
        },
        {
          lineHeight: "32px",
        },
        {
          fontWeight: "400",
        },
        {
          webkitFontSmoothing: "antialiased",
        },
        {
          fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
        },
        {
          border: "none",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
        {
          padding: "0",
        },
      ],
      fontSize: "14px",
      letterSpacing: "0",
      verticalAlign: "middle",
      backgroundColor: "#bb86fc",
      borderRadius: "8px",
      transition: "all 0.25s linear",
      boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
      minHeight: "36px",
      textAlign: "center",
      webkitTransform: "translate3d(0, 0, 0)",
      transform: "translate3d(0, 0, 0)",
      textTransform: "uppercase",
      opacity: "1",
    },
    ".button--material:hover": {
      transition: "all 0.25s linear",
    },
    ".button--material:active": {
      boxShadow: "0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 5px -1px rgba(0, 0, 0, 0.4)",
      backgroundColor: "#bb86fc",
      opacity: "0.9",
      transition: "all 0.25s linear",
    },
    ".button--material:focus": {
      outline: "0",
    },
    ".button--material:disabled, .button--material[disabled]": {
      transition: "none",
      boxShadow: "none",
      backgroundColor: "color-mod(#4f4f4f a(26%))",
      color: "color-mod(black a(26%))",
      opacity: "1",
    },
    ".button--material--flat": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0 16px",
      margin: "0",
      font: "inherit",
      color: "#bb86fc",
      background: "0 0",
      border: "0 solid currentColor",
      lineHeight: "36px",
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "500",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "auto",
      textDecoration: "none",
      fallbacks: [
        {
          transition: "background-color 0.25s linear",
        },
        {
          color: "#fff",
        },
        {
          backgroundColor: "#bb86fc",
        },
        {
          boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
        },
        {
          transition: "none",
        },
        {
          fontWeight: "400",
        },
        {
          color: "#fff",
        },
        {
          backgroundColor: "#4a148c",
        },
        {
          fontSize: "17px",
        },
        {
          padding: "4px 10px",
        },
        {
          lineHeight: "32px",
        },
        {
          fontWeight: "400",
        },
        {
          webkitFontSmoothing: "antialiased",
        },
        {
          fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
        },
        {
          border: "none",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
        {
          padding: "0",
        },
      ],
      fontSize: "14px",
      letterSpacing: "0",
      verticalAlign: "middle",
      backgroundColor: "transparent",
      borderRadius: "3px",
      transition: "all 0.25s linear",
      boxShadow: "none",
      minHeight: "36px",
      textAlign: "center",
      webkitTransform: "translate3d(0, 0, 0)",
      transform: "translate3d(0, 0, 0)",
      textTransform: "uppercase",
    },
    ".button--material--flat:hover": {
      transition: "all 0.25s linear",
    },
    ".button--material--flat:focus": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "#bb86fc",
      outline: "0",
      opacity: "1",
      border: "none",
    },
    ".button--material--flat:active": {
      boxShadow: "none",
      outline: "0",
      opacity: "1",
      border: "none",
      backgroundColor: "color-mod(#999 a(20%))",
      color: "#bb86fc",
      transition: "all 0.25s linear",
    },
    ".button--material--flat:disabled, .button--material--flat[disabled]": {
      transition: "none",
      opacity: "1",
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "color-mod(black a(26%))",
    },
    ".button-bar": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      display: "inline-flex",
      fallbacks: [
        {
          display: "-webkit-inline-flex",
        },
        {
          display: "-webkit-inline-box",
        },
      ],
      webkitBoxAlign: "stretch",
      webkitAlignItems: "stretch",
      alignItems: "stretch",
      webkitAlignContent: "stretch",
      alignContent: "stretch",
      webkitFlexWrap: "nowrap",
      flexWrap: "nowrap",
      margin: "0",
      padding: "0",
      border: "none",
    },
    ".button-bar__item": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      borderRadius: "0",
      width: "100%",
      padding: "0",
      margin: "0",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    },
    ".button-bar__button": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      borderRadius: "0",
      backgroundColor: "transparent",
      color: "#4a148c",
      border: "1px solid #4a148c",
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
      borderRightWidth: "1px",
      borderLeftWidth: "0",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      padding: "0",
      fontSize: "13px",
      height: "27px",
      lineHeight: "27px",
      width: "100%",
      transition: "background-color 0.2s linear, color 0.2s linear",
      boxSizing: "border-box",
    },
    ".button-bar__button:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".button-bar__button:hover": {
      transition: "none",
    },
    ".button-bar__button:focus": {
      outline: "0",
    },
    ":checked + .button-bar__button": {
      backgroundColor: "#4a148c",
      color: "#fff",
      transition: "none",
    },
    ".button-bar__button:active, :active + .button-bar__button": {
      backgroundColor: "color-mod(#4a148c tint(70%))",
      border: "0 solid #4a148c",
      borderTop: "1px solid #4a148c",
      borderBottom: "1px solid #4a148c",
      borderRight: "1px solid #4a148c",
      fontSize: "13px",
      width: "100%",
      transition: "none",
    },
    ".button-bar__item:first-child > .button-bar__button": {
      borderLeftWidth: "1px",
      borderRadius: "4px 0 0 4px",
    },
    ".button-bar__item:last-child > .button-bar__button": {
      borderRightWidth: "1px",
      borderRadius: "0 4px 4px 0",
    },
    ".segment": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      display: "inline-flex",
      fallbacks: [
        {
          display: "-webkit-inline-flex",
        },
        {
          display: "-webkit-inline-box",
        },
      ],
      webkitBoxAlign: "stretch",
      webkitAlignItems: "stretch",
      alignItems: "stretch",
      webkitAlignContent: "stretch",
      alignContent: "stretch",
      webkitFlexWrap: "nowrap",
      flexWrap: "nowrap",
      margin: "0",
      padding: "0",
      border: "none",
    },
    ".segment__item": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      borderRadius: "0",
      width: "100%",
      padding: "0",
      margin: "0",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "block",
      backgroundColor: "transparent",
      border: "none",
    },
    ".segment__input": {
      position: "absolute",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      border: "0",
      backgroundColor: "transparent",
      zIndex: "1",
      verticalAlign: "top",
      outline: "0",
      width: "100%",
      height: "100%",
      margin: "0",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
    },
    ".segment__button": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      borderRadius: "0",
      backgroundColor: "transparent",
      color: "#4a148c",
      border: "1px solid #4a148c",
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
      borderRightWidth: "1px",
      borderLeftWidth: "0",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      padding: "0",
      fontSize: "13px",
      height: "29px",
      lineHeight: "29px",
      width: "100%",
      transition: "background-color 0.2s linear, color 0.2s linear",
      boxSizing: "border-box",
      textAlign: "center",
    },
    ".segment__item:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".segment__button:hover": {
      transition: "none",
    },
    ".segment__button:focus": {
      outline: "0",
    },
    ":active + .segment__button": {
      backgroundColor: "color-mod(#4a148c tint(70%))",
      border: "0 solid #4a148c",
      borderTop: "1px solid #4a148c",
      borderBottom: "1px solid #4a148c",
      borderRight: "1px solid #4a148c",
      fontSize: "13px",
      width: "100%",
      transition: "none",
    },
    ":checked + .segment__button": {
      backgroundColor: "#4a148c",
      color: "#fff",
      transition: "none",
    },
    ".segment__item:first-child > .segment__button": {
      borderLeftWidth: "1px",
      borderRadius: "4px 0 0 4px",
    },
    ".segment__item:last-child > .segment__button": {
      borderRightWidth: "1px",
      borderRadius: "0 4px 4px 0",
    },
    ".segment--material": {
      borderRadius: "2px",
      overflow: "hidden",
      boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
    },
    ".segment--material__button": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      fontSize: "14px",
      height: "32px",
      lineHeight: "32px",
      borderWidth: "0",
      color: "color-mod(black a(38%))",
      borderRadius: "0",
      backgroundColor: "#fafafa",
    },
    ":active + .segment--material__button": {
      backgroundColor: "#fafafa",
      borderRadius: "0",
      borderWidth: "0",
      fontSize: "14px",
      transition: "none",
      color: "color-mod(black a(38%))",
    },
    ":checked + .segment--material__button": {
      backgroundColor: "#c8c8c8",
      color: "#353535",
      borderRadius: "0",
      borderWidth: "0",
    },
    ".segment--material__item:first-child > .segment--material__button, .segment--material__item:last-child > .segment--material__button": {
      borderRadius: "0",
      borderWidth: "0",
    },
    ".tabbar": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      display: "flex",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      whiteSpace: "nowrap",
      margin: "0",
      padding: "0",
      height: "49px",
      backgroundColor: "#fafafa",
      borderTop: "0px solid #ccc",
      width: "100%",
    },
    ".tabbar__item": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      position: "relative",
      webkitBoxFlex: "1",
      webkitFlexGrow: "1",
      flexGrow: "1",
      webkitFlexBasis: "0",
      flexBasis: "0",
      width: "auto",
      borderRadius: "0",
    },
    ".tabbar__item > input": {
      position: "absolute",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      border: "0",
      backgroundColor: "transparent",
      zIndex: "1",
      verticalAlign: "top",
      outline: "0",
      width: "100%",
      height: "100%",
      margin: "0",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
    },
    ".tabbar__button": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "#999",
      background: "0 0",
      border: "none",
      lineHeight: "49px",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      position: "relative",
      display: "inline-block",
      textDecoration: "none",
      fallbacks: [
        {
          lineHeight: "normal",
        },
        {
          fontWeight: "400",
        },
        {
          color: "inherit",
        },
        {
          padding: "0",
        },
      ],
      height: "49px",
      letterSpacing: "0",
      verticalAlign: "top",
      backgroundColor: "transparent",
      borderTop: "none",
      width: "100%",
    },
    ".tabbar__icon": {
      fontSize: "24px",
      padding: "0",
      margin: "0",
      lineHeight: "26px",
      display: "block !important",
      height: "28px",
    },
    ".tabbar__label": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      display: "inline-block",
    },
    ".tabbar__badge.notification": {
      verticalAlign: "text-bottom",
      top: "-1px",
      marginLeft: "5px",
      zIndex: "10",
      fontSize: "12px",
      height: "16px",
      minWidth: "16px",
      lineHeight: "16px",
      borderRadius: "8px",
    },
    ".tabbar__icon ~ .tabbar__badge.notification": {
      position: "absolute",
      top: "5px",
      marginLeft: "0",
    },
    ".tabbar__icon + .tabbar__label": {
      display: "block",
      fontSize: "10px",
      lineHeight: "1",
      margin: "0",
      fontWeight: "400",
    },
    ".tabbar__label:first-child": {
      fontSize: "16px",
      lineHeight: "49px",
      margin: "0",
      padding: "0",
    },
    ":checked + .tabbar__button": {
      color: "#4a148c",
      backgroundColor: "transparent",
      boxShadow: "none",
      borderTop: "none",
    },
    ".tabbar__button:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".tabbar__button:focus": {
      zIndex: "1",
      borderTop: "none",
      boxShadow: "none",
      outline: "0",
    },
    ".tabbar__content": {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "49px",
      zIndex: "0",
    },
    ".tabbar--autogrow .tabbar__item": {
      webkitFlexBasis: "auto",
      flexBasis: "auto",
    },
    ".tabbar--top": {
      position: "relative",
      top: "0",
      left: "0",
      right: "0",
      bottom: "auto",
      borderTop: "none",
      borderBottom: "1px solid #ccc",
      paddingTop: "0",
    },
    ".tabbar--top__content": {
      top: "49px",
      left: "0",
      right: "0",
      bottom: "0",
      zIndex: "0",
    },
    ".tabbar--top-border__button": {
      backgroundColor: "transparent",
      borderBottom: "4px solid transparent",
    },
    ":checked + .tabbar--top-border__button": {
      backgroundColor: "transparent",
      borderBottom: "4px solid #4a148c",
    },
    ".tabbar__border": {
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "0",
      height: "4px",
      backgroundColor: "#4a148c",
    },
    ".tabbar--material": {
      background: "0 0",
      backgroundColor: "#1f1f1f",
      borderBottomWidth: "0",
      boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.14),\r\n    0 3px 5px -2px rgba(0, 0, 0, 0.12), 0 5px 1px -4px rgba(0, 0, 0, 0.2)",
    },
    ".tabbar--material__button": {
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          fontWeight: "500",
        },
        {
          color: "#fff",
        },
      ],
      textTransform: "uppercase",
      fontSize: "14px",
      fontWeight: "400",
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
    },
    ".tabbar--material__button:after": {
      content: '""',
      display: "block",
      width: "0",
      height: "2px",
      bottom: "0",
      position: "absolute",
      marginTop: "-2px",
      backgroundColor: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          backgroundColor: "#fff",
        },
      ],
    },
    ":checked + .tabbar--material__button:after": {
      width: "100%",
      transition: "width 0.2s ease-in-out",
    },
    ":checked + .tabbar--material__button": {
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          color: "#fff",
        },
      ],
    },
    ".tabbar--material__item:not([ripple]):active": {
      backgroundColor: "rgba(49, 49, 58, 0.1)",
      fallbacks: [
        {
          backgroundColor: "#31313a",
        },
      ],
    },
    ".tabbar--material__border": {
      height: "2px",
      backgroundColor: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          backgroundColor: "#fff",
        },
      ],
    },
    ".tabbar--material__icon": {
      fontSize: "22px !important",
      lineHeight: "36px",
    },
    ".tabbar--material__label": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
    },
    ".tabbar--material__label:first-child": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "500",
      letterSpacing: "0.015em",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      fontSize: "14px",
    },
    ".tabbar--material__icon + .tabbar--material__label": {
      fontSize: "10px",
    },
    ".toolbar-button": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      padding: "4px 10px",
      letterSpacing: "0",
      color: "#4a148c",
      backgroundColor: "rgba(0, 0, 0, 0)",
      fallbacks: [
        {
          fontWeight: "400",
        },
        {
          backgroundColor: "#000",
        },
      ],
      borderRadius: "2px",
      border: "1px solid transparent",
      fontSize: "17px",
      transition: "none",
    },
    ".toolbar-button:active": {
      backgroundColor: "rgba(0, 0, 0, 0)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
      transition: "none",
      opacity: "0.2",
    },
    ".toolbar-button:disabled, .toolbar-button[disabled]": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".toolbar-button:focus": {
      outline: "0",
      transition: "none",
    },
    ".toolbar-button:hover": {
      transition: "none",
    },
    ".toolbar-button--outline": {
      border: "1px solid #4a148c",
      margin: "auto 8px",
      paddingLeft: "6px",
      paddingRight: "6px",
    },
    ".toolbar-button--material": {
      fontSize: "22px",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          verticalAlign: "baseline",
        },
        {
          color: "#fff",
        },
      ],
      display: "inline-block",
      padding: "0 12px",
      height: "100%",
      margin: "0",
      border: "none",
      borderRadius: "0",
      verticalAlign: "initial",
      transition: "background-color 0.25s linear",
    },
    ".toolbar-button--material:first-of-type": {
      marginLeft: "4px",
    },
    ".toolbar-button--material:last-of-type": {
      marginRight: "4px",
    },
    ".toolbar-button--material:active": {
      opacity: "1",
      transition: "background-color 0.25s linear",
    },
    ".back-button": {
      height: "44px",
      lineHeight: "44px",
      paddingLeft: "8px",
      color: "#4a148c",
      backgroundColor: "rgba(0, 0, 0, 0)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
      display: "inline-block",
    },
    ".back-button:active": {
      opacity: "0.2",
    },
    ".back-button__label": {
      display: "inline-block",
      height: "100%",
      verticalAlign: "top",
      lineHeight: "44px",
      fontSize: "17px",
      fontWeight: "500",
    },
    ".back-button__icon": {
      marginRight: "6px",
      display: "inline-flex",
      fallbacks: [
        {
          display: "-webkit-inline-flex",
        },
        {
          display: "-webkit-inline-box",
        },
      ],
      fill: "#4a148c",
      webkitBoxAlign: "center",
      webkitAlignItems: "center",
      alignItems: "center",
      height: "100%",
    },
    ".back-button--material": {
      fontSize: "22px",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          verticalAlign: "baseline",
        },
        {
          color: "#fff",
        },
      ],
      display: "inline-block",
      padding: "0 12px",
      height: "100%",
      margin: "0 0 0 4px",
      border: "none",
      borderRadius: "0",
      verticalAlign: "initial",
      lineHeight: "56px",
    },
    ".back-button--material__label": {
      display: "none",
      fontSize: "20px",
    },
    ".back-button--material__icon": {
      display: "inline-flex",
      fallbacks: [
        {
          display: "-webkit-inline-flex",
        },
        {
          display: "-webkit-inline-box",
        },
      ],
      fill: "rgba(255, 255, 255, 1)",
      webkitBoxAlign: "center",
      webkitAlignItems: "center",
      alignItems: "center",
      height: "100%",
    },
    ".back-button--material:active": {
      opacity: "1",
    },
    ".checkbox": {
      position: "relative",
      display: "inline-block",
      verticalAlign: "top",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      lineHeight: "22px",
    },
    ".checkbox__checkmark": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      position: "relative",
      display: "inline-block",
      verticalAlign: "top",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      fallbacks: [
        {
          position: "relative",
        },
      ],
      height: "22px",
      width: "22px",
      pointerEvents: "none",
    },
    ".checkbox__input, .checkbox__input:checked": {
      position: "absolute",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      border: "0",
      backgroundColor: "transparent",
      zIndex: "1",
      verticalAlign: "top",
      outline: "0",
      width: "100%",
      height: "100%",
      margin: "0",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
    },
    ".checkbox__checkmark:before": {
      content: '""',
      position: "absolute",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      width: "22px",
      height: "22px",
      background: "0 0",
      border: "1px solid #c7c7cd",
      borderRadius: "22px",
      left: "0",
    },
    ".checkbox__checkmark:after": {
      content: '""',
      position: "absolute",
      top: "7px",
      left: "5px",
      width: "11px",
      height: "5px",
      background: "0 0",
      border: "2px solid #fff",
      borderWidth: "1px",
      borderTop: "none",
      borderRight: "none",
      borderRadius: "0",
      webkitTransform: "rotate(-45deg)",
      transform: "rotate(-45deg)",
      opacity: "0",
    },
    ":checked + .checkbox__checkmark:before": {
      background: "#4a148c",
      border: "none",
    },
    ":checked + .checkbox__checkmark:after": {
      opacity: "1",
    },
    ":disabled + .checkbox__checkmark": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ":disabled:active + .checkbox__checkmark:before": {
      background: "0 0",
    },
    ".checkbox--noborder": {
      position: "relative",
      display: "inline-block",
      verticalAlign: "top",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      lineHeight: "22px",
      fallbacks: [
        {
          position: "relative",
        },
      ],
    },
    ".checkbox--noborder__input": {
      position: "absolute",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      border: "0",
      backgroundColor: "transparent",
      zIndex: "1",
      verticalAlign: "top",
      outline: "0",
      width: "100%",
      height: "100%",
      margin: "0",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
    },
    ".checkbox--noborder__checkmark": {
      position: "relative",
      display: "inline-block",
      verticalAlign: "top",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      width: "22px",
      height: "22px",
      background: "0 0",
      border: "none",
    },
    ".checkbox--noborder__checkmark:before": {
      content: '""',
      position: "absolute",
      width: "22px",
      height: "22px",
      background: "0 0",
      border: "none",
      borderRadius: "22px",
      left: "0",
    },
    ".checkbox--noborder__checkmark:after": {
      content: '""',
      position: "absolute",
      top: "7px",
      left: "4px",
      opacity: "0",
      width: "11px",
      height: "4px",
      background: "0 0",
      border: "2px solid #4a148c",
      borderTop: "none",
      borderRight: "none",
      borderRadius: "0",
      webkitTransform: "rotate(-45deg)",
      transform: "rotate(-45deg)",
    },
    ":checked + .checkbox--noborder__checkmark:before": {
      background: "0 0",
      border: "none",
    },
    ":checked + .checkbox--noborder__checkmark:after": {
      opacity: "1",
    },
    ":focus + .checkbox--noborder__checkmark:before": {
      border: "none",
    },
    ":disabled + .checkbox--noborder__checkmark": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ":disabled:active + .checkbox--noborder__checkmark:before": {
      background: "0 0",
      border: "none",
    },
    ".checkbox--material": {
      lineHeight: "18px",
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      overflow: "visible",
    },
    ".checkbox--material__checkmark": {
      width: "18px",
      height: "18px",
    },
    ".checkbox--material__checkmark:before": {
      borderRadius: "2px",
      height: "18px",
      width: "18px",
      border: "2px solid #717171",
      transition: "background-color 0.1s linear 0.2s, border-color 0.1s linear 0.2s",
      backgroundColor: "transparent",
    },
    ":checked + .checkbox--material__checkmark:before": {
      border: "2px solid #bb86fc",
      backgroundColor: "#bb86fc",
      transition: "background-color 0.1s linear, border-color 0.1s linear",
    },
    ".checkbox--material__checkmark:after": {
      borderColor: "#fff",
      transition: "transform 0.2s ease 0, -webkit-transform 0.2s ease 0",
      fallbacks: [
        {
          transition: "transform 0.2s ease 0",
        },
        {
          transition: "-webkit-transform 0.2s ease 0",
        },
      ],
      width: "10px",
      height: "5px",
      top: "4px",
      left: "3px",
      webkitTransform: "scale(0) rotate(-45deg)",
      transform: "scale(0) rotate(-45deg)",
      borderWidth: "2px",
    },
    ":checked + .checkbox--material__checkmark:after": {
      transition: "transform 0.2s ease 0.2s, -webkit-transform 0.2s ease 0.2s",
      fallbacks: [
        {
          transition: "transform 0.2s ease 0.2s",
        },
        {
          transition: "-webkit-transform 0.2s ease 0.2s",
        },
      ],
      width: "10px",
      height: "5px",
      top: "4px",
      left: "3px",
      webkitTransform: "scale(1) rotate(-45deg)",
      transform: "scale(1) rotate(-45deg)",
      borderWidth: "2px",
    },
    ".checkbox--material__input:before": {
      content: '""',
      opacity: "0",
      position: "absolute",
      top: "0",
      left: "0",
      width: "18px",
      height: "18px",
      boxShadow: "0 0 0 11px #717171",
      boxSizing: "border-box",
      borderRadius: "50%",
      backgroundColor: "#717171",
      pointerEvents: "none",
      display: "block",
      webkitTransform: "scale3d(0.2, 0.2, 0.2)",
      transform: "scale3d(0.2, 0.2, 0.2)",
      transition: "opacity 0.25s ease-out, transform 0.1s ease-out,\r\n    -webkit-transform 0.1s ease-out",
      fallbacks: [
        {
          transition: "opacity 0.25s ease-out, transform 0.1s ease-out",
        },
        {
          transition: "opacity 0.25s ease-out, -webkit-transform 0.1s ease-out",
        },
      ],
    },
    ".checkbox--material__input:checked:before": {
      boxShadow: "0 0 0 11px #bb86fc",
      backgroundColor: "#bb86fc",
    },
    ".checkbox--material__input:active:before": {
      opacity: "0.15",
      webkitTransform: "scale3d(1, 1, 1)",
      transform: "scale3d(1, 1, 1)",
    },
    ":disabled + .checkbox--material__checkmark": {
      opacity: "1",
    },
    ":disabled + .checkbox--material__checkmark:before": {
      borderColor: "#afafaf",
    },
    ":disabled:checked + .checkbox--material__checkmark:before": {
      backgroundColor: "#afafaf",
    },
    ":disabled:checked + .checkbox--material__checkmark:after": {
      borderColor: "#fff",
    },
    ".radio-button__input": {
      position: "absolute",
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      padding: "0",
      border: "0",
      backgroundColor: "transparent",
      zIndex: "1",
      verticalAlign: "top",
      outline: "0",
      width: "100%",
      height: "100%",
      margin: "0",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
    },
    ".radio-button__input:active, .radio-button__input:focus": {
      outline: "0",
      webkitTapHighlightColor: "transparent",
    },
    ".radio-button": {
      position: "relative",
      display: "inline-block",
      verticalAlign: "top",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fallbacks: [
        {
          position: "relative",
        },
      ],
      lineHeight: "24px",
      textAlign: "left",
    },
    ".radio-button__checkmark:before": {
      content: '""',
      position: "absolute",
      borderRadius: "22px",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      width: "22px",
      height: "22px",
      background: "0 0",
      border: "none",
      fallbacks: [
        {
          borderRadius: "100%",
        },
      ],
      left: "0",
    },
    ".radio-button__checkmark": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      position: "relative",
      display: "inline-block",
      verticalAlign: "top",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      fallbacks: [
        {
          position: "relative",
        },
        {
          position: "relative",
        },
      ],
      width: "24px",
      height: "24px",
      background: "0 0",
      pointerEvents: "none",
    },
    ".radio-button__checkmark:after": {
      content: '""',
      position: "absolute",
      top: "7px",
      left: "4px",
      opacity: "0",
      width: "11px",
      height: "4px",
      background: "0 0",
      border: "2px solid #4a148c",
      borderTop: "none",
      borderRight: "none",
      borderRadius: "0",
      webkitTransform: "rotate(-45deg)",
      transform: "rotate(-45deg)",
    },
    ":checked + .radio-button__checkmark": {
      background: "rgba(0, 0, 0, 0)",
      fallbacks: [
        {
          background: "#000",
        },
      ],
    },
    ":checked + .radio-button__checkmark:after": {
      opacity: "1",
    },
    ":checked + .radio-button__checkmark:before": {
      background: "0 0",
      border: "none",
    },
    ":disabled + .radio-button__checkmark": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".radio-button--material": {
      lineHeight: "22px",
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
    },
    ".radio-button--material__input:before": {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      opacity: "0",
      width: "20px",
      height: "20px",
      boxShadow: "0 0 0 14px rgba(123, 123, 123, 1)",
      border: "none",
      boxSizing: "border-box",
      borderRadius: "50%",
      backgroundColor: "rgba(123, 123, 123, 1)",
      fallbacks: [
        {
          transition: "opacity 0.25s ease-out, transform 0.1s ease-out",
        },
        {
          transition: "opacity 0.25s ease-out, -webkit-transform 0.1s ease-out",
        },
        {
          backgroundColor: "#7b7b7b",
        },
      ],
      pointerEvents: "none",
      display: "block",
      webkitTransform: "scale3d(0.2, 0.2, 0.2)",
      transform: "scale3d(0.2, 0.2, 0.2)",
      transition: "opacity 0.25s ease-out, transform 0.1s ease-out,\r\n    -webkit-transform 0.1s ease-out",
    },
    ".radio-button--material__input:checked:before": {
      boxShadow: "0 0 0 14px #bb86fc",
      backgroundColor: "#bb86fc",
    },
    ".radio-button--material__input:active:before": {
      opacity: "0.15",
      webkitTransform: "scale3d(1, 1, 1)",
      transform: "scale3d(1, 1, 1)",
    },
    ".radio-button--material__checkmark": {
      width: "20px",
      height: "20px",
      overflow: "visible",
    },
    ".radio-button--material__checkmark:before": {
      background: "0 0",
      border: "2px solid rgba(123, 123, 123, 1)",
      fallbacks: [
        {
          border: "2px solid #7b7b7b",
        },
      ],
      boxSizing: "border-box",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      transition: "border 0.2s ease",
    },
    ".radio-button--material__checkmark:after": {
      transition: "background 0.2s ease, transform 0.2s ease,\r\n    -webkit-transform 0.2s ease",
      fallbacks: [
        {
          transition: "background 0.2s ease, transform 0.2s ease",
        },
        {
          transition: "background 0.2s ease, -webkit-transform 0.2s ease",
        },
      ],
      top: "5px",
      left: "5px",
      width: "10px",
      height: "10px",
      border: "none",
      borderRadius: "50%",
      webkitTransform: "scale(0)",
      transform: "scale(0)",
    },
    ":checked + .radio-button--material__checkmark:before": {
      background: "0 0",
      border: "2px solid #bb86fc",
    },
    ".radio-button--material__input + .radio-button__checkmark:after": {
      background: "rgba(123, 123, 123, 1)",
      fallbacks: [
        {
          background: "#7b7b7b",
        },
      ],
      opacity: "1",
      webkitTransform: "scale(0)",
      transform: "scale(0)",
    },
    ":checked + .radio-button--material__checkmark:after": {
      opacity: "1",
      background: "#bb86fc",
      webkitTransform: "scale(1)",
      transform: "scale(1)",
    },
    ":disabled + .radio-button--material__checkmark": {
      opacity: "1",
    },
    ":disabled + .radio-button--material__checkmark:after": {
      backgroundColor: "#afafaf",
      borderColor: "#afafaf",
    },
    ":disabled + .radio-button--material__checkmark:before": {
      borderColor: "#afafaf",
    },
    ".list": {
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      listStyleType: "none",
      textAlign: "left",
      display: "block",
      webkitOverflowScrolling: "touch",
      overflow: "hidden",
      backgroundImage: "linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc)",
      backgroundSize: "100% 1px, 100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom, top",
      fallbacks: [
        {
          border: "none",
        },
      ],
      backgroundColor: "#fff",
    },
    ".list-item": {
      position: "relative",
      width: "100%",
      listStyle: "none",
      boxSizing: "border-box",
      display: "flex",
      fallbacks: [
        {
          color: "#fff",
        },
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      webkitBoxOrient: "horizontal",
      webkitBoxDirection: "normal",
      webkitFlexDirection: "row",
      flexDirection: "row",
      webkitBoxPack: "start",
      webkitJustifyContent: "flex-start",
      justifyContent: "flex-start",
      webkitBoxAlign: "center",
      webkitAlignItems: "center",
      alignItems: "center",
      padding: "0 0 0 14px",
      margin: "0 0 -1px 0",
      color: "rgba(255, 255, 255, 1)",
      transition: "background-color 0.2s linear",
    },
    ".list-item__top": {
      display: "flex",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      webkitBoxOrient: "horizontal",
      webkitBoxDirection: "normal",
      webkitFlexDirection: "row",
      flexDirection: "row",
      webkitBoxPack: "start",
      webkitJustifyContent: "flex-start",
      justifyContent: "flex-start",
      webkitBoxAlign: "center",
      webkitAlignItems: "center",
      alignItems: "center",
      webkitBoxOrdinalGroup: "1",
      webkitOrder: "0",
      order: "0",
      width: "100%",
    },
    ".list-item--expandable": {
      display: "flex",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      webkitBoxOrient: "vertical",
      webkitBoxDirection: "normal",
      webkitFlexDirection: "column",
      flexDirection: "column",
      borderBottom: "none",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
      backgroundPositionX: "14px",
    },
    ".list-item__expandable-content": {
      display: "none",
      width: "100%",
      padding: "12px 14px 12px 0",
      boxSizing: "border-box",
      webkitBoxOrdinalGroup: "2",
      webkitOrder: "1",
      order: "1",
      overflow: "hidden",
    },
    ".list-item.expanded > .list-item__expandable-content": {
      display: "block",
      height: "auto",
    },
    ".list-item__left": {
      boxSizing: "border-box",
      display: "flex",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      padding: "12px 14px 12px 0",
      webkitBoxOrdinalGroup: "1",
      webkitOrder: "0",
      order: "0",
      webkitBoxAlign: "center",
      webkitAlignItems: "center",
      alignItems: "center",
      webkitAlignSelf: "stretch",
      alignSelf: "stretch",
      lineHeight: "1.2em",
      minHeight: "44px",
    },
    ".list-item__left:empty": {
      width: "0",
      minWidth: "0",
      padding: "0",
      margin: "0",
    },
    ".list-item__center": {
      boxSizing: "border-box",
      display: "flex",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      webkitBoxFlex: "1",
      webkitFlexGrow: "1",
      flexGrow: "1",
      webkitFlexWrap: "wrap",
      flexWrap: "wrap",
      webkitBoxOrient: "horizontal",
      webkitBoxDirection: "normal",
      webkitFlexDirection: "row",
      flexDirection: "row",
      webkitBoxOrdinalGroup: "2",
      webkitOrder: "1",
      order: "1",
      marginRight: "auto",
      webkitBoxAlign: "center",
      webkitAlignItems: "center",
      alignItems: "center",
      webkitAlignSelf: "stretch",
      alignSelf: "stretch",
      marginLeft: "0",
      borderBottom: "none",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
      padding: "12px 6px 12px 0",
      lineHeight: "1.2em",
      minHeight: "44px",
    },
    ".list-item__right": {
      boxSizing: "border-box",
      display: "flex",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      marginLeft: "auto",
      padding: "12px 12px 12px 0",
      webkitBoxOrdinalGroup: "3",
      webkitOrder: "2",
      order: "2",
      webkitBoxAlign: "center",
      webkitAlignItems: "center",
      alignItems: "center",
      webkitAlignSelf: "stretch",
      alignSelf: "stretch",
      borderBottom: "none",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
      lineHeight: "1.2em",
      minHeight: "44px",
    },
    ".list-header": {
      margin: "0",
      listStyle: "none",
      textAlign: "left",
      display: "block",
      boxSizing: "border-box",
      padding: "0 0 0 15px",
      fontSize: "12px",
      fontWeight: "500",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          color: "#fff",
        },
      ],
      minHeight: "24px",
      lineHeight: "25px",
      textTransform: "uppercase",
      position: "relative",
      backgroundColor: "#eee",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top",
      backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
    },
    ".list--noborder": {
      borderTop: "none",
      borderBottom: "none",
      backgroundImage: "none",
    },
    ".list-item--tappable:active": {
      transition: "none",
      backgroundColor: "#d9d9d9",
    },
    ".list--inset": {
      margin: "0 8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      backgroundImage: "none",
    },
    ".list-item__label": {
      fontSize: "14px",
      padding: "0 4px",
      opacity: "0.6",
    },
    ".list-item__title": {
      webkitFlexBasis: "100%",
      flexBasis: "100%",
      webkitAlignSelf: "flex-end",
      alignSelf: "flex-end",
      webkitBoxOrdinalGroup: "1",
      webkitOrder: "0",
      order: "0",
    },
    ".list-item__subtitle": {
      opacity: "0.75",
      fontSize: "14px",
      webkitBoxOrdinalGroup: "2",
      webkitOrder: "1",
      order: "1",
      webkitFlexBasis: "100%",
      flexBasis: "100%",
      webkitAlignSelf: "flex-start",
      alignSelf: "flex-start",
    },
    ".list-item__thumbnail": {
      width: "40px",
      height: "40px",
      borderRadius: "6px",
      display: "block",
      margin: "0",
    },
    ".list-item__icon": {
      fontSize: "22px",
      padding: "0 6px",
    },
    ".list--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      backgroundImage: "none",
      backgroundColor: "#121212",
    },
    ".list-item--material": {
      border: "0",
      padding: "0 0 0 16px",
      lineHeight: "normal",
    },
    ".list-item--material__subtitle": {
      marginTop: "4px",
    },
    ".list-item--material:first-child": {
      boxShadow: "none",
    },
    ".list-item--material__left": {
      padding: "14px 0",
      minWidth: "56px",
      lineHeight: "1",
      minHeight: "48px",
    },
    ".list-item--material__center, .list-item--material__left:empty": {
      padding: "14px 6px 14px 0",
      borderColor: "#1f1f1f",
      borderBottom: "none",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(0deg, #1f1f1f, #1f1f1f 100%)",
      minHeight: "48px",
    },
    ".list-item--material__right": {
      padding: "14px 16px 14px 0",
      lineHeight: "1",
      borderColor: "#1f1f1f",
      borderBottom: "none",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(0deg, #1f1f1f, #1f1f1f 100%)",
      minHeight: "48px",
    },
    ".list-item--material.list-item--expandable": {
      borderBottom: "none",
      fallbacks: [
        {
          borderBottom: "1px solid #1f1f1f",
        },
      ],
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(0deg, #1f1f1f, #1f1f1f 100%)",
      backgroundPositionX: "16px",
    },
    ".list-item--material.list-item--expandable.list-item--longdivider, .list-item--material.list-item--longdivider": {
      borderBottom: "none",
      fallbacks: [
        {
          borderBottom: "1px solid #1f1f1f",
        },
      ],
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(0deg, #1f1f1f, #1f1f1f 100%)",
    },
    ".list-header--material": {
      background: "#121212",
      border: "none",
      fontSize: "14px",
      textTransform: "none",
      margin: "-1px 0 0 0",
      color: "#757575",
      fontWeight: "500",
      padding: "8px 16px",
    },
    ".list-header--material:not(:first-of-type)": {
      borderTop: "none",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top",
      backgroundImage: "linear-gradient(180deg, #1f1f1f, #1f1f1f 100%)",
      paddingTop: "16px",
    },
    ".list-item--material__thumbnail": {
      width: "40px",
      height: "40px",
      borderRadius: "100%",
    },
    ".list-item--material__icon": {
      fontSize: "20px",
      padding: "0 4px",
    },
    ".list-item--chevron:before, .list-item__expand-chevron": {
      borderRight: "2px solid #c7c7cc",
      borderBottom: "2px solid #c7c7cc",
      width: "7px",
      height: "7px",
      backgroundColor: "transparent",
      zIndex: "5",
    },
    ".list-item--chevron:before": {
      position: "absolute",
      content: '""',
      right: "16px",
      top: "50%",
      webkitTransform: "translateY(-50%) rotate(-45deg)",
      transform: "translateY(-50%) rotate(-45deg)",
    },
    ".list-item__expand-chevron": {
      webkitTransform: "rotate(45deg)",
      transform: "rotate(45deg)",
      margin: "1px",
    },
    ".list-item--expandable.expanded .list-item__expand-chevron": {
      webkitTransform: "rotate(225deg)",
      transform: "rotate(225deg)",
    },
    ".list-item--chevron__right": {
      paddingRight: "30px",
    },
    ".list-item--expandable .list-item__center, .list-item--expandable .list-item__right, .list-item--nodivider.list-item--expandable, .list-item--nodivider__center, .list-item--nodivider__right":
      {
        border: "none",
        backgroundImage: "none",
      },
    ".list-item--longdivider": {
      borderBottom: "none",
      fallbacks: [
        {
          borderBottom: "1px solid #ccc",
        },
      ],
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
    },
    ".list-item--longdivider:last-of-type": {
      border: "none",
      backgroundImage: "none",
    },
    ".list-item--longdivider__center": {
      border: "none",
      backgroundImage: "none",
    },
    ".list-item--longdivider__right": {
      border: "none",
      backgroundImage: "none",
    },
    ".list-title": {
      padding: "0 0 0 16px",
      margin: "0",
      font: "inherit",
      color: "#6d6d72",
      background: "0 0",
      border: "none",
      lineHeight: "24px",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "500",
      display: "block",
      fallbacks: [
        {
          lineHeight: "normal",
        },
        {
          fontWeight: "400",
        },
        {
          margin: "0",
        },
        {
          padding: "0",
        },
        {
          color: "inherit",
        },
      ],
      textAlign: "left",
      boxSizing: "border-box",
      fontSize: "13px",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    },
    ".list-title--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "500",
      color: "#757575",
      fontSize: "14px",
      margin: "0",
      padding: "12px 0 12px 16px",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      lineHeight: "24px",
    },
    ".search-input": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0 8px 0 28px",
      margin: "0",
      font: "inherit",
      color: "rgba(255, 255, 255, 1)",
      background: "0 0",
      border: "none",
      verticalAlign: "top",
      outline: "0",
      lineHeight: "1.3",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      webkitAppearance: "textfield",
      mozAppearance: "textfield",
      appearance: "textfield",
      fallbacks: [
        {
          fontWeight: "400",
        },
        {
          margin: "0",
        },
        {
          padding: "0",
        },
        {
          lineHeight: "1",
        },
        {
          color: "#fff",
        },
        {
          color: "inherit",
        },
        {
          backgroundColor: "#030303",
        },
        {
          boxSizing: "border-box",
        },
      ],
      height: "28px",
      fontSize: "14px",
      backgroundColor: "rgba(3, 3, 3, 0.09)",
      boxShadow: "none",
      borderRadius: "5.5px",
      backgroundImage:
        "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTMgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQyICgzNjc4MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aW9zLXNlYXJjaC1pbnB1dC1pY29uPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImNvbXBvbmVudHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJpb3Mtc2VhcmNoLWlucHV0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDguMDAwMDAwLCAtNDMuMDAwMDAwKSIgZmlsbD0iIzdBNzk3QiI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAuMDAwMDAwLCAzNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNi45OTcyNDgyLDE1LjUwNDE0NjYgQzE3LjA3NzM2NTcsMTUuNTQwNTkzOCAxNy4xNTIyNzMxLDE1LjU5MTYxMjkgMTcuMjE3NzUxNiwxNS42NTcwOTE0IEwyMC42NDk5OTEsMTkuMDg5MzMwOCBDMjAuOTQ0ODQ0OSwxOS4zODQxODQ3IDIwLjk0ODQ3NjQsMTkuODU4NjA2IDIwLjY1MzU0MTIsMjAuMTUzNTQxMiBDMjAuMzYwNjQ4LDIwLjQ0NjQzNDQgMTkuODgxMjcxNiwyMC40NDE5MzE3IDE5LjU4OTMzMDgsMjAuMTQ5OTkxIEwxNi4xNTcwOTE0LDE2LjcxNzc1MTYgQzE2LjA5MTM3LDE2LjY1MjAzMDEgMTYuMDQwMTE3MSwxNi41NzczODc0IDE2LjAwMzQxNDEsMTYuNDk3Nzk5NSBDMTUuMTY3MTY5NCwxNy4xMjcwNDExIDE0LjEyNzEzOTMsMTcuNSAxMywxNy41IEMxMC4yMzg1NzYzLDE3LjUgOCwxNS4yNjE0MjM3IDgsMTIuNSBDOCw5LjczODU3NjI1IDEwLjIzODU3NjMsNy41IDEzLDcuNSBDMTUuNzYxNDIzNyw3LjUgMTgsOS43Mzg1NzYyNSAxOCwxMi41IEMxOCwxMy42Mjc0Njg1IDE3LjYyNjgyMzIsMTQuNjY3Nzc2OCAxNi45OTcyNDgyLDE1LjUwNDE0NjYgWiBNMTMsMTYuNSBDMTUuMjA5MTM5LDE2LjUgMTcsMTQuNzA5MTM5IDE3LDEyLjUgQzE3LDEwLjI5MDg2MSAxNS4yMDkxMzksOC41IDEzLDguNSBDMTAuNzkwODYxLDguNSA5LDEwLjI5MDg2MSA5LDEyLjUgQzksMTQuNzA5MTM5IDEwLjc5MDg2MSwxNi41IDEzLDE2LjUgWiIgaWQ9Imlvcy1zZWFyY2gtaW5wdXQtaWNvbiI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=)",
      backgroundPosition: "8px center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "13px",
      display: "inline-block",
      textIndent: "0",
    },
    ".search-input::-webkit-search-cancel-button": {
      webkitAppearance: "textfield",
      appearance: "textfield",
      display: "none",
    },
    ".search-input::-webkit-search-decoration": {
      display: "none",
    },
    ".search-input:focus": {
      outline: "0",
    },
    ".search-input::-webkit-input-placeholder": {
      color: "#7a797b",
      fontSize: "14px",
      textIndent: "0",
    },
    ".search-input:-ms-input-placeholder": {
      color: "#7a797b",
      fontSize: "14px",
      textIndent: "0",
    },
    ".search-input::-ms-input-placeholder": {
      color: "#7a797b",
      fontSize: "14px",
      textIndent: "0",
    },
    ".search-input::placeholder": {
      color: "#7a797b",
      fontSize: "14px",
      textIndent: "0",
    },
    ".search-input:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".search-input--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      borderRadius: "8px",
      height: "48px",
      backgroundColor: "1f1f1f",
      fallbacks: [
        {
          backgroundColor: "#1f1f1f",
        },
      ],
      backgroundImage:
        "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQzLjIgKDM5MDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJhbmRyb2lkLXNlYXJjaC1pbnB1dC1pY29uIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGZpbGw9IiM4OTg5ODkiPgogICAgICAgICAgICA8ZyBpZD0iY29tcG9uZW50cyI+CiAgICAgICAgICAgICAgICA8ZyBpZD0ibWF0ZXJpYWwtc2VhcmNoIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0ic2VhcmNoIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ik1hdGVyaWFsL0ljb25zLWJsYWNrL3NlYXJjaCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIuNTAyLDYuNDkxIEwxMS43MDgsNi40OTEgTDExLjQzMiw2Ljc2NSBDMTIuNDA3LDcuOTAyIDEzLDkuMzc2IDEzLDEwLjk5MSBDMTMsMTQuNTgxIDEwLjA5LDE3LjQ5MSA2LjUsMTcuNDkxIEMyLjkxLDE3LjQ5MSAwLDE0LjU4MSAwLDEwLjk5MSBDMCw3LjQwMSAyLjkxLDQuNDkxIDYuNSw0LjQ5MSBDOC4xMTUsNC40OTEgOS41ODgsNS4wODMgMTAuNzI1LDYuMDU3IEwxMS4wMDEsNS43ODMgTDExLjAwMSw0Ljk5MSBMMTUuOTk5LDAgTDE3LjQ5LDEuNDkxIEwxMi41MDIsNi40OTEgTDEyLjUwMiw2LjQ5MSBaIE02LjUsNi40OTEgQzQuMDE0LDYuNDkxIDIsOC41MDUgMiwxMC45OTEgQzIsMTMuNDc2IDQuMDE0LDE1LjQ5MSA2LjUsMTUuNDkxIEM4Ljk4NSwxNS40OTEgMTEsMTMuNDc2IDExLDEwLjk5MSBDMTEsOC41MDUgOC45ODUsNi40OTEgNi41LDYuNDkxIEw2LjUsNi40OTEgWiIgaWQ9IlNoYXBlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4Ljc0NTAwMCwgOC43NDU1MDApIHNjYWxlKC0xLCAxKSByb3RhdGUoLTE4MC4wMDAwMDApIHRyYW5zbGF0ZSgtOC43NDUwMDAsIC04Ljc0NTUwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)",
      backgroundSize: "18px",
      backgroundPosition: "18px center",
      fontSize: "14px",
      padding: "0 24px 0 64px",
      boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24),\r\n    0 1px 0 0 rgba(255, 255, 255, 0.06) inset",
    },
    ".text-input": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "rgba(255, 255, 255, 1)",
      background: "0 0",
      border: "none",
      verticalAlign: "top",
      outline: "0",
      lineHeight: "1",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      fallbacks: [
        {
          boxSizing: "border-box",
        },
        {
          fontWeight: "400",
        },
        {
          margin: "0",
        },
        {
          padding: "0",
        },
        {
          color: "#fff",
        },
        {
          color: "inherit",
        },
        {
          border: "none",
        },
      ],
      backgroundColor: "transparent",
      letterSpacing: "0",
      boxShadow: "none",
      width: "auto",
      fontSize: "16px",
      height: "31px",
    },
    ".text-input::-ms-clear": {
      display: "none",
    },
    ".text-input:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".text-input::-webkit-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input:-ms-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input::-ms-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input::placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input:disabled::-webkit-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input:disabled:-ms-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input:disabled::-ms-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input:disabled::placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input:invalid": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          color: "#fff",
        },
      ],
    },
    ".text-input--underbar": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "rgba(255, 255, 255, 1)",
      background: "0 0",
      border: "none",
      verticalAlign: "top",
      outline: "0",
      lineHeight: "1",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          boxSizing: "border-box",
        },
        {
          fontWeight: "400",
        },
        {
          margin: "0",
        },
        {
          padding: "0",
        },
        {
          color: "#fff",
        },
        {
          color: "inherit",
        },
        {
          border: "none",
        },
      ],
      backgroundColor: "transparent",
      letterSpacing: "0",
      boxShadow: "none",
      width: "auto",
      fontSize: "16px",
      height: "31px",
      borderBottom: "1px solid #ccc",
      borderRadius: "0",
    },
    ".text-input--underbar:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
      border: "none",
      backgroundColor: "transparent",
      borderBottom: "1px solid #ccc",
    },
    ".text-input--underbar:disabled::-webkit-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input--underbar:disabled:-ms-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input--underbar:disabled::-ms-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input--underbar:disabled::placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".text-input--underbar:invalid": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#fff",
        },
      ],
      borderBottom: "1px solid #ccc",
    },
    ".text-input--material": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "#212121",
      background: "0 0",
      border: "none",
      verticalAlign: "middle",
      outline: "0",
      lineHeight: "1",
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      fallbacks: [
        {
          verticalAlign: "top",
        },
        {
          border: "none",
        },
        {
          fontWeight: "400",
        },
        {
          color: "inherit",
        },
        {
          fontWeight: "400",
        },
        {
          webkitFontSmoothing: "antialiased",
        },
        {
          fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
        },
      ],
      backgroundImage: "linear-gradient(to top, transparent 1px, #afafaf 1px)",
      backgroundSize: "100% 2px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center bottom",
      backgroundColor: "transparent",
      fontSize: "16px",
      paddingBottom: "2px",
      borderRadius: "0",
      height: "24px",
      webkitTransform: "translate3d(0, 0, 0)",
    },
    ".text-input--material__label": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      color: "#afafaf",
      position: "absolute",
      left: "0",
      top: "2px",
      fontSize: "16px",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      pointerEvents: "none",
    },
    ".text-input--material__label--active": {
      color: "#3d5afe",
      webkitTransform: "translate(0, -75%) scale(0.75)",
      transform: "translate(0, -75%) scale(0.75)",
      webkitTransformOrigin: "left top",
      transformOrigin: "left top",
      transition: "transform 0.1s ease-in, color 0.1s ease-in,\r\n    -webkit-transform 0.1s ease-in",
      fallbacks: [
        {
          transition: "transform 0.1s ease-in, color 0.1s ease-in",
        },
        {
          transition: "color 0.1s ease-in, -webkit-transform 0.1s ease-in",
        },
      ],
    },
    ".text-input--material:focus": {
      backgroundImage: "linear-gradient(#3d5afe, #3d5afe),\r\n    linear-gradient(to top, transparent 1px, #afafaf 1px)",
      webkitAnimation: "material-text-input-animate 0.3s forwards",
      animation: "material-text-input-animate 0.3s forwards",
    },
    ".text-input--material::-webkit-input-placeholder": {
      color: "#afafaf",
      lineHeight: "20px",
    },
    ".text-input--material:-ms-input-placeholder": {
      color: "#afafaf",
      lineHeight: "20px",
    },
    ".text-input--material::-ms-input-placeholder": {
      color: "#afafaf",
      lineHeight: "20px",
    },
    ".text-input--material::placeholder": {
      color: "#afafaf",
      lineHeight: "20px",
    },
    "@keyframes material-text-input-animate": {
      "0%": {
        backgroundSize: "0 2px, 100% 2px",
      },
      "100%": {
        backgroundSize: "100% 2px, 100% 2px",
      },
    },
    ".textarea": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "5px 5px 5px 5px",
      margin: "0",
      font: "inherit",
      color: "rgba(255, 255, 255, 1)",
      background: "0 0",
      border: "1px solid #ccc",
      lineHeight: "normal",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      verticalAlign: "top",
      resize: "none",
      outline: "0",
      fallbacks: [
        {
          color: "#fff",
        },
        {
          color: "inherit",
        },
        {
          border: "none",
        },
        {
          fontWeight: "400",
        },
        {
          padding: "0",
        },
      ],
      fontSize: "16px",
      borderRadius: "4px",
      backgroundColor: "#121212",
      letterSpacing: "0",
      boxShadow: "none",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
      width: "auto",
    },
    ".textarea:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".textarea::-webkit-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".textarea:-ms-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".textarea::-ms-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".textarea::placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".textarea--transparent": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "5px 5px 5px 5px",
      margin: "0",
      font: "inherit",
      color: "rgba(255, 255, 255, 1)",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      verticalAlign: "top",
      resize: "none",
      outline: "0",
      fallbacks: [
        {
          color: "#fff",
        },
        {
          color: "inherit",
        },
        {
          border: "none",
        },
        {
          fontWeight: "400",
        },
        {
          padding: "0",
        },
      ],
      paddingLeft: "0",
      paddingRight: "0",
      fontSize: "16px",
      borderRadius: "4px",
      backgroundColor: "transparent",
      letterSpacing: "0",
      boxShadow: "none",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
      width: "auto",
    },
    ".textarea--transparent:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
    },
    ".textarea--transparent::-webkit-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".textarea--transparent:-ms-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".textarea--transparent::-ms-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".textarea--transparent::placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".dialog": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "auto auto",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      position: "absolute",
      top: "50%",
      left: "50%",
      webkitTransform: "translate(-50%, -50%)",
      transform: "translate(-50%, -50%)",
      fallbacks: [
        {
          margin: "0",
        },
      ],
      overflow: "hidden",
      minWidth: "270px",
      minHeight: "100px",
      textAlign: "left",
    },
    ".dialog-container": {
      height: "inherit",
      minHeight: "inherit",
      overflow: "hidden",
      borderRadius: "4px",
      backgroundColor: "#f4f4f4",
      webkitMaskImage:
        "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          color: "#fff",
        },
      ],
    },
    ".dialog-mask": {
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      position: "absolute",
      top: "0",
      right: "0",
      left: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
    },
    ".dialog--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      textAlign: "left",
      boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14),\r\n    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)",
    },
    ".dialog-container--material": {
      borderRadius: "2px",
      backgroundColor: "#121212",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          color: "#fff",
        },
      ],
    },
    ".dialog-mask--material": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
    },
    ".alert-dialog": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "auto",
      font: "inherit",
      color: "#1f1f21",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      position: "absolute",
      top: "50%",
      left: "50%",
      webkitTransform: "translate(-50%, -50%)",
      transform: "translate(-50%, -50%)",
      width: "270px",
      fallbacks: [
        {
          color: "inherit",
        },
        {
          margin: "0",
        },
      ],
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      overflow: "visible",
      maxWidth: "95%",
    },
    ".alert-dialog-container": {
      height: "inherit",
      paddingTop: "16px",
      overflow: "hidden",
    },
    ".alert-dialog-title": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "500",
      fontSize: "17px",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      padding: "0 8px",
      textAlign: "center",
      color: "#1f1f21",
    },
    ".alert-dialog-content": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "4px 12px 8px",
      fontSize: "14px",
      minHeight: "36px",
      textAlign: "center",
      color: "#1f1f21",
    },
    ".alert-dialog-footer": {
      width: "100%",
    },
    ".alert-dialog-button": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0 8px",
      margin: "0",
      font: "inherit",
      color: "#4a148c",
      background: "0 0",
      border: "none",
      lineHeight: "44px",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textDecoration: "none",
      letterSpacing: "0",
      verticalAlign: "middle",
      fallbacks: [
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
        {
          margin: "0",
        },
        {
          padding: "0",
        },
        {
          border: "none",
        },
      ],
      borderTop: "1px solid #ddd",
      fontSize: "16px",
      display: "block",
      width: "100%",
      backgroundColor: "transparent",
      textAlign: "center",
      height: "44px",
      outline: "0",
    },
    ".alert-dialog-button:active": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
    },
    ".alert-dialog-button--primal": {
      fontWeight: "500",
    },
    ".alert-dialog-footer--rowfooter": {
      whiteSpace: "nowrap",
      display: "flex",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
      ],
      webkitFlexWrap: "wrap",
      flexWrap: "wrap",
    },
    ".alert-dialog-button--rowfooter": {
      webkitBoxFlex: "1",
      webkitFlex: "1",
      flex: "1",
      display: "block",
      width: "100%",
      borderLeft: "1px solid #ddd",
    },
    ".alert-dialog-button--rowfooter:first-child": {
      borderLeft: "none",
    },
    ".alert-dialog-mask": {
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      position: "absolute",
      top: "0",
      right: "0",
      left: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
    },
    ".alert-dialog--material": {
      borderRadius: "8px",
      backgroundColor: "#121212",
    },
    ".alert-dialog-container--material": {
      padding: "22px 0 0 0",
      boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14),\r\n    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)",
    },
    ".alert-dialog-title--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "500",
      textAlign: "left",
      fontSize: "20px",
      fallbacks: [
        {
          color: "#fff",
        },
        {
          fontWeight: "400",
        },
      ],
      padding: "0 24px",
      color: "rgba(255, 255, 255, 1)",
    },
    ".alert-dialog-content--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      textAlign: "left",
      fontSize: "16px",
      fallbacks: [
        {
          color: "#fff",
        },
        {
          fontWeight: "400",
        },
      ],
      lineHeight: "20px",
      padding: "0 24px",
      margin: "24px 0 10px 0",
      minHeight: "0",
      color: "rgba(255, 255, 255, 0.85)",
    },
    ".alert-dialog-footer--material": {
      display: "block",
      padding: "0",
      height: "52px",
      boxSizing: "border-box",
      margin: "0",
      lineHeight: "1",
    },
    ".alert-dialog-button--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "500",
      textTransform: "uppercase",
      display: "inline-block",
      width: "auto",
      float: "right",
      background: "0 0",
      border: "none",
      borderRadius: "2px",
      fontSize: "14px",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      outline: "0",
      height: "36px",
      lineHeight: "36px",
      padding: "0 8px",
      margin: "8px 8px 8px 0",
      boxSizing: "border-box",
      minWidth: "50px",
      color: "#bb86fc",
    },
    ".alert-dialog-button--material:active": {
      backgroundColor: "initial",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
      ],
    },
    ".alert-dialog-button--rowfooter--material, .alert-dialog-button--rowfooter--material:first-child": {
      border: "0",
    },
    ".alert-dialog-button--primal--material": {
      fontWeight: "500",
    },
    ".alert-dialog-mask--material": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
    },
    ".popover": {
      position: "absolute",
      zIndex: "20001",
    },
    ".popover--bottom": {
      bottom: "0",
    },
    ".popover--top": {
      top: "0",
    },
    ".popover--left": {
      left: "0",
    },
    ".popover--right": {
      right: "0",
    },
    ".popover-mask": {
      left: "0",
      right: "0",
      top: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
      position: "absolute",
      zIndex: "19999",
    },
    ".popover__content": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "#1f1f21",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      display: "block",
      width: "220px",
      overflow: "auto",
      minHeight: "100px",
      maxHeight: "100%",
      backgroundColor: "#fff",
      borderRadius: "8px",
      fallbacks: [
        {
          color: "inherit",
        },
      ],
      pointerEvents: "auto",
    },
    ".popover__arrow": {
      position: "absolute",
      width: "18px",
      height: "18px",
      webkitTransformOrigin: "50% 50% 0",
      transformOrigin: "50% 50% 0",
      backgroundColor: "transparent",
      backgroundImage: "linear-gradient(45deg, #fff, #fff 50%, transparent 50%)",
      borderRadius: "0 0 0 4px",
      margin: "0",
      zIndex: "20001",
    },
    ".popover--bottom__arrow": {
      webkitTransform: "translateY(6px) translateX(-9px) rotate(-45deg)",
      transform: "translateY(6px) translateX(-9px) rotate(-45deg)",
      bottom: "0",
      marginRight: "-18px",
    },
    ".popover--top__arrow": {
      webkitTransform: "translateY(-6px) translateX(-9px) rotate(135deg)",
      transform: "translateY(-6px) translateX(-9px) rotate(135deg)",
      top: "0",
      marginRight: "-18px",
    },
    ".popover--left__arrow": {
      webkitTransform: "translateX(-6px) translateY(-9px) rotate(45deg)",
      transform: "translateX(-6px) translateY(-9px) rotate(45deg)",
      left: "0",
      marginBottom: "-18px",
    },
    ".popover--right__arrow": {
      webkitTransform: "translateX(6px) translateY(-9px) rotate(225deg)",
      transform: "translateX(6px) translateY(-9px) rotate(225deg)",
      right: "0",
      marginBottom: "-18px",
    },
    ".popover-mask--material": {
      backgroundColor: "transparent",
    },
    ".popover--material__content": {
      backgroundColor: "#fafafa",
      borderRadius: "2px",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          color: "#fff",
        },
      ],
      boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
    },
    ".popover--material__arrow": {
      display: "none",
    },
    ".progress-bar": {
      position: "relative",
      height: "2px",
      display: "block",
      width: "100%",
      backgroundColor: "transparent",
      backgroundClip: "padding-box",
      margin: "0",
      overflow: "hidden",
      borderRadius: "4px",
    },
    ".progress-bar__primary, .progress-bar__secondary": {
      position: "absolute",
      backgroundColor: "#4a148c",
      top: "0",
      bottom: "0",
      transition: "width 0.3s linear",
      zIndex: "100",
      borderRadius: "4px",
    },
    ".progress-bar__secondary": {
      backgroundColor: "#65adff",
      zIndex: "0",
    },
    ".progress-bar--indeterminate:before": {
      content: '""',
      position: "absolute",
      backgroundColor: "#4a148c",
      top: "0",
      left: "0",
      bottom: "0",
      willChange: "left, right",
      webkitAnimation: "progress-bar__indeterminate 2.1s\r\n    cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite",
      animation: "progress-bar__indeterminate 2.1s\r\n    cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite",
      borderRadius: "4px",
    },
    ".progress-bar--indeterminate:after": {
      content: '""',
      position: "absolute",
      backgroundColor: "#4a148c",
      top: "0",
      left: "0",
      bottom: "0",
      willChange: "left, right",
      webkitAnimation: "progress-bar__indeterminate-short 2.1s\r\n    cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
      animation: "progress-bar__indeterminate-short 2.1s\r\n    cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
      webkitAnimationDelay: "1.15s",
      animationDelay: "1.15s",
      borderRadius: "4px",
    },
    "@keyframes progress-bar__indeterminate": {
      "0%": {
        left: "-35%",
        right: "100%",
      },
      "60%": {
        left: "100%",
        right: "-90%",
      },
      "100%": {
        left: "100%",
        right: "-90%",
      },
    },
    "@keyframes progress-bar__indeterminate-short": {
      "0%": {
        left: "-200%",
        right: "100%",
      },
      "60%": {
        left: "107%",
        right: "-8%",
      },
      "100%": {
        left: "107%",
        right: "-8%",
      },
    },
    ".progress-bar--material": {
      height: "4px",
      backgroundColor: "transparent",
      borderRadius: "0",
    },
    ".progress-bar--material__primary, .progress-bar--material__secondary": {
      backgroundColor: "#bb86fc",
      borderRadius: "0",
    },
    ".progress-bar--material__secondary": {
      backgroundColor: "rgba(168, 98, 254, 1)",
      fallbacks: [
        {
          backgroundColor: "#a862fe",
        },
      ],
      zIndex: "0",
    },
    ".progress-bar--material.progress-bar--indeterminate:before": {
      backgroundColor: "#bb86fc",
      borderRadius: "0",
    },
    ".progress-bar--material.progress-bar--indeterminate:after": {
      backgroundColor: "#bb86fc",
      borderRadius: "0",
    },
    ".progress-circular": {
      height: "32px",
      position: "relative",
      width: "32px",
      webkitTransform: "rotate(270deg)",
      transform: "rotate(270deg)",
      webkitAnimation: "none",
      animation: "none",
    },
    ".progress-circular__background, .progress-circular__primary, .progress-circular__secondary": {
      webkitAnimation: "none",
      animation: "none",
      fill: "none",
      strokeWidth: "5%",
      strokeMiterlimit: "10",
    },
    ".progress-circular__background": {
      stroke: "transparent",
    },
    ".progress-circular__primary": {
      strokeDasharray: "1, 200",
      strokeDashoffset: "0",
      stroke: "#4a148c",
      transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    ".progress-circular__secondary": {
      stroke: "#65adff",
    },
    ".progress-circular--indeterminate": {
      webkitAnimation: "progress__rotate 2s linear infinite",
      animation: "progress__rotate 2s linear infinite",
      webkitTransform: "none",
      transform: "none",
    },
    ".progress-circular--indeterminate__primary": {
      webkitAnimation: "progress__dash 1.5s ease-in-out infinite",
      animation: "progress__dash 1.5s ease-in-out infinite",
    },
    ".progress-circular--indeterminate__secondary": {
      display: "none",
    },
    "@keyframes progress__rotate": {
      "100%": {
        webkitTransform: "rotate(360deg)",
        transform: "rotate(360deg)",
      },
    },
    "@keyframes progress__dash": {
      "0%": {
        strokeDasharray: "10%, 241.32%",
        strokeDashoffset: "0",
      },
      "50%": {
        strokeDasharray: "201%, 50.322%",
        strokeDashoffset: "-100%",
      },
      "100%": {
        strokeDasharray: "10%, 241.32%",
        strokeDashoffset: "-251.32%",
      },
    },
    ".progress-circular--material__background, .progress-circular--material__primary, .progress-circular--material__secondary": {
      strokeWidth: "9%",
    },
    ".progress-circular--material__background": {
      stroke: "transparent",
    },
    ".progress-circular--material__primary": {
      stroke: "#bb86fc",
    },
    ".progress-circular--material__secondary": {
      stroke: "rgba(172, 105, 254, 1)",
    },
    "button.fab, ons-fab.fab, ons-speed-dial-item.fab": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "#fff",
      background: "0 0",
      border: "0 solid currentColor",
      lineHeight: "56px",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      width: "56px",
      height: "56px",
      textDecoration: "none",
      fontSize: "25px",
      fallbacks: [
        {
          border: "none",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
      ],
      letterSpacing: "0",
      verticalAlign: "middle",
      textAlign: "center",
      backgroundColor: "#4a148c",
      borderRadius: "50%",
      overflow: "hidden",
      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.12)",
      transition: "all 0.1s linear",
    },
    "button.fab:active, ons-fab.fab:active, ons-speed-dial-item.fab:active": {
      boxShadow: "0 0 6 rgba(0, 0, 0, 0.12)",
      backgroundColor: "color-mod(#4a148c a(70%))",
      transition: "all 0.2s ease",
      fallbacks: [
        {
          boxShadow: "0 3px 6 rgba(0, 0, 0, 0.12)",
        },
      ],
    },
    "button.fab:focus, ons-fab.fab:focus, ons-speed-dial-item.fab:focus": {
      outline: "0",
    },
    "button.fab:disabled, button.fab[disabled], ons-fab.fab:disabled, ons-fab.fab[disabled], ons-speed-dial-item.fab:disabled, ons-speed-dial-item.fab[disabled]":
      {
        backgroundColor: "color-mod(black alpha(50%))",
        boxShadow: "none",
        opacity: "0.3",
        cursor: "default",
        pointerEvents: "none",
      },
    "button.fab__icon, ons-fab.fab__icon, ons-speed-dial-item.fab__icon": {
      position: "relative",
      overflow: "hidden",
      height: "100%",
      width: "100%",
      display: "block",
      borderRadius: "100%",
      padding: "0",
      zIndex: "100",
      lineHeight: "56px",
    },
    "button.fab--material, ons-fab.fab--material, ons-speed-dial-item.fab--material": {
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "rgba(255, 255, 255, 1)",
      background: "0 0",
      border: "0 solid currentColor",
      lineHeight: "56px",
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      cursor: "default",
      webkitUserSelect: "none",
      mozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      width: "56px",
      height: "56px",
      textDecoration: "none",
      fontSize: "25px",
      fallbacks: [
        {
          transition: "all 0.1s linear",
        },
        {
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.12)",
        },
        {
          backgroundColor: "#4a148c",
        },
        {
          color: "#fff",
        },
        {
          color: "#fff",
        },
        {
          lineHeight: "56px",
        },
        {
          fontSize: "25px",
        },
        {
          textDecoration: "none",
        },
        {
          height: "56px",
        },
        {
          width: "56px",
        },
        {
          fontWeight: "400",
        },
        {
          webkitFontSmoothing: "antialiased",
        },
        {
          fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
        },
        {
          border: "none",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "normal",
        },
      ],
      letterSpacing: "0",
      verticalAlign: "middle",
      textAlign: "center",
      backgroundColor: "#bb86fc",
      borderRadius: "50%",
      overflow: "hidden",
      boxShadow: "0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),\r\n    0 2px 4px -1px rgba(0, 0, 0, 0.4)",
      transition: "all 0.2s ease-in-out",
    },
    "button.fab--material:active, ons-fab.fab--material:active, ons-speed-dial-item.fab--material:active": {
      boxShadow: "0 8px 10px 1px rgba(0, 0, 0, 0.14),\r\n    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.4)",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      fallbacks: [
        {
          backgroundColor: "#fff",
        },
      ],
      transition: "all 0.2s ease",
    },
    "button.fab--material:focus, ons-fab.fab--material:focus, ons-speed-dial-item.fab--material:focus": {
      outline: "0",
    },
    "button.fab--material__icon, ons-fab.fab--material__icon, ons-speed-dial-item.fab--material__icon": {
      position: "relative",
      overflow: "hidden",
      height: "100%",
      width: "100%",
      display: "block",
      borderRadius: "100%",
      padding: "0",
      zIndex: "100",
      lineHeight: "56px",
    },
    "button.fab--material:disabled, button.fab--material[disabled], ons-fab.fab--material:disabled, ons-fab.fab--material[disabled], ons-speed-dial-item.fab--material:disabled, ons-speed-dial-item.fab--material[disabled]":
      {
        backgroundColor: "color-mod(black alpha(50%))",
        boxShadow: "none",
        opacity: "0.3",
        cursor: "default",
        pointerEvents: "none",
      },
    "button.fab--mini, ons-fab.fab--mini, ons-speed-dial-item.fab--mini": {
      width: "40px",
      height: "40px",
      lineHeight: "40px",
    },
    "button.fab--mini__icon, ons-fab.fab--mini__icon, ons-speed-dial-item.fab--mini__icon": {
      lineHeight: "40px",
    },
    "button.speed-dial__item, ons-fab.speed-dial__item, ons-speed-dial-item.speed-dial__item": {
      position: "absolute",
      webkitTransform: "scale(0)",
      transform: "scale(0)",
    },
    ".speed-dial.fab--top__right, button.fab--top__right, ons-fab.fab--top__right": {
      top: "20px",
      bottom: "auto",
      right: "20px",
      left: "auto",
      position: "absolute",
    },
    ".speed-dial.fab--bottom__right, button.fab--bottom__right, ons-fab.fab--bottom__right": {
      top: "auto",
      bottom: "20px",
      right: "20px",
      left: "auto",
      position: "absolute",
    },
    ".speed-dial.fab--top__left, button.fab--top__left, ons-fab.fab--top__left": {
      top: "20px",
      bottom: "auto",
      right: "auto",
      left: "20px",
      position: "absolute",
    },
    ".speed-dial.fab--bottom__left, button.fab--bottom__left, ons-fab.fab--bottom__left": {
      top: "auto",
      bottom: "20px",
      right: "auto",
      left: "20px",
      position: "absolute",
    },
    ".speed-dial.fab--top__center, button.fab--top__center, ons-fab.fab--top__center": {
      top: "20px",
      bottom: "auto",
      marginLeft: "-28px",
      left: "50%",
      right: "auto",
      position: "absolute",
    },
    ".speed-dial.fab--bottom__center, button.fab--bottom__center, ons-fab.fab--bottom__center": {
      top: "auto",
      bottom: "20px",
      marginLeft: "-28px",
      left: "50%",
      right: "auto",
      position: "absolute",
    },
    ".modal": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      whiteSpace: "nowrap",
      overflow: "hidden",
      wordSpacing: "0",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "inherit",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
        {
          overflow: "hidden",
        },
        {
          backgroundClip: "padding-box",
        },
        {
          boxSizing: "border-box",
        },
      ],
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      position: "absolute",
      left: "0",
      right: "0",
      top: "0",
      bottom: "0",
      width: "100%",
      height: "100%",
      display: "table",
      zIndex: "2147483647",
    },
    ".modal__content": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      whiteSpace: "normal",
      overflow: "hidden",
      wordSpacing: "0",
      padding: "0",
      margin: "0",
      font: "inherit",
      color: "#fff",
      background: "0 0",
      border: "none",
      lineHeight: "normal",
      fallbacks: [
        {
          whiteSpace: "nowrap",
        },
        {
          color: "inherit",
        },
        {
          backgroundClip: "padding-box",
        },
        {
          boxSizing: "border-box",
        },
      ],
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      display: "table-cell",
      verticalAlign: "middle",
      textAlign: "center",
    },
    ".select-input": {
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      padding: "0 20px 0 0",
      margin: "0",
      font: "inherit",
      color: "rgba(255, 255, 255, 1)",
      background: "0 0",
      border: "none",
      verticalAlign: "top",
      outline: "0",
      lineHeight: "32px",
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          padding: "0",
        },
        {
          border: "none",
        },
        {
          color: "#fff",
        },
        {
          color: "inherit",
        },
        {
          lineHeight: "1",
        },
        {
          border: "none",
        },
      ],
      backgroundColor: "transparent",
      position: "relative",
      fontSize: "17px",
      height: "32px",
      borderColor: "#ccc",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
      display: "inline-block",
      borderRadius: "0",
      backgroundImage:
        "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSI1cHgiIHZpZXdCb3g9IjAgMCAxMCA1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4yICgzOTA2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c2VsZWN0LWFsbG93PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9InNlbGVjdCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Imlvcy1zZWxlY3QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTguMDAwMDAwLCAtMTE0LjAwMDAwMCkiIGZpbGw9IiM3NTc1NzUiPgogICAgICAgICAgICA8ZyBpZD0ibWVudS1iYXItKy1vcGVuLW1lbnUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMy4wMDAwMDAsIDEwMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJtZW51LWJhciI+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9InNlbGVjdC1hbGxvdyIgcG9pbnRzPSI3NSAxNCA4MCAxOSA4NSAxNCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right center",
      borderBottom: "none",
    },
    ".select-input::-ms-clear": {
      display: "none",
    },
    ".select-input::-webkit-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input:-ms-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input::-ms-input-placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input::placeholder": {
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
      border: "none",
      backgroundColor: "transparent",
    },
    ".select-input:disabled::-webkit-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input:disabled:-ms-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input:disabled::-ms-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input:disabled::placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input:invalid": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          color: "#fff",
        },
      ],
    },
    ".select-input[multiple]": {
      height: "64px",
    },
    ".select-input--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      color: "rgba(212, 212, 232, 1)",
      fallbacks: [
        {
          fontWeight: "400",
        },
        {
          color: "#d4d4e8",
        },
      ],
      fontSize: "15px",
      backgroundImage:
        "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSI1cHgiIHZpZXdCb3g9IjAgMCAxMCA1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4yICgzOTA2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c2VsZWN0LWFsbG93PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9InNlbGVjdCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Imlvcy1zZWxlY3QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTguMDAwMDAwLCAtMTE0LjAwMDAwMCkiIGZpbGw9IiM3NTc1NzUiPgogICAgICAgICAgICA8ZyBpZD0ibWVudS1iYXItKy1vcGVuLW1lbnUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMy4wMDAwMDAsIDEwMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJtZW51LWJhciI+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9InNlbGVjdC1hbGxvdyIgcG9pbnRzPSI3NSAxNCA4MCAxOSA4NSAxNCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=),\r\n    linear-gradient(\r\n      to top,\r\n      color-mod(black a(12%)) 50%,\r\n      color-mod(black a(12%)) 50%\r\n    )",
      backgroundSize: "auto, 100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right center, left bottom",
      border: "none",
      webkitTransform: "translate3d(0, 0, 0)",
      transform: "translate3d(0, 0, 0)",
    },
    ".select-input--material__label": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      color: "rgba(0, 0, 0, 0.92)",
      fallbacks: [
        {
          color: "#000",
        },
      ],
      position: "absolute",
      left: "0",
      top: "2px",
      fontSize: "16px",
      pointerEvents: "none",
    },
    ".select-input--material__label--active": {
      color: "rgba(0, 0, 0, 0.15)",
      fallbacks: [
        {
          transition: "transform 0.1s ease-in, color 0.1s ease-in",
        },
        {
          transition: "color 0.1s ease-in, -webkit-transform 0.1s ease-in",
        },
        {
          color: "#000",
        },
      ],
      webkitTransform: "translate(0, -75%) scale(0.75)",
      transform: "translate(0, -75%) scale(0.75)",
      webkitTransformOrigin: "left top",
      transformOrigin: "left top",
      transition: "transform 0.1s ease-in, color 0.1s ease-in,\r\n    -webkit-transform 0.1s ease-in",
    },
    ".select-input--material::-webkit-input-placeholder": {
      color: "rgba(0, 0, 0, 0.92)",
      fallbacks: [
        {
          color: "#000",
        },
      ],
      lineHeight: "20px",
    },
    ".select-input--material:-ms-input-placeholder": {
      color: "rgba(0, 0, 0, 0.92)",
      fallbacks: [
        {
          color: "#000",
        },
      ],
      lineHeight: "20px",
    },
    ".select-input--material::-ms-input-placeholder": {
      color: "rgba(0, 0, 0, 0.92)",
      fallbacks: [
        {
          color: "#000",
        },
      ],
      lineHeight: "20px",
    },
    ".select-input--material::placeholder": {
      color: "rgba(0, 0, 0, 0.92)",
      fallbacks: [
        {
          color: "#000",
        },
      ],
      lineHeight: "20px",
    },
    "@keyframes material-select-input-animate": {
      "0%": {
        backgroundSize: "0 2px, 100% 2px",
      },
      "100%": {
        backgroundSize: "100% 2px, 100% 2px",
      },
    },
    ".select-input--underbar": {
      border: "none",
      borderBottom: "1px solid #ccc",
    },
    ".select-input--underbar:disabled": {
      opacity: "0.3",
      cursor: "default",
      pointerEvents: "none",
      border: "none",
      backgroundColor: "transparent",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
      ],
      borderBottom: "1px solid #ccc",
    },
    ".select-input--underbar:disabled::-webkit-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input--underbar:disabled:-ms-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input--underbar:disabled::-ms-input-placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input--underbar:disabled::placeholder": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(221, 217, 217, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#ddd9d9",
        },
      ],
    },
    ".select-input--underbar:invalid": {
      border: "none",
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 1)",
      fallbacks: [
        {
          backgroundColor: "transparent",
        },
        {
          border: "none",
        },
        {
          color: "#fff",
        },
      ],
      borderBottom: "1px solid #ccc",
    },
    ".action-sheet": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      cursor: "default",
      position: "absolute",
      left: "10px",
      right: "10px",
      bottom: "10px",
      zIndex: "2",
    },
    ".action-sheet-button": {
      boxSizing: "border-box",
      height: "56px",
      fontSize: "20px",
      textAlign: "center",
      color: "#4a148c",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      fallbacks: [
        {
          backgroundColor: "#fff",
        },
      ],
      borderRadius: "0",
      lineHeight: "56px",
      border: "none",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
      display: "block",
      width: "100%",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(\r\n    0deg,\r\n    rgba(0, 0, 0, 0.1),\r\n    rgba(0, 0, 0, 0.1) 100%\r\n  )",
    },
    ".action-sheet-button:first-child": {
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
    },
    ".action-sheet-button:active": {
      backgroundColor: "#e9e9e9",
      backgroundImage: "none",
    },
    ".action-sheet-button:focus": {
      outline: "0",
    },
    ".action-sheet-button:nth-last-of-type(2)": {
      borderBottomRightRadius: "12px",
      borderBottomLeftRadius: "12px",
      backgroundImage: "none",
    },
    ".action-sheet-button:last-of-type": {
      borderRadius: "12px",
      margin: "8px 0 0 0",
      backgroundColor: "#fff",
      backgroundImage: "none",
      fontWeight: "600",
    },
    ".action-sheet-button:last-of-type:active": {
      backgroundColor: "#e9e9e9",
    },
    ".action-sheet-button--destructive": {
      color: "#fe3824",
    },
    ".action-sheet-title": {
      boxSizing: "border-box",
      height: "56px",
      fontSize: "13px",
      color: "#8f8e94",
      textAlign: "center",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      fallbacks: [
        {
          backgroundColor: "#fff",
        },
      ],
      lineHeight: "56px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundImage: "linear-gradient(\r\n    0deg,\r\n    rgba(0, 0, 0, 0.1),\r\n    rgba(0, 0, 0, 0.1) 100%\r\n  )",
    },
    ".action-sheet-title:first-child": {
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
    },
    ".action-sheet-icon": {
      display: "none",
    },
    ".action-sheet-mask": {
      position: "absolute",
      left: "0",
      top: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
      zIndex: "1",
    },
    ".action-sheet--material": {
      left: "0",
      right: "0",
      bottom: "0",
      boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14),\r\n    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)",
    },
    ".action-sheet-title--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      borderRadius: "0",
      backgroundImage: "none",
      textAlign: "left",
      height: "56px",
      lineHeight: "56px",
      fontSize: "16px",
      padding: "0 0 0 16px",
      color: "#686868",
      backgroundColor: "#fff",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
    },
    ".action-sheet-title--material:first-child": {
      borderRadius: "0",
    },
    ".action-sheet-button--material": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      borderRadius: "0",
      backgroundImage: "none",
      height: "52px",
      lineHeight: "52px",
      textAlign: "left",
      fontSize: "16px",
      padding: "0 0 0 16px",
      color: "#686868",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      backgroundColor: "#fff",
    },
    ".action-sheet-button--material:first-child": {
      borderRadius: "0",
    },
    ".action-sheet-button--material:nth-last-of-type(2)": {
      borderRadius: "0",
    },
    ".action-sheet-button--material:last-of-type": {
      margin: "0",
      borderRadius: "0",
      fontWeight: "400",
      backgroundColor: "#fff",
    },
    ".action-sheet-icon--material": {
      display: "inline-block",
      float: "left",
      height: "52px",
      lineHeight: "52px",
      marginRight: "32px",
      fontSize: "26px",
      width: "0.8em",
      textAlign: "center",
    },
    ".action-sheet-mask--material": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
    },
    ".card": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.12)",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxSizing: "border-box",
      display: "block",
      margin: "8px",
      padding: "16px",
      textAlign: "left",
      wordWrap: "break-word",
    },
    ".card__content": {
      margin: "0",
      fontSize: "14px",
      lineHeight: "1.4",
      color: "#030303",
    },
    ".card__title": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      fallbacks: [
        {
          fontWeight: "400",
        },
      ],
      fontSize: "20px",
      margin: "4px 0 8px 0",
      padding: "0",
      display: "block",
      boxSizing: "border-box",
    },
    ".card--material": {
      backgroundColor: "#1f1f1f",
      borderRadius: "8px",
      boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
    },
    ".card--material__content": {
      fontSize: "14px",
      lineHeight: "1.4",
      color: "rgba(255, 255, 255, 0.54)",
      fallbacks: [
        {
          color: "#fff",
        },
      ],
    },
    ".card--material__title": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      fontSize: "24px",
      margin: "8px 0 12px 0",
    },
    ".toast": {
      fontFamily: '-apple-system, "Helvetica Neue", Helvetica, Arial,\r\n    "Lucida Grande", sans-serif',
      webkitFontSmoothing: "antialiased",
      mozOsxFontSmoothing: "grayscale",
      fontWeight: "400",
      position: "absolute",
      zIndex: "2",
      left: "8px",
      right: "8px",
      bottom: "0",
      margin: "8px 0",
      borderRadius: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      fallbacks: [
        {
          display: "-webkit-flex",
        },
        {
          display: "-webkit-box",
        },
        {
          backgroundColor: "#000",
        },
      ],
      display: "flex",
      minHeight: "48px",
      lineHeight: "1.5",
      boxSizing: "border-box",
      padding: "16px 16px",
    },
    ".toast__message": {
      fontSize: "14px",
      color: "#fff",
      webkitBoxFlex: "1",
      webkitFlexGrow: "1",
      flexGrow: "1",
      textAlign: "left",
      margin: "0 16px 0 0",
      whiteSpace: "normal",
    },
    ".toast__button": {
      fontSize: "14px",
      color: "#fff",
      webkitBoxFlex: "0",
      webkitFlexGrow: "0",
      flexGrow: "0",
      webkitAppearance: "none",
      mozAppearance: "none",
      appearance: "none",
      border: "none",
      backgroundColor: "transparent",
      cursor: "default",
      textTransform: "uppercase",
    },
    ".toast__button:focus": {
      outline: "0",
    },
    ".toast__button:active": {
      opacity: "0.4",
    },
    ".toast--material": {
      left: "0",
      right: "0",
      bottom: "0",
      margin: "0",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      fallbacks: [
        {
          backgroundColor: "#000",
        },
      ],
      borderRadius: "0",
      padding: "16px 24px",
    },
    ".toast--material__message": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      margin: "0 24px 0 0",
    },
    ".toast--material__button": {
      fontFamily: "Roboto, Noto, sans-serif",
      webkitFontSmoothing: "antialiased",
      fontWeight: "400",
      color: "#bb86fc",
    },
    ".toolbar + .page__background": {
      top: "44px",
    },
    ".toolbar + .page__background + .page__content": {
      top: "44px",
      paddingTop: "0",
    },
    ".page-with-bottom-toolbar > .page__content": {
      bottom: "44px",
    },
    ".toolbar.toolbar--material + .page__background": {
      top: "56px",
    },
    ".toolbar.toolbar--material + .page__background + .page__content": {
      top: "56px",
      paddingTop: "0",
    },
    ".toolbar.toolbar--transparent + .page__background": {
      top: "0",
    },
    ".toolbar.toolbar--transparent.toolbar--cover-content\r\n  + .page__background\r\n  + .page__content, .toolbar.toolbar--transparent.toolbar--cover-content\r\n  + .page__background\r\n  + .page__content\r\n  .page_content":
      {
        top: "0",
        paddingTop: "44px",
      },
    ".toolbar.toolbar--material.toolbar--transparent.toolbar--cover-content\r\n  + .page__background\r\n  + .page__content, .toolbar.toolbar--material.toolbar--transparent.toolbar--cover-content\r\n  + .page__background\r\n  + .page__content\r\n  .page_content":
      {
        top: "0",
        paddingTop: "56px",
      },
    ".tabbar:not(.tabbar--top)": {
      paddingBottom: "0",
    },
    "@media (orientation: landscape)": {
      "html[onsflag-iphonex-landscape] .page__content": {
        paddingLeft: "44px",
        paddingRight: "44px",
        bottom: "0",
        paddingBottom: "21px",
      },
      "html[onsflag-iphonex-landscape] .dialog .page__content, html[onsflag-iphonex-landscape] .modal .page__content": {
        paddingLeft: "0",
        paddingRight: "0",
      },
      "html[onsflag-iphonex-landscape] .toolbar__left": {
        paddingLeft: "44px",
      },
      "html[onsflag-iphonex-landscape] .toolbar__right": {
        paddingRight: "44px",
      },
      "html[onsflag-iphonex-landscape] .bottom-bar": {
        paddingRight: "44px",
        paddingLeft: "44px",
        bottom: "0",
        boxSizing: "content-box",
        paddingBottom: "21px",
      },
      "html[onsflag-iphonex-landscape] .tabbar": {
        paddingLeft: "44px",
        paddingRight: "44px",
        width: "calc(100% - 88px)",
      },
      "html[onsflag-iphonex-landscape] .fab--bottom__center, html[onsflag-iphonex-landscape] .fab--bottom__left, html[onsflag-iphonex-landscape] .fab--bottom__right":
        {
          bottom: "21px",
        },
      "html[onsflag-iphonex-landscape] .fab--bottom__left, html[onsflag-iphonex-landscape] .fab--top__left": {
        left: "44px",
      },
      "html[onsflag-iphonex-landscape] .fab--bottom__right, html[onsflag-iphonex-landscape] .fab--top__right": {
        right: "44px",
      },
      "html[onsflag-iphonex-landscape] .action-sheet": {
        left: "calc((100vw - 100vh + 20px) / 2)",
        right: "calc((100vw - 100vh + 20px) / 2)",
        bottom: "33px",
      },
      "html[onsflag-iphonex-landscape] .toast": {
        left: "52px",
        right: "52px",
        bottom: "21px",
      },
      "html[onsflag-iphonex-landscape] .dialog .bottom-bar, html[onsflag-iphonex-landscape]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .bottom-bar, html[onsflag-iphonex-landscape]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .bottom-bar":
        {
          bottom: "0",
          boxSizing: "border-box",
          paddingBottom: "0",
        },
      "html[onsflag-iphonex-landscape] .dialog .page__content, html[onsflag-iphonex-landscape] .page-with-bottom-toolbar > .page__content, html[onsflag-iphonex-landscape]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .page__content, html[onsflag-iphonex-landscape]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .page__content":
        {
          bottom: "0",
          paddingBottom: "0",
        },
      "html[onsflag-iphonex-landscape] .page-with-bottom-toolbar > .page__content": {
        bottom: "65px",
        paddingBottom: "0",
      },
      "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page-with-bottom-toolbar\r\n    > .page__content, html[onsflag-iphonex-landscape]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .page-with-bottom-toolbar\r\n    > .page__content, html[onsflag-iphonex-landscape]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .page-with-bottom-toolbar\r\n    > .page__content":
        {
          bottom: "44px",
          paddingBottom: "0",
        },
      "html[onsflag-iphonex-landscape] .tabbar:not(.tabbar--top)": {
        paddingBottom: "21px",
      },
      "html[onsflag-iphonex-landscape] .dialog .tabbar:not(.tabbar--top), html[onsflag-iphonex-landscape]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .tabbar:not(.tabbar--top), html[onsflag-iphonex-landscape]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .tabbar:not(.tabbar--top)":
        {
          paddingBottom: "0",
        },
      "html[onsflag-iphonex-landscape] .tabbar__content:not(.tabbar--top__content)": {
        bottom: "70px",
      },
      "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .tabbar__content:not(.tabbar--top__content), html[onsflag-iphonex-landscape]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .tabbar__content:not(.tabbar--top__content), html[onsflag-iphonex-landscape]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .tabbar__content:not(.tabbar--top__content)":
        {
          bottom: "49px",
        },
      "html[onsflag-iphonex-landscape] .page__content > .list:not(.list--inset)": {
        marginLeft: "-44px",
        marginRight: "-44px",
      },
      "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-header": {
        paddingLeft: "59px",
      },
      "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item": {
        paddingLeft: "58px",
      },
      "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item--chevron:before": {
        right: "60px",
      },
      "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item__center:last-child":
        {
          paddingRight: "50px",
        },
      "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item__right":
        {
          paddingRight: "56px",
        },
      "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item--chevron__right":
        {
          paddingRight: "74px",
        },
      "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)": {
        marginLeft: "0",
        marginRight: "0",
      },
      "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-header": {
        paddingLeft: "15px",
      },
      "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item": {
        paddingLeft: "14px",
      },
      "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item--chevron:before":
        {
          right: "16px",
        },
      "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item__center:last-child":
        {
          paddingRight: "6px",
        },
      "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item__right":
        {
          paddingRight: "12px",
        },
      "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item--chevron__right":
        {
          paddingRight: "30px",
        },
    },
    "@media (orientation: portrait)": {
      "html[onsflag-iphonex-portrait] .fab--top__center, html[onsflag-iphonex-portrait] .fab--top__left, html[onsflag-iphonex-portrait] .fab--top__right":
        {
          top: "64px",
        },
      "html[onsflag-iphonex-portrait] .fab--bottom__center, html[onsflag-iphonex-portrait] .fab--bottom__left, html[onsflag-iphonex-portrait] .fab--bottom__right":
        {
          bottom: "34px",
        },
      "html[onsflag-iphonex-portrait] .action-sheet": {
        bottom: "48px",
      },
      "html[onsflag-iphonex-portrait] .toast": {
        bottom: "34px",
      },
      "html[onsflag-iphonex-portrait] .toolbar": {
        top: "0",
        boxSizing: "content-box",
        paddingTop: "44px",
      },
      "html[onsflag-iphonex-portrait] .dialog .toolbar, html[onsflag-iphonex-portrait] .tabbar--top__content .toolbar, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content\r\n    .toolbar":
        {
          top: "0",
          boxSizing: "border-box",
          paddingTop: "0",
        },
      "html[onsflag-iphonex-portrait] .bottom-bar": {
        bottom: "0",
        boxSizing: "content-box",
        paddingBottom: "34px",
      },
      "html[onsflag-iphonex-portrait] .dialog .bottom-bar, html[onsflag-iphonex-portrait]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .bottom-bar, html[onsflag-iphonex-portrait]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .bottom-bar":
        {
          bottom: "0",
          boxSizing: "border-box",
          paddingBottom: "0",
        },
      "html[onsflag-iphonex-portrait] .page__content": {
        top: "0",
        paddingTop: "44px",
        bottom: "0",
        paddingBottom: "34px",
      },
      "html[onsflag-iphonex-portrait] .dialog .page__content, html[onsflag-iphonex-portrait] .tabbar--top__content .page__content, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content\r\n    .page__content":
        {
          top: "0",
          paddingTop: "0",
        },
      "html[onsflag-iphonex-portrait] .dialog .page__content, html[onsflag-iphonex-portrait] .page-with-bottom-toolbar > .page__content, html[onsflag-iphonex-portrait]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .page__content, html[onsflag-iphonex-portrait]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .page__content":
        {
          bottom: "0",
          paddingBottom: "0",
        },
      "html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content":
        {
          top: "88px",
          paddingTop: "0",
        },
      "html[onsflag-iphonex-portrait]\r\n    .dialog\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background, html[onsflag-iphonex-portrait]\r\n    .dialog\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content, html[onsflag-iphonex-portrait]\r\n    .tabbar--top__content\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background, html[onsflag-iphonex-portrait]\r\n    .tabbar--top__content\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content":
        {
          top: "44px",
          paddingTop: "0",
        },
      "html[onsflag-iphonex-portrait] .page-with-bottom-toolbar > .page__content": {
        bottom: "78px",
        paddingBottom: "0",
      },
      "html[onsflag-iphonex-portrait]\r\n    .dialog\r\n    .page-with-bottom-toolbar\r\n    > .page__content, html[onsflag-iphonex-portrait]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .page-with-bottom-toolbar\r\n    > .page__content, html[onsflag-iphonex-portrait]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .page-with-bottom-toolbar\r\n    > .page__content":
        {
          bottom: "44px",
          paddingBottom: "0",
        },
      "html[onsflag-iphonex-portrait]\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content, html[onsflag-iphonex-portrait]\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content\r\n    .page_content":
        {
          top: "0",
          paddingTop: "88px",
        },
      "html[onsflag-iphonex-portrait]\r\n    .dialog\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content, html[onsflag-iphonex-portrait]\r\n    .dialog\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content\r\n    .page_content, html[onsflag-iphonex-portrait]\r\n    .tabbar--top__content\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content, html[onsflag-iphonex-portrait]\r\n    .tabbar--top__content\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content\r\n    .page_content, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content\r\n    .page__content":
        {
          top: "0",
          paddingTop: "44px",
        },
      "html[onsflag-iphonex-portrait] .tabbar--top": {
        paddingTop: "44px",
      },
      "html[onsflag-iphonex-portrait] .dialog .tabbar--top, html[onsflag-iphonex-portrait] .tabbar--top__content .tabbar--top, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content\r\n    .tabbar--top":
        {
          paddingTop: "0",
        },
      "html[onsflag-iphonex-portrait] .tabbar--top__content": {
        top: "93px",
      },
      "html[onsflag-iphonex-portrait] .dialog .tabbar--top__content, html[onsflag-iphonex-portrait] .tabbar--top__content .tabbar--top__content, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content\r\n    .tabbar--top__content":
        {
          top: "49px",
        },
      "html[onsflag-iphonex-portrait] .tabbar:not(.tabbar--top):not(.tabbar--top)": {
        paddingBottom: "34px",
      },
      "html[onsflag-iphonex-portrait]\r\n    .dialog\r\n    .tabbar:not(.tabbar--top):not(.tabbar--top), html[onsflag-iphonex-portrait]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .tabbar:not(.tabbar--top), html[onsflag-iphonex-portrait]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .tabbar:not(.tabbar--top)":
        {
          paddingBottom: "0",
        },
      "html[onsflag-iphonex-portrait] .tabbar__content:not(.tabbar--top__content)": {
        bottom: "83px",
      },
      "html[onsflag-iphonex-portrait]\r\n    .dialog\r\n    .tabbar__content:not(.tabbar--top__content), html[onsflag-iphonex-portrait]\r\n    .page-with-bottom-toolbar\r\n    > .page__content\r\n    .tabbar__content:not(.tabbar--top__content), html[onsflag-iphonex-portrait]\r\n    .tabbar__content:not(.tabbar--top__content)\r\n    .tabbar__content:not(.tabbar--top__content)":
        {
          bottom: "49px",
        },
    },
  },
};

export default dark_theme;

import { PaletteColorOptions, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    mainColor?: PaletteColorOptions;
    searchBarColor?: PaletteColorOptions;
    textInputStroke?: PaletteColorOptions;
    mainTextColor?: PaletteColorOptions;
    secTextColor?: PaletteColorOptions;
    modalText?: PaletteColorOptions;
    placeholder?: PaletteColorOptions;
    updateBtnColor?: PaletteColorOptions;
    deleteBtnColor?: PaletteColorOptions;
    toastBoxColor?: PaletteColorOptions;
  }
}

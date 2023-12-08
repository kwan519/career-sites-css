const GetFontNavColor = (color?: string) => {
    if(!color) return "rgb(0, 0, 0)"

    // Extract RGB values from the input color string
    const [r, g, b] = color.slice(4, -1).split(',').map(Number);

    // Calculate brightness using the perceived luminance formula
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Determine the font color based on brightness
    if (brightness > 0.7) {
        // Bright color, return black
        return "rgb(0, 0, 0)";
    } else {
        // Dark color, return white
        return "rgb(255, 255, 255)";
    }
}


export const GetHeaderColor = (theme?: ITheme) => {
    if(!theme) return "rgb(255, 255, 255)";
    if(theme.headerColor === null) return "rgb(255, 255, 255)";
    if(theme.headerBackgroundColor === theme?.headerColor)
        return GetFontNavColor(theme?.headerBackgroundColor)
    return theme?.headerColor
}

function isValidCssValue(value: string): boolean {
    const cssColorNames = [
          'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia',
          'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua'
          // Add more color names as needed
      ];
  
    
      // Regular expression for a simple CSS color value (hex, rgb, or color names)
      const cssColorPattern = /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|rgb\(\s?\d+\s?,\s?\d+\s?,\s?\d+\s?\))$/;
  
      // Check if the input value matches the CSS color pattern
      return cssColorPattern.test(value) || cssColorNames.includes(value.toLowerCase());
  }

export const GetColorFromTheme = (keyName: string, theme?: ITheme ) => {
    if(isValidCssValue(keyName)) {
        return keyName
    }else if(theme) {
       switch (keyName) {
        case 'headerColor':
            return theme.headerColor
        case 'headerBackgroundColor':
            return theme.headerBackgroundColor
        case 'footerColor': 
            return theme.footerColor
        case 'footerBackgroundColor':
            return theme.footerBackgroundColor
        default:
            return `var(---${keyName})`
       }
    }else{
        return 'transparent'
    }
}
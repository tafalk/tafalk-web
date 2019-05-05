const GetUserHsl = (userSpecificString) => {
  let hash = 0
  for (let i = 0; i < userSpecificString.length; i++) {
    hash = userSpecificString.charCodeAt(i) + ((hash << 5) - hash)
  }
  let hex = '#'
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xFF
    hex += ('00' + value.toString(16)).substr(-2)
  }

  // hex to rgb
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  // r /= 255, g /= 255, b /= 255
  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)

  let h = (max + min) / 2
  let s = (max + min) / 2
  let l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    var d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break
    case g: h = (b - r) / d + 2; break
    case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return [h, s, l]
}

const GetUserHue = (userSpecificString) => {
  const userHueDegree = GetUserHsl(userSpecificString)[0] * 360

  return {
    filter: `sepia(100%) hue-rotate(${userHueDegree}deg)`,
    webkitFilter: `sepia(100%) hue-rotate(${userHueDegree}deg)`
  }
}

export { GetUserHue, GetUserHsl }

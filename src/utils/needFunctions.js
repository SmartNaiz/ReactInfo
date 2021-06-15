export const transpose = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      const tmp = arr[i][j];
      arr[i][j] = arr[j][i];
      arr[j][i] = tmp;
    }
  }
};

export const transposeData = (arr) => {
  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 0; j < i; j++) {
      const tmp = arr[i][j];
      arr[i][j] = arr[j][i];
      arr[j][i] = tmp;
    }
  }
};

export const motorDough = (mtr) => {
  if (mtr >= 1438) {
    return [1440, 0];
  } else {
    return [mtr, 1440 - mtr];
  }
  // if (mtr > 720) {
  //   const dif = mtr - 720;
  //   return [
  //     [720, 0],
  //     [dif, 720 - dif],
  //   ];
  // } else {
  //   return [
  //     [mtr, 720 - mtr],
  //     [0, 720],
  //   ];
  // }
};

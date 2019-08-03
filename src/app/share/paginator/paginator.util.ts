export function computeLinks(totalPages: number, selectedPage: number) {
  let i = 0;
  let value = 0;
  const  arr = [];
  const  lowerArr = [];
  const  upperArr = [];

  const  indexer = [4, 40, 50, 400, 500, 4000, 5000, 40000, 50000];
  const  patter = [1, 1, 1, 4, 40, 50, 400, 500, 4000, 5000, 40000];

  if (totalPages === 0) {
    return [];
  }

  if (selectedPage === 1) {
    // 15 links
    for (i = 1; i <= 16; i++) {
      if (i <= 7) {
        value = i;
      } else {
        value = value + indexer[i - 8];
      }
      if (value > totalPages) {
        value = totalPages;
      }
      if (!arr.includes(value)) {
        arr.push(value);
      }
    }
  }

  if (selectedPage > 1) {
    if (totalPages <= 16) {
      for (i = 1; i <= 16; i++) {
        value = i;
        if (value > totalPages) {
          value = totalPages;
        }
        if (!arr.includes(value)) {
          arr.push(value);
        }
      }
    } else {
      for (i = 0; i <= 7; i++) {
        if (value === 0) {
          value = selectedPage - patter[i];
        } else {
          value = value - patter[i];
        }

        if (value > 0) {
          if (!lowerArr.includes(value)) {
            lowerArr.push(value);
          }
        }

      }
      value = 0;
      for (i = 0; i <= 7; i++) {
        if (value === 0) {
          value = selectedPage + patter[i];
        } else {
          value = value + patter[i];
        }

        if (value > totalPages) {
          value = totalPages;
        }

        if (!upperArr.includes(value)) {
          upperArr.push(value);
        }
      }
      //// add lower array values
      for (i = 0; i <= lowerArr.length - 1; i++) {
        const revIndex = lowerArr.length - 1 - i;
        arr.push(lowerArr[revIndex]);
      }
      //// add selected record
      arr.push(selectedPage);
      //// add upper array values
      for (i = 0; i <= upperArr.length - 1; i++) {
        arr.push(upperArr[i]);
      }
    }
  }
  return arr;
}

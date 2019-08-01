export function computeLinks(totalPages: number, selectedPage: number) {
  let i = 0;
  let value = 0;
  let arr = [];
  let lower_arr = [];
  let upper_arr = [];

  let indexer = [4, 40, 50, 400, 500, 4000, 5000, 40000, 50000];
  let patter = [1, 1, 1, 4, 40, 50, 400, 500, 4000, 5000, 40000];

  if (totalPages === 0) {
    return [];
  }

  if (selectedPage == 1) {
    // 15 links
    for (i = 1; i <= 16; i++) {
      if (i <= 7)
        value = i;
      else
        value = value + indexer[i - 8];
      if (value > totalPages)
        value = totalPages;
      if (!arr.includes(value))
        arr.push(value);
    }
  }

  if (selectedPage > 1) {
    if (totalPages <= 16) {
      for (i = 1; i <= 16; i++) {
        value = i;
        if (value > totalPages)
          value = totalPages;
        if (!arr.includes(value))
          arr.push(value);
      }
    } else {
      for (i = 0; i <= 7; i++) {
        if (value == 0)
          value = selectedPage - patter[i];
        else
          value = value - patter[i];

        if (value > 0) {
          if (!lower_arr.includes(value))
            lower_arr.push(value);
        }

      }
      value = 0;
      for (i = 0; i <= 7; i++) {
        if (value == 0)
          value = selectedPage + patter[i];
        else
          value = value + patter[i];

        if (value > totalPages)
          value = totalPages;

        if (!upper_arr.includes(value))
          upper_arr.push(value);
      }
      //// add lower array values
      for (i = 0; i <= lower_arr.length - 1; i++) {
        let rev_index = lower_arr.length - 1 - i;
        arr.push(lower_arr[rev_index]);
      }
      //// add selected record
      arr.push(selectedPage);
      //// add upper array values
      for (i = 0; i <= upper_arr.length - 1; i++) {
        arr.push(upper_arr[i]);
      }
    }
  }
  return arr;
}

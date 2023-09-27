const partition = (collection) => {
  if (collection.length === 1) {
    return [[collection]];
  }

  const first = collection[0];
  const smallerPartitions = partition(collection.slice(1));

  const result = [];

  for (const smaller of smallerPartitions) {
    // Insert `first` in each of the subpartition's subsets
    for (let n = 0; n < smaller.length; n++) {
      const newSubset = [
        ...smaller.slice(0, n),
        [first, ...smaller[n]],
        ...smaller.slice(n + 1),
      ];
      result.push(newSubset);
    }
    // Put `first` in its own subset
    result.push([[first], ...smaller]);
  }
  return result;
};

export { partition };

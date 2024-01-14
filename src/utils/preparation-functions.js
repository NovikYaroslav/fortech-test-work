const prepareTypes = function prepareTypes(typesArray) {
  return typesArray.map((type) => type.type.name);
};

const calculateNewActivePage = function (
  currentActivePage,
  newAmountPerPage,
  totalItems,
  amountPerPage,
) {
  const newActivePage = Math.floor((currentActivePage * amountPerPage) / newAmountPerPage);
  return Math.min(newActivePage, Math.ceil(totalItems / newAmountPerPage) - 1);
};

export {
  prepareTypes,
  calculateNewActivePage,
};

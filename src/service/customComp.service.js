const storeCustomComp = async (body) => {
  const { configId, type } = body;
  return { configId, type };
};

module.exports = {
  storeCustomComp,
};

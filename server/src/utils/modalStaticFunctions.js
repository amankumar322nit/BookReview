const defaultStaticFunctions = {
  totalCount(query) {
    return this.find(query.filter).count();
  },
  list(query) {
    return this.find(query.filter)
      .lean()
      .skip((query.page - 1) * query.limit)
      .limit(query.explimit ? null : query.limit)
      .exec();
  },
};

export default defaultStaticFunctions;

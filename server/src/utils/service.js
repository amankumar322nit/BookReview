import { CONTROLLERS } from "../constant.js";

export const generateListQuery = async (req, controller) => {
  const criteria = {
    limit: 50,
    page: 1,
    filter: {},
    pagination: {},
  };

  const json = {};

  // if request consist of query
  if (req.query) {
    const data = req.query;
    if (data && data.limit) {
      criteria.limit = parseInt(data.limit);
      criteria.pagination.limit = parseInt(data.limit);
    }
    if (data && data.page) {
      criteria.page = parseInt(data.page);
      criteria.pagination.page = parseInt(data.page);
    }
    if (data && data.filter) {
      const cred = JSON.parse(data.filter);
      if (cred.limit) {
        criteria.limit = parseInt(cred.limit, 10);
        criteria.pagination.limit = parseInt(cred.limit, 10);
      }
      if (cred.page) {
        criteria.page = parseInt(cred.page, 10);
        criteria.pagination.page = parseInt(cred.page, 10);
      }
      if (cred && cred.globalSearch) {
        const globalObj = cred.globalSearch;

        /* handle search bar query */
        if (globalObj && globalObj.value) {
          /* 
             if we want to include the special character in the string for mongoquery we need to include it with the
             escape character '\' so if our string include '*' or '$' then we need to replace it with '\*' or '\$'.
            */
          globalObj.value = globalObj.value.replace(/\*/g, "\\*");
          globalObj.value = globalObj.value.replace(/\$/g, "\\$");
          globalObj.value = globalObj.value.replace(/\+/g, "\\+");
          globalObj.value = globalObj.value.replace(/\-/g, "\\-");
          if (!json.$or) {
            json.$or = [];
          }

          // form search query w.r.t search input
          const filtersArr = [];
          if (CONTROLLERS.BOOK === controller) {
            filtersArr.push("authors", "title", "categories");
          } else if (CONTROLLERS.REVIEW === controller) {
            filtersArr.push("userId");
          }

          // build search query
          filtersArr.forEach((v) => {
            const jsonNew = {};
            jsonNew[v] = { $regex: globalObj.value, $options: "i" };
            json.$or.push(jsonNew);
          });
        }
      }
      if (cred && cred.criteria) {
        const filters = cred.criteria;
        if (filters && filters.length > 0) {
          filters.forEach((v) => {
            if (v.type === "eq") {
              json[v.key] = v.value;
            }
            if (v.type === "in") {
              json[v.key] = { $in: v.value };
            }
            if (v.type === "gte") {
              if (!json[v.key]) {
                json[v.key] = {};
              }
              json[v.key].$gte = v.value;
            }
            if (v.type === "lte") {
              if (!json[v.key]) {
                json[v.key] = {};
              }
              json[v.key].$lte = v.value;
            }
            if (v.type === "or") {
              if (!json.$or) {
                json.$or = [];
              }
              const jsonNew = {};
              jsonNew[v.key] = { $regex: v.value };
              json.$or.push(jsonNew);
            }
            if (v.type === "ne") {
              json[v.key] = { $ne: v.value };
            }
            if (v.type === "nin") {
              json[v.key] = { $in: v.value };
            }
            if (v.type === "regexOr") {
              json[v.key] = { $regex: v.value, $options: "i" };
            }
          });
        }
      }
    }
  }

  criteria.filter = json;
  return criteria;
};

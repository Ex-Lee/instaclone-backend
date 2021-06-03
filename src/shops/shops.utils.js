export const createCategoryObj = (category) => {
  const categorys = category.match(/\w+,\w+/g) || [];
  const categoryObj = categorys.map((e) => {
    let splitStr = e.split(",");
    return {
      where: { name: splitStr[0] },
      create: { name: splitStr[0], slug: splitStr[1] },
    };
  });
  return categoryObj;
};

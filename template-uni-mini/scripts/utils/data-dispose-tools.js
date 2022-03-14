/**
 * 数据处理工具函数
 */

/**
 * 过滤数组数据
 * @param {array} source 源数据 obj[]
 * @param {string} attr 属性名，例如：id
 * @param {array} value 属性值，例如：['1','9']
 * @param {boolean} isReverse 是否取反，默认为 false
 * */
function filterArray({ source, attr, value, isReverse = false }) {
  if (!Array.isArray(source)) return [];
  const result = source.filter((item) => {
    const bool = isReverse
      ? !value.includes(item[attr])
      : value.includes(item[attr]);
    return bool;
  });
  // console.log("result :>> ",result)
  return result;
}

/**
 * 字段转换（数字转文本/文本转数字）
 * @param {array} source 源数据
 * @param {string | array} value 属性值 例如：'2,6,9' 或者 ['2','6','9']，若为 string 多个数值必须为逗号隔开
 * @param {string} targetKey 目标key，默认为 value
 * @param {string} resultKey 结果key，默认为 label
 * @param {boolean} isReturnString 是否返回字符串，默认为true
 * @return {string | array} '文本2,文本6,文本9' 或者 ['文本2','文本6','文本9']
 */
function fieldTransform({
  source,
  value,
  targetKey = "value",
  resultKey = "label",
  isReturnString = true,
}) {
  if (!Array.isArray(source) || !value || value.lenght == 0) return "";
  if (typeof value === "string") {
    value = value.split(",");
  }
  let filterArr = source.filter(
    (item) => value.includes(item[targetKey]) || value == item[targetKey]
  );
  // console.log('filterArr :>> ', filterArr)
  const result = filterArr.reduce((prev, curr) => {
    return prev.concat(curr[resultKey]);
  }, []);
  // console.log('result :>> ', result)
  return isReturnString ? result.join(",") : result;
}

export default {
  /**
   * 过滤数组数据
   */
  filterArray,
  /**
   * 字段转换
   */
  fieldTransform
};

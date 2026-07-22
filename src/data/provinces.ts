import type { Province } from "@/types";

export const PROVINCES: Province[] = [
  { id: "110000", name: "北京", fullName: "北京市", cities: [], coverage: "complete" },
  { id: "120000", name: "天津", fullName: "天津市", cities: [], coverage: "complete" },
  { id: "130000", name: "河北", fullName: "河北省", cities: [], coverage: "partial" },
  { id: "140000", name: "山西", fullName: "山西省", cities: [], coverage: "partial" },
  { id: "150000", name: "内蒙古", fullName: "内蒙古自治区", cities: [], coverage: "partial" },
  { id: "210000", name: "辽宁", fullName: "辽宁省", cities: [], coverage: "partial" },
  { id: "220000", name: "吉林", fullName: "吉林省", cities: [], coverage: "partial" },
  { id: "230000", name: "黑龙江", fullName: "黑龙江省", cities: [], coverage: "partial" },
  { id: "310000", name: "上海", fullName: "上海市", cities: [], coverage: "complete" },
  { id: "320000", name: "江苏", fullName: "江苏省", cities: [], coverage: "complete" },
  { id: "330000", name: "浙江", fullName: "浙江省", cities: [], coverage: "complete" },
  { id: "340000", name: "安徽", fullName: "安徽省", cities: [], coverage: "partial" },
  { id: "350000", name: "福建", fullName: "福建省", cities: [], coverage: "partial" },
  { id: "360000", name: "江西", fullName: "江西省", cities: [], coverage: "partial" },
  { id: "370000", name: "山东", fullName: "山东省", cities: [], coverage: "partial" },
  { id: "410000", name: "河南", fullName: "河南省", cities: [], coverage: "partial" },
  { id: "420000", name: "湖北", fullName: "湖北省", cities: [], coverage: "partial" },
  { id: "430000", name: "湖南", fullName: "湖南省", cities: [], coverage: "partial" },
  { id: "440000", name: "广东", fullName: "广东省", cities: [], coverage: "partial" },
  { id: "450000", name: "广西", fullName: "广西壮族自治区", cities: [], coverage: "partial" },
  { id: "460000", name: "海南", fullName: "海南省", cities: [], coverage: "partial" },
  { id: "500000", name: "重庆", fullName: "重庆市", cities: [], coverage: "complete" },
  { id: "510000", name: "四川", fullName: "四川省", cities: [], coverage: "partial" },
  { id: "520000", name: "贵州", fullName: "贵州省", cities: [], coverage: "partial" },
  { id: "530000", name: "云南", fullName: "云南省", cities: [], coverage: "partial" },
  { id: "540000", name: "西藏", fullName: "西藏自治区", cities: [], coverage: "none" },
  { id: "610000", name: "陕西", fullName: "陕西省", cities: [], coverage: "partial" },
  { id: "620000", name: "甘肃", fullName: "甘肃省", cities: [], coverage: "partial" },
  { id: "630000", name: "青海", fullName: "青海省", cities: [], coverage: "partial" },
  { id: "640000", name: "宁夏", fullName: "宁夏回族自治区", cities: [], coverage: "partial" },
  { id: "650000", name: "新疆", fullName: "新疆维吾尔自治区", cities: [], coverage: "partial" },
  { id: "710000", name: "台湾", fullName: "台湾省", cities: [], coverage: "none" },
  { id: "810000", name: "香港", fullName: "香港特别行政区", cities: [], coverage: "none" },
  { id: "820000", name: "澳门", fullName: "澳门特别行政区", cities: [], coverage: "none" },
];

/** Map city/location names to their parent province */
export function findProvinceByLocation(location: string): Province | null {
  if (location.includes("北京")) return PROVINCES[0];
  if (location.includes("天津")) return PROVINCES[1];
  if (location.includes("河北")) return PROVINCES[2];
  if (location.includes("山西")) return PROVINCES[3];
  if (location.includes("内蒙古")) return PROVINCES[4];
  if (location.includes("辽宁")) return PROVINCES[5];
  if (location.includes("吉林")) return PROVINCES[6];
  if (location.includes("黑龙江")) return PROVINCES[7];
  if (location.includes("上海")) return PROVINCES[8];
  if (location.includes("江苏")) return PROVINCES[9];
  if (location.includes("浙江")) return PROVINCES[10];
  if (location.includes("安徽")) return PROVINCES[11];
  if (location.includes("福建")) return PROVINCES[12];
  if (location.includes("江西")) return PROVINCES[13];
  if (location.includes("山东")) return PROVINCES[14];
  if (location.includes("河南")) return PROVINCES[15];
  if (location.includes("湖北")) return PROVINCES[16];
  if (location.includes("湖南")) return PROVINCES[17];
  if (location.includes("广东")) return PROVINCES[18];
  if (location.includes("广西")) return PROVINCES[19];
  if (location.includes("海南")) return PROVINCES[20];
  if (location.includes("重庆") || location.includes("渝中")) return PROVINCES[21];
  if (location.includes("四川")) return PROVINCES[22];
  if (location.includes("贵州")) return PROVINCES[23];
  if (location.includes("云南")) return PROVINCES[24];
  if (location.includes("西藏")) return PROVINCES[25];
  if (location.includes("陕西") || location.includes("西安")) return PROVINCES[26];
  if (location.includes("甘肃")) return PROVINCES[27];
  if (location.includes("青海")) return PROVINCES[28];
  if (location.includes("宁夏")) return PROVINCES[29];
  if (location.includes("新疆")) return PROVINCES[30];
  if (location.includes("台湾")) return PROVINCES[31];
  if (location.includes("香港")) return PROVINCES[32];
  if (location.includes("澳门")) return PROVINCES[33];
  return null;
}

/** Map ECharts province names to our Province objects */
export function findProvinceByName(name: string): Province | null {
  const normalized = name.replace(/\s/g, "");
  return PROVINCES.find(
    (p) =>
      p.name === normalized ||
      p.fullName === normalized ||
      normalized.includes(p.name)
  ) ?? null;
}

/** Place count per province for the heatmap */
export const PROVINCE_PLACE_COUNTS: Record<string, number> = {
  "北京": 1, "天津": 0, "河北": 1, "山西": 0, "内蒙古": 0,
  "辽宁": 0, "吉林": 0, "黑龙江": 1,
  "上海": 1, "江苏": 2, "浙江": 2, "安徽": 0, "福建": 0, "江西": 0, "山东": 0,
  "河南": 2, "湖北": 0, "湖南": 1, "广东": 1, "广西": 0, "海南": 0,
  "重庆": 1, "四川": 0, "贵州": 0, "云南": 1,
  "西藏": 0, "陕西": 1, "甘肃": 0, "青海": 0, "宁夏": 0, "新疆": 2,
  "台湾": 0, "香港": 0, "澳门": 0,
};
const notLove = (firstGround, secondGround) =>
  ((firstGround === "子" && secondGround === "卯") ||
    (firstGround === "卯" && secondGround === "子")) &&
  true;

const self = (firstGround, secondGround) =>
  ((firstGround === "辰" && secondGround === "辰") ||
    (firstGround === "酉" && secondGround === "酉") ||
    (firstGround === "亥" && secondGround === "亥") ||
    (firstGround === "午" && secondGround === "午")) &&
  true;
const fire = (firstGround, secondGround, threeGround) =>
  ((firstGround === "寅" && secondGround === "巳" && threeGround === "申") ||
    (firstGround === "申" && secondGround === "寅" && threeGround === "巳") ||
    (firstGround === "巳" && secondGround === "申" && threeGround === "寅")) &&
  true;

const ground = (firstGround, secondGround, threeGround) =>
  ((firstGround === "丑" && secondGround === "戌" && threeGround === "未") ||
    (firstGround === "戌" && secondGround === "未" && threeGround === "丑") ||
    (firstGround === "未" && secondGround === "丑" && threeGround === "戌")) &&
  true;

export default {
  notLove,
  self,
  fire,
  ground
};

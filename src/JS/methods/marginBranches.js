export const marginBranches = (firstGround, secondGround) =>
  ((firstGround === "子" && secondGround === "丑") ||
    (firstGround === "丑" && secondGround === "子") ||
    (firstGround === "亥" && secondGround === "寅") ||
    (firstGround === "寅" && secondGround === "亥") ||
    (firstGround === "卯" && secondGround === "戌") ||
    (firstGround === "戌" && secondGround === "卯") ||
    (firstGround === "辰" && secondGround === "酉") ||
    (firstGround === "酉" && secondGround === "辰") ||
    (firstGround === "巳" && secondGround === "申") ||
    (firstGround === "申" && secondGround === "巳") ||
    (firstGround === "午" && secondGround === "未") ||
    (firstGround === "未" && secondGround === "午")) &&
  true;

export const harmBranches = (firstGround, secondGround) =>
  ((firstGround === "子" && secondGround === "未") ||
    (firstGround === "未" && secondGround === "子") ||
    (firstGround === "丑" && secondGround === "午") ||
    (firstGround === "午" && secondGround === "丑") ||
    (firstGround === "寅" && secondGround === "巳") ||
    (firstGround === "巳" && secondGround === "寅") ||
    (firstGround === "卯" && secondGround === "辰") ||
    (firstGround === "辰" && secondGround === "卯") ||
    (firstGround === "亥" && secondGround === "申") ||
    (firstGround === "申" && secondGround === "亥") ||
    (firstGround === "戌" && secondGround === "酉") ||
    (firstGround === "酉" && secondGround === "戌")) &&
  true;

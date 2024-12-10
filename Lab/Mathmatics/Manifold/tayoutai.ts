// 全称記号
function for_all<Space>(
  points: Space[],
  proposition: (point: Space) => boolean
) {
  return points.reduce((acc, p) => {
    return acc && proposition(p);
  }, true);
}

// 存在記号
function is_exists<Space>(
  points: Space[],
  proposition: (point: Space) => boolean
) {
  return points.reduce((acc, p) => {
    return acc || proposition(p);
  }, false);
}

// 実数の定義
type R = number;
const r_points: R[] = [0, 1, 2, 3, 4, 5];

type R2 = { x: R; y: R };
const r2_points: R2[] = combination(r_points, r_points, (p1, p2) => ({
  x: p1,
  y: p2,
}));

type R3 = { x: R; y: R; z: R };
const r3_points: R3[] = combination(r2_points, r_points, (p1, p2) => ({
  x: p1.x,
  y: p1.y,
  z: p2,
}));

// 直積集合
function combination<Space1, Space2, Comb>(
  points1: Space1[],
  points2: Space2[],
  generate: (point1: Space1, point2: Space2) => Comb
): Comb[] {
  return points1.reduce(
    (acc1, p1) =>
      points2.reduce((acc2, p2) => [...acc2, generate(p1, p2)], acc1),
    []
  );
}

// 距離
type demention<Space> = (p1: Space, p2: Space) => R;
function is_demention<Space>(
  points: Space[],
  demention: demention<Space>
): Boolean {
  return (
    // 正値性
    for_all(points, (a) => demention(a, a) >= 0) &&
    // 対称性
    for_all(points, (a) =>
      for_all(points, (b) => demention(a, b) === demention(b, a))
    ) &&
    // 三角不等式
    for_all(points, (a) =>
      for_all(points, (b) =>
        for_all(
          points,
          (c) => demention(a, b) + demention(b, c) >= demention(a, c)
        )
      )
    )
  );
}

// 3次元のユークリッド距離
const euqlid_demention: demention<R3> = (p1, p2) => {
  return Math.sqrt(
    (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2
  );
};
console.log(is_demention(r3_points, euqlid_demention));

// 近傍

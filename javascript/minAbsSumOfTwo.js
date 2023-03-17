/*Let A be a non-empty array consisting of N integers.

The abs sum of two for a pair of indices (P, Q) is the absolute value |A[P] + A[Q]|, for 0 ≤ P ≤ Q < N.

For example, the following array A:

  A[0] =  1
  A[1] =  4
  A[2] = -3
has pairs of indices (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2).
The abs sum of two for the pair (0, 0) is A[0] + A[0] = |1 + 1| = 2.
The abs sum of two for the pair (0, 1) is A[0] + A[1] = |1 + 4| = 5.
The abs sum of two for the pair (0, 2) is A[0] + A[2] = |1 + (−3)| = 2.
The abs sum of two for the pair (1, 1) is A[1] + A[1] = |4 + 4| = 8.
The abs sum of two for the pair (1, 2) is A[1] + A[2] = |4 + (−3)| = 1.
The abs sum of two for the pair (2, 2) is A[2] + A[2] = |(−3) + (−3)| = 6.
Write a function:

function solution(A);

that, given a non-empty array A consisting of N integers, returns the minimal abs sum of two for any pair of indices in this array.

For example, given the following array A:

  A[0] =  1
  A[1] =  4
  A[2] = -3
the function should return 1, as explained above.

Given array A:

  A[0] = -8
  A[1] =  4
  A[2] =  5
  A[3] =-10
  A[4] =  3
the function should return |(−8) + 5| = 3.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].*/

function solution(A) {
 let negatives = [];
 let positives = [];
 A.sort((a, b) => a - b);

 if (A.length === 1) return Math.abs(A[0] + A[0]);
 for (i = 0; i < A.length; i++) {
  if (A[i] < 0) {
   negatives.push(A[i]);
  } else {
   positives.push(A[i]);
  }
 }
 if (positives.length === 0) return -2 * negatives[negatives.length - 1];
 if (positives[0] === 0) return 0;
 if (negatives.length === 0) return 2 * positives[0];
 console.log("negatives", negatives, "positives", positives);
 //means is a combination of negative and positive
 let min = Math.abs(positives[0] + positives[0]);
 //  for (let i = 0; i < negatives.length; i++) {
 //   for (let j = positives.length - 1; j >= 0; j--) {
 //    const newMin = Math.min(abs, Math.abs(negatives[i] + positives[j]));
 //    console.log("newMin", newMin, "abs", abs, positives[j], negatives[i]);
 //    if (newMin < abs) abs = newMin;
 //    else if (negatives[i] * -1 >= positives[j]) break;
 //   }
 //  }
 for (i = 0; i < negatives.length; i++) {
  let start = 0;
  let end = positives.length - 1;
  const neg = A[i];

  while (start <= end) {
   const mid = parseInt((start + end) / 2);
   const pos = positives[mid];
   const sum = Math.abs(neg + pos);

   if (min > sum) min = sum;

   if (pos > Math.abs(neg)) {
    end = mid - 1;
   } else {
    start = mid + 1;
   }
  }
 }
 return min;
}

console.log(solution([-6, 4, 5, -10, 98, 3, -1, 2, -100]));
console.log(solution([-2, -4, -3, -2, -3]));
console.log(solution([-8, 4, 5, -10, 3]));

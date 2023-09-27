import { partition } from "./getPartitions.js";

const findBestCart = (originalCart, minCart, maxCart) => {
  // Initialize valid cart and get its partitions
  const validItems = [];
  const invalidExtras = [];
  for (const item of originalCart) {
    if (item >= maxCart) {
      invalidExtras.push(item);
    } else {
      validItems.push(item);
    }
  }
  const allCombinations = partition(validItems);
  // Map through the partitions and transform them into objects with more information
  const objCombinations = allCombinations.map((combination) => {
    let invalidCount = 0;
    let validCount = 0;
    let invalidCarts = [];
    let validCarts = [];
    const subCartCount = combination.length;
    combination.forEach((subCart) => {
      const sum = subCart.reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      if (sum >= maxCart || sum <= minCart) {
        invalidCount++;
        invalidCarts.push(subCart);
      } else if (sum < maxCart && sum > minCart) {
        validCount++;
        validCarts.push(subCart);
      }
    });

    const combinationObj = {
      invalidCount,
      validCount,
      invalidCarts,
      validCarts,
      subCartCount,
      combination,
    };
    return combinationObj;
  });

  // Initialize best cart and loop to find a better one
  let bestCart = objCombinations[0];
  for (const combo of objCombinations) {
    if (combo.invalidCount < bestCart.invalidCount) {
      bestCart = combo;
    } else if (combo.invalidCount === bestCart.invalidCount) {
      if (combo.validCount > bestCart.validCount && bestCart.validCount === 0) {
        bestCart = combo;
      } else if (combo.validCount === bestCart.validCount) {
        if (combo.subCartCount < bestCart.subCartCount) {
          bestCart = combo;
        } else if (combo.subCartCount === bestCart.subCartCount) {
          if (
            combo.invalidCarts.length === 1 &&
            bestCart.invalidCarts.length === 1
          ) {
            if (
              combo.invalidCarts[0].length < bestCart.invalidCarts[0].length
            ) {
              bestCart = combo;
            }
          }
        }
      }
    }
  }

  // Final check to add together extras
  if (invalidExtras.length > 0) {
    bestCart.invalidCarts[0].push(...invalidExtras);
  }
  console.log(bestCart);
  return {
    validCarts: bestCart.validCarts,
    invalidCarts: bestCart.invalidCarts,
  };
};

const minCart = 40;
const maxCart = 75;
const originalCart = [30, 25, 45, 10, 60, 17, 13];
// const something = [60, 5, 7, 7, 75, 77];
const { validCarts, invalidCarts } = findBestCart(
  originalCart,
  minCart,
  maxCart
);

console.log(`The best valid carts distribution is: `);
console.log(validCarts);
invalidCarts.length
  ? console.log("Could not fit the following items: " + invalidCarts)
  : console.log("All items distributed successfully!");

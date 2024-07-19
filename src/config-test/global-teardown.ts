// module.exports = async () => {
//   if (global.browser) {
//     await global.browser.close();
//   }
// }

export default async () => {
  // @ts-expect-error - Ignore the next line TypeScript errors about 'any' type
  if (global.browser) {
    // @ts-expect-error - Ignore the next line TypeScript errors about 'any' type
    await global.browser.close();
  }
  // console.log("Add any Teardown setup here");
  // console.log("Add any Teardown setup here2");
};

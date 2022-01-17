import { expect } from "chai";
import { createTransfer } from "../util/transactions";
import { describeDevMoonbeam } from "../util/setup-dev-tests";

describeDevMoonbeam("Transaction Index", (context) => {
  it("should get transaction by index", async function () {
    const block = 1;
    const index = 0;
    const testAccount = "0x1111111111111111111111111111111111111111";
    const hash = await createTransfer(context, testAccount, 0);
    await context.createBlock({
      transactions: [hash],
    });
    let result = await context.web3.eth.getTransactionFromBlock(block, index);
    expect(result.transactionIndex).to.equal(index);
  });
  it("should return out of bounds message", async function () {
    const block = 0;
    const index = 0;
    await context.web3.eth
      .getTransactionFromBlock(block, index)
      .catch((err) => expect(err.message).to.equal(`Returned error: ${index} is out of bounds`));
  });
});

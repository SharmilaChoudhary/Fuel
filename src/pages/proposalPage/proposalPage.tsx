import type { TestContractAbi } from "@/sway-api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import { BaseAssetId } from "fuels";
import { bn } from "fuels";
const ProposalPage = () => {
  const [contract, setContract] = useState<TestContractAbi>();
  const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();
  const [amount, setAmount] = useState("");
  const deposit = async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet."
      );
    }

    const value = await contract.functions
      .deposit()
      .callParams({
        forward: [10, BaseAssetId],
        gasLimit: 5000,
      })
      .call();
  };

  const withdraw = async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet."
      );
    }

    const value = await contract.functions.withdraw(bn(1)).call();
  };
  const handleDeposit = () => {
    // Logic for depositing amount
    console.log("Depositing:", amount);
  };

  const handleWithdraw = () => {
    // Logic for withdrawing amount
    console.log("Withdrawing:", amount);
  };

  const handleVote = () => {
    // Logic for voting
    console.log("Voting:", amount);
  };

  return (
    // <div className="p-4 bg-gray-100 rounded-lg shadow-md text-black">
    //   <div className="mb-4">
    //     <h2 className="text-xl font-bold">Asset ID: XYZ123</h2>
    //     <p>Proposal Duration: 30 days</p>
    //   </div>
    //   <div className="flex items-center">
    //     <input
    //       className="mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    //       type="number"
    //       value={amount}
    //       onChange={(e) => setAmount(e.target.value)}
    //       placeholder="Enter amount"
    //     />
    //     <button
    //       className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
    //       onClick={handleDeposit}
    //     >
    //       Deposit
    //     </button>
    //     <button
    //       className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600"
    //       onClick={handleWithdraw}
    //     >
    //       Withdraw
    //     </button>
    //     <button
    //       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    //       onClick={handleVote}
    //     >
    //       Vote
    //     </button>
    //   </div>
    // </div>

    <div className="bg-white p-4 shadow rounded-xl">
      <h3 className="text-xl font-bold text-black">proposal name</h3>
      <p className="text-gray-500 text-sm">
        {/* {`${humanizeDuration(
    Date.now() - parseInt(proposal.args[4].toString(), 10) * 1000
  )}`}{" "} */}
        TIME
      </p>
      <p className="text-gray-500 text-sm">Acceptance Percentage: XX%</p>
      <p className="text-gray-500 text-sm">Proposal Duration: XX days</p>
      <p className="text-gray-600 text-sm">ASSET ID</p>
      <div className="flex space-x-8 mt-4">
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-sm">Against Vote</p>
          <p className="text-gray-800 text-lg font-semibold">VOTE AGAINST</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={async () => {}}
          >
            Vote
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-sm">For Votes</p>
          <p className="text-gray-800 text-lg font-semibold">VOTE FOR</p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={async () => {}}
          >
            Vote
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <input
          className="mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={handleDeposit}
        >
          Deposit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default ProposalPage;

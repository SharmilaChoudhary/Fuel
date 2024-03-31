import type { TestContractAbi } from "@/sway-api";
import { TestContractAbi__factory } from "@/sway-api";
import contractIds from "@/sway-api/contract-ids.json";
import { FuelLogo } from "@/components/FuelLogo";
import { BigNumberish, assets, bn } from "fuels";
import { useEffect, useState } from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import toast from "react-hot-toast";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import useAsync from "react-use/lib/useAsync";
import { BaseAssetId } from "fuels";
import { AssetId } from "fuels";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";

const contractId = contractIds.testContract;


const hasContract = "true";
const hasPredicate = process.env.NEXT_PUBLIC_HAS_PREDICATE === "true";
const hasScript = process.env.NEXT_PUBLIC_HAS_SCRIPT === "true";
//import type { TestContractAbi } from "@/sway-api";


const ProposalPage = () => {
  const router= useRouter();
  const [contract, setContract] = useState<TestContractAbi>();
  const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();
  const [amount, setAmount] = useState("");
  const [proposalDetails, setProposalDetails] = useState<any>({});

  useAsync(async () => {
    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
     
     
    }
  }, [wallet]);

  useEffect(()=>{
    console.log('use effect called ')
    ProposalInfo()
  },[wallet])

const ProposalInfo = async () => {
  const number = router.query.number;
    console.log(wallet);
    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
      const tx = await testContract.functions
        .proposal(bn(number as string))
        .get();
      let proposal: any = {};
      proposal.proposal_percentage = tx.value.acceptance_percentage.toNumber();
      proposal.deadline = tx.value.deadline.toNumber();
      proposal.for = tx.value.yes_votes.toNumber();
      proposal.against = tx.value.no_votes.toNumber();
      proposal.asset_id = tx.value.proposal_transaction.asset.value;
      proposal.proposal_value = tx.value.proposal_transaction.amount.toNumber() ;
      proposal.executed = tx.value.executed;
      console.log(proposal);
      setProposalDetails(proposal);
      console.log(tx.value);
    }
};
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
  const handleDeposit = async() => {
    // Logic for depositing amount
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const value  = await contract.functions.deposit().callParams({
      forward: [amount, BaseAssetId],
      gasLimit: 5000,
      }).call();

 console.log(value)
    console.log("Depositing:", amount);
  };

  const handleWithdraw = async() => {
    // Logic for withdrawing amount
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const value = await contract.functions.withdraw(bn(amount)).call();
    console.log("Withdrawing:", amount);
    console.log(value)
  };

  const handleVote = () => {
    // Logic for voting
    console.log("Voting:", amount);
  };

  const voteagainst =async () => {
    const number = router.query.number;
    console.log("jvdjfkjcksjdfkfjs")
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }
    try{

      const value  = await contract.functions.vote(false,bn(number as string),bn(1)).call();
      console.log(value);
    }catch(err){
      console.log(err)
    }
  }

  const vote =async () => {
    const number = router.query.number;
    console.log("jvdjfkjcksjdfkfjs")
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }
    try{

      const value  = await contract.functions.vote(true,bn(number as string),bn(1)).call();
      console.log(value);
    }catch(err){
      console.log(err)
    }
  }


  const depositt =async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const value  = await contract.functions.deposit().callParams({
      forward: [amount, BaseAssetId],
      gasLimit: 5000,
      }).call();

 console.log(value)
      
  }

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
    // bg-black p-4 shadow rounded-xl border: 1px solid green-500
    <div 
    className="peer h-full w-full rounded-[7px] border border-green-500  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-500 placeholder-shown:border-t-green-500 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    >
    
      <p className="text-fuel-green font-semibold text-sm">Acceptance Percentage: {proposalDetails.proposal_percentage} %</p>
      <p className="text-fuel-green text-sm font-semibold">Proposal Duration: {proposalDetails.deadline} sec</p>
      <p className="text-fuel-green text-sm font-semibold"> Asset Id: {proposalDetails.asset_id} </p>
      <p className="text-fuel-green text-sm font-semibold">Executed: {proposalDetails.executed ?"True" :"false"} </p>
      <p className="text-fuel-green text-sm font-semibold">Proposal Amount: {proposalDetails.proposal_value}</p>


      <div className="flex space-x-8 mt-4">
        <div className="flex flex-col items-center">
          <p className="text-fuel-green text-sm font-semibold">Against Vote</p>
          <p className="text-fuel-green text-lg font-semibold">{proposalDetails.against}</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={async () => {voteagainst()}}
          >
            VoteAgainst
          </button>


        </div>
        <div className="flex flex-col items-center">
          <p className="text-fuel-green text-sm font-semibold">For Votes</p>
          <p className="text-fuel-green text-lg font-semibold">{proposalDetails.for}</p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={async () => {vote()}}
          >
            Vote
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <input
          className="mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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

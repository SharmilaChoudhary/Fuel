import type { TestContractAbi } from "@/sway-api";
import { TestContractAbi__factory } from "@/sway-api";
import contractIds from "@/sway-api/contract-ids.json";
import { FuelLogo } from "@/components/FuelLogo";
import { BigNumberish, assets, bn } from "fuels";
import { useState } from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import toast from "react-hot-toast";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import useAsync from "react-use/lib/useAsync";
import { BaseAssetId } from "fuels";
import { AssetId } from "fuels";
import dynamic from 'next/dynamic';

const contractId = contractIds.testContract;
const CreateProposal = dynamic(() => import('./createProposal'), {
  ssr: false,
});
const LandingPage = dynamic(() => import('./landingpage'), {
  ssr: false,
});
const hasContract = "true";
const hasPredicate = process.env.NEXT_PUBLIC_HAS_PREDICATE === "true";
const hasScript = process.env.NEXT_PUBLIC_HAS_SCRIPT === "true";

export default function Home() {
  const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();
  const [contract, setContract] = useState<TestContractAbi>();
 
  const [proposal, setProposal] = useState<number>();
  const [balance, setBalance] = useState<number>();
  const [userbalance, setUserBalance] = useState<number>();
  const [Uservote, setUserVote] = useState<number>();

  const [acceptancePercentage, setAcceptancePercentage] = useState<BigNumberish>(0);
  const [duration, setDuration] = useState<BigNumberish>(0);
  const [proposalTransaction, setProposalTransaction] = useState<{} | null>(null);
  

 
  /**
   * useAsync is a wrapper around useEffect that allows us to run asynchronous code
   * See: https://github.com/streamich/react-use/blob/master/docs/useAsync.md
   */
  useAsync(async () => {
    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
     
     
    }
  }, [wallet]);

  // eslint-disable-next-line consistent-return
  

 

  const tp =async () => {
    
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }
    console.log("jsejhdxhe");
    const { value } = await contract.functions.create_proposal(bn(10),bn(60), {

      amount: 1000,
      /// Asset Id of the coins to forward
      asset: {
        value: BaseAssetId
      },
  
      call_data: {arguments: bn(1),function_selector: bn(1),id :{value:"0x40c9ffebe3ac891bd5f279c1f41d7c1201384979e3bfec85ae44e3f87826dfc9"}},

      gas: bn(21000)
  }).call();
  console.log("jsejshamuu ");
 
  pcount();

  // await refreshWalletBalance?.();
  
    
  }
  const pcount =async () => {

    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
      const { value } = await testContract.functions.proposal_count().get();
      
      console.log(proposal);
      setProposal(value.toNumber());
     

  }}
  



  const deposit =async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const { value } = await contract.functions.deposit().callParams({
      forward: [10, BaseAssetId],
      gasLimit: 5000,
      }).call();

      
  }
 

  const withdraw =async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const { value } = await contract.functions.withdraw(bn(1)).call();
  }

  
  const construct =async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }
    const { value } = await contract.functions.constructor({value:"0x0000000000000000000000000000000000000000000000000000000000000000"}).call();
    console.log(value);
  }


  
  const vote =async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }
    const { value } = await contract.functions.vote(true,bn(7),bn(1)).call();
    console.log(value);
  }
 
  const execute =async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }
    const { value } = await contract.functions.execute(bn(1)).call();
    console.log(value);
  }

  const unLockvote =async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }
    const { value } = await contract.functions.unlock_votes(bn(1)).call();
    console.log(value);
  }

  const Balance =async () =>{
    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
      const {value} = await testContract.functions.balance().get();
      console.log(value);
      setBalance(value.toNumber());
     

  }
  }


  const asset_Id =async () =>{
    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
      const {value} = await testContract.functions.governance_asset_id().get();
      console.log(value);
      
     

  }
  }
  const Proposall =async () =>{
    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
      const {value} = await testContract.functions.proposal(bn(17)).get();
      console.log(value);
      
     

  }
  }
  



  return (
    <>
      
      <div className="flex gap-4 items-center">
        <FuelLogo />
        <h1 className="text-2xl font-semibold ali">Welcome to Fuel</h1>
      </div>
      <Button onClick={construct}>fndn</Button>
      {hasContract && (
        <span className="text-gray-400">
          Get started by editing <i>sway-programs/contract/main.sw</i> or{" "}
          <i>src/pages/index.tsx</i>.
        </span>
      )}

      <span className="text-gray-400">
        This template uses the new{" "}
        <Link href="https://fuellabs.github.io/fuels-ts/tooling/cli/fuels/">
          Fuels CLI
        </Link>{" "}
        to enable type-safe hot-reloading for your Sway programs.
      </span>

      {hasContract && (
        <>
        

          <span className="text-gray-400 text-6xl">{proposal}</span>

      <CreateProposal/>

          

       <Button onClick={deposit} className="mt-6">
         deposit
        </Button>

        <Button onClick={withdraw} className="mt-6">
         withdraw
        </Button>
        

        <Button onClick={vote} className="mt-6">
         Vote
        </Button>

        <Button onClick={execute} className="mt-6">
         execute
        </Button>

        <Button onClick={unLockvote} className="mt-6">
         UnLock Votes
        </Button>
        
        <Button onClick={Balance} className="mt-6">
       Balance
        </Button>

       
         <Button onClick={asset_Id} className="mt-6">
        Asset_Id
        </Button>


        <Button onClick={Proposall} className="mt-6">
      ProposalInfo
        </Button>

</>
      )}

      {hasPredicate && (
        <Link href="/predicate" className="mt-4">
          Predicate Example
        </Link>
      )}

      {hasScript && (
        <Link href="/script" className="mt-4">
          Script Example
        </Link>
      )}

      <Link href="https://docs.fuel.network" target="_blank" className="mt-12">
        Fuel Docs
      </Link>

    <div>
    <form >
     
      <div className="relative h-10 w-full min-w-[200px]">
    <input
      className="peer h-full w-full rounded-[7px] border border-green-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-500 placeholder-shown:border-t-green-500 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" " 
      type="number"
         
          onChange={(e) => setDuration(Number(e.target.value))}/>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-green-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Duration
    </label>
    </div>
    <br/>
    <div className="relative h-10 w-full min-w-[200px]">
    <input
      className="peer h-full w-full rounded-[7px] border border-green-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-500 placeholder-shown:border-t-green-500 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" " 
      type="BigNumberish"
     
      onChange={(e) => setAcceptancePercentage(Number(e.target.value))}/>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-green-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Acceptance Percentage
    </label>
    </div>
    <br/>
   
   
      {/* Input fields for other properties of the proposal */}
      <Button onClick={tp} className="mt-6">
          create Proposal
          </Button>
    </form>
    </div>

    </>
  );
  
}

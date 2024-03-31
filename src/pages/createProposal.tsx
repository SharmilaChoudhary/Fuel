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
import React from 'react'
  


const contractId = contractIds.testContract;


function CreateProposal() {
    const { wallet, walletBalance, refreshWalletBalance } = useActiveWallet();
    const [contract, setContract] = useState<TestContractAbi>();
    const hasContract = "true";

    useAsync(async () => {
    if (hasContract && wallet) {
      const testContract = TestContractAbi__factory.connect(contractId, wallet);
      setContract(testContract);
     
     
    }
  }, [wallet]);
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
    
    const createPropasals =async () => {
    
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

    
  }
    return (
        <>
            <div>
            <h1 className="text-2xl font-bold ali text-fuel-green">Craete Proposals with the asset you want</h1>
      </div>
      <button onClick={construct}>construct</button>
            <button onClick={createPropasals}>createProposal</button>
            </>
  )
}

export default CreateProposal

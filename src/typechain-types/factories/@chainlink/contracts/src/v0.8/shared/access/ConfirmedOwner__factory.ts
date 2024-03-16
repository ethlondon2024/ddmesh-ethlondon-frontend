/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../../../../common";
import type {
  ConfirmedOwner,
  ConfirmedOwnerInterface,
} from "../../../../../../../@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161045638038061045683398101604081905261002f9161016e565b8060006001600160a01b03821661008d5760405162461bcd60e51b815260206004820152601860248201527f43616e6e6f7420736574206f776e657220746f207a65726f000000000000000060448201526064015b60405180910390fd5b600080546001600160a01b0319166001600160a01b03848116919091179091558116156100bd576100bd816100c5565b50505061019e565b336001600160a01b0382160361011d5760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c660000000000000000006044820152606401610084565b600180546001600160a01b0319166001600160a01b0383811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b60006020828403121561018057600080fd5b81516001600160a01b038116811461019757600080fd5b9392505050565b6102a9806101ad6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806379ba5097146100465780638da5cb5b14610050578063f2fde38b1461006f575b600080fd5b61004e610082565b005b600054604080516001600160a01b039092168252519081900360200190f35b61004e61007d366004610243565b610131565b6001546001600160a01b031633146100da5760405162461bcd60e51b815260206004820152601660248201527526bab9ba10313290383937b837b9b2b21037bbb732b960511b60448201526064015b60405180910390fd5b60008054336001600160a01b0319808316821784556001805490911690556040516001600160a01b0390921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b610139610145565b6101428161019a565b50565b6000546001600160a01b031633146101985760405162461bcd60e51b815260206004820152601660248201527527b7363c9031b0b63630b1363290313c9037bbb732b960511b60448201526064016100d1565b565b336001600160a01b038216036101f25760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c6600000000000000000060448201526064016100d1565b600180546001600160a01b0319166001600160a01b0383811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b60006020828403121561025557600080fd5b81356001600160a01b038116811461026c57600080fd5b939250505056fea2646970667358221220bccb79c30a6f01fcb6d63d92ad33f8e48d9c0e80fe4c2112b3ed84c0177af96564736f6c63430008160033";

type ConfirmedOwnerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ConfirmedOwnerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ConfirmedOwner__factory extends ContractFactory {
  constructor(...args: ConfirmedOwnerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    newOwner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(newOwner, overrides || {});
  }
  override deploy(
    newOwner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(newOwner, overrides || {}) as Promise<
      ConfirmedOwner & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ConfirmedOwner__factory {
    return super.connect(runner) as ConfirmedOwner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ConfirmedOwnerInterface {
    return new Interface(_abi) as ConfirmedOwnerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ConfirmedOwner {
    return new Contract(address, _abi, runner) as unknown as ConfirmedOwner;
  }
}

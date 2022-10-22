import { createContext, useContext } from "react";
import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor";
import { MovieReviews, IDL } from "./movie_review";
import { Connection, PublicKey } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import MockWallet from "./MockWallet";


const WorkspaceContext = createContext({});
const programId = new PublicKey("3hy3VwhYp2b7BF46pij8GFvVMZ9bkjY4G7NdLXe4XeZc");

interface WorkspaceProps {
    connection?: Connection,
    provider? : AnchorProvider,
    program? : Program<MovieReviews>,
}

const WorkspaceProvider = ({ children }: any) => {

    const wallet = useAnchorWallet() || MockWallet;
    const {connection} = useConnection();

    const provider =  new AnchorProvider(connection, wallet, {});
    setProvider(provider);
    const program = new Program(IDL as Idl, programId);

    const workspace = {
        connection,
        provider,
        program
    }

    return (
        <WorkspaceContext.Provider value={workspace}>
            {children}
        </WorkspaceContext.Provider>
    )
};

const useWorkspace = () : WorkspaceProps => {
    return useContext(WorkspaceContext);
} 

export { WorkspaceProvider, useWorkspace }; 
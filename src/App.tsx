//@ts-ignore

import "./App.css";

import {DynamicContextProvider, DynamicWidget,} from "@dynamic-labs/sdk-react-core";

import {EthereumWalletConnectors} from "@dynamic-labs/ethereum";

import {DynamicWagmiConnector} from "@dynamic-labs/wagmi-connector";
import {createConfig, WagmiProvider} from "wagmi";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {http} from "viem";
import {arbitrumSepolia, mainnet} from "viem/chains";
import Routes from "@/Routes";
import {Toaster} from "./components/ui/toaster";
import DDMeshLogo from "./assets/ddmesh-logo-fixed.svg";
import {Link} from "react-router-dom";

const config = createConfig({
    chains: [mainnet, arbitrumSepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
        1: http(),
        421614: http(),
    },
});

const queryClient = new QueryClient();

function App() {

    return (
        <div className={"container"}>
            {/*@ts-ignore*/}
            <DynamicContextProvider
                settings={{
                    // Find your environment id at https://app.dynamic.xyz/dashboard/developer
                    environmentId: "95ae4a76-ade0-49e2-be66-46e32f2418df",
                    walletConnectors: [EthereumWalletConnectors],
                }}
            >
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <DynamicWagmiConnector>
                            <div className={"flex p-2 border-b-2 mb-8 items-center text-primary"}>
                                <Link to={"/"} className={"flex space-x-2 items-center"}>
                                    <img src={DDMeshLogo} className={"h-10"}/>
                                    <p className={"text-3xl"}>ddMesh</p>
                                </Link>
                                <div style={{marginLeft: "auto"}}>
                                    <DynamicWidget/>
                                </div>
                            </div>
                            <Routes/>
                            <Toaster/>
                        </DynamicWagmiConnector>
                    </QueryClientProvider>
                </WagmiProvider>
            </DynamicContextProvider>
        </div>
    );
}

export default App;

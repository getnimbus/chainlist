import { extraRpcs } from "./constants/extraRpcs.js";
import { writeFileSync } from "fs";

const ignoreList = [
  "bitstack",
  "rpcgator",
  "vefinetwork",
  "gateway.fm",
  "bsc-dataseed6",
  "diamondswap",
  "polysplit",
  "gasswap",
  "unifra.io",
  "rpc.payload.de",
  "linkpool.io",
  "elk.finance",
  "zmok.io",
  "koge-rpc",
  "builder0x69.io",
  "1rpc.io",
  "terminet.io",
  "radiumblock.co",
  "tatum.io",
  "decubate.com",
  "tenderly.co",
  "mainnet.optimism.io",
  "allnodes.com",
  "public.stackup.sh"
];

const suiNodes = [
  {
    name: "chainlist-sui-0",
    endpoint: "https://sui-mainnet.public.blastapi.io",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-1",
    endpoint: "https://sui-rpc.publicnode.com",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-2",
    endpoint: "https://sui-mainnet-endpoint.blockvision.org",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-3",
    endpoint: "https://wallet-rpc.mainnet.sui.io",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-4",
    endpoint: "https://rpc-mainnet.suiscan.xyz:443",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-5",
    endpoint: "https://mainnet.suiet.app",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-6",
    endpoint: "https://mainnet-rpc.sui.chainbase.online",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-7",
    endpoint: "https://fullnode.mainnet.sui.io",
    weight: 400,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-8",
    endpoint: "https://sui.blockpi.network/v1/rpc/public",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-9",
    endpoint: "https://fullnode.sui.mainnet.aftermath.finance/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-10",
    endpoint: "https://mainnet.suiet.app/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-11",
    endpoint: "https://rpc-mainnet.suiscan.xyz/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-12",
    endpoint: "https://api.shinami.com/node/v1/sui_mainnet_37685fe6a4ea7736d445816cb59b89e6",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-13",
    endpoint: "https://api.shinami.com/node/v1/sui_mainnet_bb70bc6a7d6d04694c4c719f0b6f27aa",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-14",
    endpoint: "https://enterprise.onerpc.com/sui?apikey=cf0b901f-7b0e-460b-a0cf-4c2f784c366d",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-15",
    endpoint: "https://sui-mainnet-rpc.nodereal.io/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
];

const nearNodes = [
  {
    name: "chainlist-near-0",
    endpoint: "https://rpc.mainnet.near.org",
    weight: 1000,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-1",
    endpoint: "https://1rpc.io/near",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-2",
    endpoint: "https://near.drpc.org",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-3",
    endpoint: "https://free.rpc.fastnear.com",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-4",
    endpoint: "https://near.lava.build",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-5",
    endpoint: "https://near.lavenderfive.com/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-6",
    endpoint: "https://endpoints.omniatech.io/v1/near/mainnet/public",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  // Delay older than 5 epochs or ~ 2.5 days
  // {
  //   name: "chainlist-near-7",
  //   endpoint: "https://archival-rpc.mainnet.near.org",
  //   weight: 100,
  //   read_only: false,
  //   disabled: false,
  // },
];

const solanaNodes = [
  {
    name: "chainlist-solana-0",
    endpoint: "https://api.mainnet-beta.solana.com",
    weight: 500,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-1",
    endpoint: "https://solana.api.onfinality.io/public",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-2",
    endpoint: "https://api.tatum.io/v3/blockchain/node/solana-mainnet",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-3",
    endpoint: "https://swr.xnftdata.com/rpc-proxy/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  // https://solana-mainnet.phantom.app/YBPpkkN4g91xDiAnTE9r0RcMkjg0sKUIWvAfoFVJ
];

const solanaDasNodes = [
  {
    name: "chainlist-solana-das-0",
    endpoint: "https://mainnet.helius-rpc.com/?api-key=287ca27d-96ce-4d78-9c13-ba98937e262a",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-1",
    endpoint: "https://mainnet.helius-rpc.com/?api-key=fc665902-8e03-4a6a-bd87-09576ebcb483",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-2",
    endpoint: "https://mainnet.helius-rpc.com/?api-key=3d9f0d50-6f41-4564-810b-a7b159eed30a",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-3",
    endpoint: "https://mainnet.helius-rpc.com/?api-key=8e6bc0dd-4c9b-44fb-b29a-974daa279f97",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-4",
    endpoint: "https://mainnet.helius-rpc.com/?api-key=a1b6dd29-bbd7-41d6-8ffa-f709ee2b6fd5",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-5",
    endpoint: "https://mainnet.helius-rpc.com/?api-key=b8d8caad-edb9-4175-957e-59031fd1325c",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-6",
    endpoint: "https://mainnet.helius-rpc.com/?api-key=db809365-c986-4e76-85a5-a02ed5b82091",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-7",
    endpoint: "https://mainnet.helius-rpc.com/?api-key=ce215dc6-42e3-494e-b92d-ca2f1ce957f4",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-8",
    endpoint: "https://mainnet.helius-rpc.com/?api-key=fa0ec5f3-578b-45c0-bc31-3b027cc19537",
    weight: 100,
    read_only: false,
    disabled: false,
  },
];

const solanaDasV2Nodes = [
  // {
  //   name: "chainlist-solana-das-v2-0",
  //   endpoint: "https://solana.a.exodus.io/",
  //   weight: 100,
  //   read_only: false,
  //   disabled: false,
  // },
  {
    name: "chainlist-solana-das-v2-1",
    endpoint: "https://rpc.ironforge.network/mainnet?apiKey=01HXRWYMVQN7ZA8M70JBXRG03R",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-v2-2",
    endpoint: "https://information.coin98.com/api/solanaV4",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-v2-3",
    endpoint: "https://cold-hanni-fast-mainnet.helius-rpc.com/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-v2-4",
    endpoint: "https://junior-felicia-fast-mainnet.helius-rpc.com/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-solana-das-v2-5",
    endpoint: "https://global-rpc.dexlab.space/v1/rpc",
    weight: 100,
    read_only: false,
    disabled: false,
  },
];

const nodes = Object.keys(extraRpcs).reduce(
  (prev, key) => {
    return {
      ...prev,
      [key]: extraRpcs[key].rpcs
        .map((item, index) => {
          return {
            name: `chainlist-${key}-${index}`,
            endpoint: item?.url ? item.url : item,
            weight: 100,
            read_only: false,
            disabled: false,
          };
        })
        .filter((row) => {
          return row.endpoint.includes("http") && ignoreList.every((keyword) => !row.endpoint.includes(keyword));
        }),
    };
  },
  {
    sui: suiNodes,
    near: nearNodes,
    solana: solanaNodes,
    "solana_das": solanaDasNodes,
    "solana_das_2": solanaDasV2Nodes,
  }
);

const config = {
  proxy: "",
  max_retries: 5,
  request_timeout: 120,
  phishing_db: ["https://cfg.rpchub.io/agg/scam-addresses.json"],
  phishing_db_update_interval: 3600,
  authority_db: [
    {
      name: "goplus",
      url: "https://cfg.rpchub.io/agg/goplus-db.json",
      enable: true,
    },
    {
      name: "slowmist",
      url: "https://cfg.rpchub.io/agg/slowmist-db.json",
      enable: true,
    },
  ],
  nodes: nodes,
};

writeFileSync("config.json", JSON.stringify(config, undefined, 2));
//   console.log(JSON.stringify(nodes, undefined, 2));

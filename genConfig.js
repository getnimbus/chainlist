import { extraRpcs } from "./constants/extraRpcs.js";
import { writeFileSync } from "fs";

const ignoreList = ["bitstack"];

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
    endpoint: "https://sui-mainnet.g.allthatnode.com/full/json_rpc",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-3",
    endpoint: "https://sui-mainnet-endpoint.blockvision.org",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-4",
    endpoint: "https://sui-mainnet-rpc.nodereal.io",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-5",
    endpoint: "https://sui-mainnet.nodeinfra.com/?apikey=hackathon",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-6",
    endpoint: "https://rpc-mainnet.suiscan.xyz:443",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-7",
    endpoint: "https://mainnet.suiet.app",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-8",
    endpoint: "https://mainnet-rpc.sui.chainbase.online",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-9",
    endpoint: "https://sui1mainnet-rpc.chainode.tech",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-sui-10",
    endpoint: "https://fullnode.mainnet.sui.io",
    weight: 300,
    read_only: false,
    disabled: false,
  },
];

const nearNodes = [
  {
    name: "chainlist-near-0",
    endpoint: "https://rpc.mainnet.near.org",
    weight: 300,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-1",
    endpoint: "https://near-mainnet.api.pagoda.co/rpc/v1",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-2",
    endpoint: "https://1rpc.io/near",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-3",
    endpoint: "https://near-mainnet-rpc.allthatnode.com:3030",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-4",
    endpoint: "https://rpc.ankr.com/near",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-5",
    endpoint: "https://public-rpc.blockpi.io/http/near",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-6",
    endpoint: "https://near.drpc.org",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-7",
    endpoint: "https://rpc.web4.near.page",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-8",
    endpoint: "https://free.rpc.fastnear.com",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-9",
    endpoint: "https://rpc.near.gateway.fm/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-10",
    endpoint: "https://getblock.io/nodes/near/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-11",
    endpoint: "https://near.lava.build",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-12",
    endpoint: "https://near.lavenderfive.com/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-13",
    endpoint: "https://nodereal.io/api-marketplace/near-rpc",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-14",
    endpoint: "https://near.nownodes.io/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-15",
    endpoint: "https://endpoints.omniatech.io/v1/near/mainnet/public",
    weight: 100,
    read_only: false,
    disabled: false,
  },
  {
    name: "chainlist-near-16",
    endpoint: "https://api.seracle.com/saas/baas/rpc/near/mainnet/public/",
    weight: 100,
    read_only: false,
    disabled: false,
  },
];

const solanaNodes = [
  {
    name: "chainlist-solana-0",
    endpoint: "https://api.mainnet-beta.solana.com",
    weight: 300,
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
          return row.endpoint.includes("http") && ignoreList.some((keyword) => !row.endpoint.includes(keyword));
        }),
    };
  },
  {
    sui: suiNodes,
    near: nearNodes,
    solana: solanaNodes,
  }
);

const config = {
  proxy: "",
  max_retries: 5,
  request_timeout: 60,
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

import { extraRpcs } from "./constants/extraRpcs.js";
import { writeFileSync } from "fs";

const ignoreList = ["bitstack"];

const suiNodes = [
  {
    "name": "chainlist-sui-0",
    "endpoint": "https://sui-mainnet.public.blastapi.io",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-1",
    "endpoint": "https://sui-rpc.publicnode.com",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-2",
    "endpoint": "https://sui-mainnet.g.allthatnode.com/full/json_rpc",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-3",
    "endpoint": "https://sui-mainnet-endpoint.blockvision.org",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-4",
    "endpoint": "https://sui-mainnet-rpc.nodereal.io",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-5",
    "endpoint": "https://sui-mainnet.nodeinfra.com/?apikey=hackathon",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-6",
    "endpoint": "https://rpc-mainnet.suiscan.xyz:443",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-7",
    "endpoint": "https://mainnet.suiet.app",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-8",
    "endpoint": "https://mainnet-rpc.sui.chainbase.online",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-9",
    "endpoint": "https://sui1mainnet-rpc.chainode.tech",
    "weight": 100,
    "read_only": false,
    "disabled": false
  },
  {
    "name": "chainlist-sui-10",
    "endpoint": "https://fullnode.mainnet.sui.io",
    "weight": 300,
    "read_only": false,
    "disabled": false
  }
];

const nodes = Object.keys(extraRpcs).reduce((prev, key) => {
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
        return row.endpoint.includes('http') && ignoreList.some((keyword) => !row.endpoint.includes(keyword));
      }),
  };
}, {"sui": suiNodes});

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

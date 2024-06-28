import { extraRpcs } from "./constants/extraRpcs.js";
import { writeFileSync } from "fs";

const ignoreList = ["bitstack"];

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
        return ignoreList.some((keyword) => !row.endpoint.includes(keyword));
      }),
  };
}, {});

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

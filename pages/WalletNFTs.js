import { useWalletNFTs } from "@quicknode/icy-nft-hooks";
import { useState } from "react";

function WalletNFTs() {
  const [ensName, setEnsName] = useState("vitalik.eth"); //vitalik.eth
  const [cursor, setCursor] = useState("");
  const { nfts, isSearchValid, pageInfo } = useWalletNFTs({
    ensName,
    first: 12,
    after: cursor,
  });

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="w-full h-full flex flex-col justify-start gap-5 items-center">
        <h1 className="text-7xl font-bold">NFT Gallery</h1>
        <h3 className="text-xl font-semibold">
          Powered by{" "}
          <a
            className="underline"
            href="https://developers.icy.tools/?utm_source=quicknode&utm_campaign=quicknode-header"
          >
            QuickNode's GraphQL NFT API
          </a>
        </h3>
      </div>
      <div className="flex-left flex-col mt-4">
        <label
          className="text-white text-2xl font-extrabold pb-2"
          htmlFor="wallet-address"
        >&nbsp
          ; Ethereum Name Service  &nbsp;
        </label>
        <div className="search">
          <input
            className="px-3 py-2 rounded-md"
            type="text"
            value={ensName}
            onChange={(e) => setEnsName(e.target.value)}
            style={{
              outlineColor:
                !isSearchValid && ensName.length > 0 ? "red" : undefined,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 mt-8 gap-4">
        {console.log(nfts)}
        {nfts.map((nft) => {
          const contract = nft.contract;
          console.log(contract);
          const imageUrl = nft.images.find((i) => !!i.url)?.url;

          return (
            <div
              className="flex flex-col rounded border p-4"
              key={`${nft.tokenId}${nft.contract.address}`}
            >
              <div className="w-full h-full rounded shadow flex justify-center items-center">
                <img
                  className="w-full h-full"
                  src={imageUrl ?? "/web3.png"}
                  alt="awesome nft"
                />
              </div>
              <div>
                <h1 className="font-bold">{contract.name}</h1>
                <h2 className="truncate">
                  {contract.symbol}#{nft.tokenId}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {pageInfo?.hasNextPage && (
        <div
          style={{
            alignItems: "flex-end",
            width: "100%",
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <button
            onClick={() => {
              setCursor(pageInfo.endCursor ?? undefined);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletNFTs;

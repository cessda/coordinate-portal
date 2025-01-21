// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getPaq(): any[][] {

  //@ts-expect-error - accessing global property
  if (!window["_paq"]) {
    //@ts-expect-error - accessing global property
    window["_paq"] = [];
  }

  //@ts-expect-error - accessing global property
  return window["_paq"];
}

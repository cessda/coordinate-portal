export default function getPaq(): any[][] {

  //@ts-ignore
  if (!window["_paq"]) {
    //@ts-ignore
    window["_paq"] = [];
  }

  //@ts-ignore
  return window["_paq"];
}

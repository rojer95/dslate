import { ConfigContext } from "@dslate/core";
import { useContext, useEffect } from "react";

const inited: string[] = [];

type IconProps = {
  type: string;
  [index: string]: any;
};

const Icon = (props: IconProps) => {
  const { iconScriptUrl } = useContext(ConfigContext);

  const initScript = () => {
    let urls: any = iconScriptUrl;
    if (typeof urls === "string") urls = [urls];

    for (const url of urls) {
      if (inited.includes(url)) continue;
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = url;
      document.head.appendChild(script);
      inited.push(url);
    }
  };

  useEffect(() => {
    initScript();
  }, [iconScriptUrl]);

  return (
    <svg
      style={{
        width: "1em",
        height: "1em",
        verticalAlign: "-0.15em",
        fill: "currentColor",
        overflow: "hidden",
        ...(props?.style ?? {}),
      }}
    >
      <use xlinkHref={`#${props.type}`}></use>
    </svg>
  );
};

export { Icon };

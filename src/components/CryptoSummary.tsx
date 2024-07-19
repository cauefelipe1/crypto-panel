import { CryptoModel } from "../models/Crypto";

export type Props = {
    crypto: CryptoModel
}

export default function CryptoSummary({crypto} : Props) : JSX.Element {
    return (<p>{crypto.name + " $" + crypto.current_price}</p>);
}

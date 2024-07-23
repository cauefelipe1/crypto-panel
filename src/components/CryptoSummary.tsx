import { useState } from "react";
import { CryptoModel } from "../models/Crypto";
import { InputNumber } from "primereact/inputnumber"

export type Props = {
    crypto: CryptoModel
}

export default function CryptoSummary({crypto} : Props) : JSX.Element {
    const [amount, setAmount] = useState(1000);

    return (
        <div>
            <span>{crypto.name + " $" + crypto.current_price}</span>

            <InputNumber
                className="crypto-summary-input"
                value={amount}
                mode="decimal"
                showButtons
                step={1}
                onChange={(e) => setAmount(e.value ?? 0)}
            />
            <p>$ {(crypto.current_price * amount).toLocaleString(undefined, {minimumFractionDigits: 2 , maximumFractionDigits: 2})}</p>
        </div>
    );
}

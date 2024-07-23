import { useEffect, useState } from "react";
import { CryptoModel } from "../models/Crypto";
import { InputNumber } from "primereact/inputnumber"

export type Props = {
    crypto: CryptoModel;
    updateOwner: (crypto: CryptoModel, amount: number) => void;
}

export default function CryptoSummary({crypto, updateOwner} : Props) : JSX.Element {
    const [amount, setAmount] = useState(1000);

    useEffect(function initialOwnerUpdate() {
        updateOwner(crypto, amount);
    }, []);

    return (
        <div>
            <span>{crypto.name + " $" + crypto.current_price}</span>

            <InputNumber
                className="crypto-summary-input"
                value={amount}
                mode="decimal"
                showButtons
                step={1}
                onChange={(e) => {
                    const amt = e.value ?? 0
                    setAmount(amt);
                    updateOwner(crypto, amt);
                }}
            />
            <p>$ {(crypto.current_price * amount).toLocaleString(undefined, {minimumFractionDigits: 2 , maximumFractionDigits: 2})}</p>
        </div>
    );
}

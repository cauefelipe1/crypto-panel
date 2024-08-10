import { useState } from "react";
import "./QuickCryptoAmountSelector.scss";
import { Slider } from "primereact/slider";

export default function QuickCryptoAmountSelector() {
    const [value, setValue] = useState(0.0);
    return (
        <div className="quick-crypto-amount-selector-container">
            <div className="coin-reference">
                <div className="coin-correlation-reference">
                    1 ETH = $1,473.19
                </div>

                <div className="from-to-reference">
                    ETH == USD
                </div>
            </div>

            <div className="slider">
                <Slider value={value} onChange={(e: any) => setValue(e.value)} step={25} />
            </div>
            
        </div>
    );
}
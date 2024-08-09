import "./CryptoConversionInput.scss";

import { Dropdown } from "primereact/dropdown";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";

export default function CryptoConversionInput(){
    const cryptoOptions = ["A", "B", "C", "D"];

    const [fromAmount, setFromAmount] = useState<Nullable<number>>(0.0);
    const [selectedCrypto, setSelectedCrypto] = useState<string>();

    const cryptoOptionTemplate = (option: any) => {
        return (
            <div>
                <img 
                    alt={option.name}
                    src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                    className="crypto-select-option" />
                
                <div>{option.name}</div>
            </div>
        );
    };

    const selectedCryptoTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div className="crypto-select-option" >
                    <img
                        alt={option.name}
                        src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                         
                    />
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };


    return (
        <div className="crypto-conversion-input-container">
            <span className="dropdown-component">
                <Dropdown
                    className="dropdown"
                    options={cryptoOptions}
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.value)}
                    itemTemplate={cryptoOptionTemplate}
                    valueTemplate={selectedCryptoTemplate}
                />
            </span>

            <span className="input-component">
                <InputNumber 
                    inputClassName="input"
                    value={fromAmount}
                    onValueChange={(e: InputNumberValueChangeEvent) => setFromAmount(e.value)}
                    minFractionDigits={2}
                    maxFractionDigits={3}/>
            </span>
        </div>
    );
}
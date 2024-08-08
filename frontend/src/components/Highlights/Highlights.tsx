import "./Highlights.scss";

import UserSummary from "../User/UserSummary";
import QuickExchange from "../QuickExchange/QuickExchange";

export default function Highlights(){
    return (
        <div className="highlights-container">
            <UserSummary />

            <QuickExchange />

        </div>
    );
}
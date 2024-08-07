import "./UserSummary.scss";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

export default function UserSummary() {
    return (
        <div className="user-summary-container">
            
            <div className="user-data">
                
                <div className="user-avatar">
                    <Avatar
                        shape="circle"
                        size="xlarge"
                        image="https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg"
                    />
                </div>

                <div>
                    <div className="user-name">
                        <p>Marvin McKinney</p>
                    </div>

                    <div className="user-email">
                        marvin@gmail.com
                    </div>
                </div>

            </div>

            <div className="notifications">
            
                <Button 
                    rounded
                    text
                    icon="pi pi-bell"
                    size="large">
                        <Badge value={2} severity="danger" />
                </Button>
            </div>
        </div>
    );
}
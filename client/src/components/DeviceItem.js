import React from "react";
import {Card, Col, Image} from "react-bootstrap";
import star from "../image/star.png";
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../utilits/consts";

export const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <Col md={3} className={'mt-3'} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: "pointer",}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL+device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-content-center">
                    <div className="d-flex align-items-center">Samsung..</div>
                    <div>{device.rating}
                        <Image width={17} height={17} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>

    )
}


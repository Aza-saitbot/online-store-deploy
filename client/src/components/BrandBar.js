import React, {useContext} from "react";
import {Context} from "../index";
import {Card, ListGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";


export const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Row className="d-flex">
            {device.brands.map(brand =>
            <Card key={brand.id}
            className="p-2"
                  style={{cursor:"pointer"}}
                  onClick={()=>device.setSelectedBrand(brand)}
                  border={brand.id === device.selectedBrand.id ? 'danger':'light'}
            >
                {brand.name}
            </Card>
            )}

        </Row>
    )
})


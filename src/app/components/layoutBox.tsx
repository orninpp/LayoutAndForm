import React, { useState } from 'react';
import { Button, Flex } from 'antd'
import { Col, Divider, Row } from 'antd';
import { CaretLeftFilled, CaretUpFilled, CaretDownFilled, CaretRightFilled } from '@ant-design/icons'
import Image from 'next/image';

interface LanguageSwitcherProps {
    layoutText: string;
    movePosition: string;
    moveShape: string;
}


const LayoutBox: React.FC<LanguageSwitcherProps> = ({ layoutText, movePosition, moveShape }) => {
    const shapeButtonStyle = {
        height: '110px',
        width: '210px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
    };

    const shapes = [
        { src: "/images/stop.png", alt: "square" },
        { src: "/images/oval.png", alt: "oval" },
        { src: "/images/circle.png", alt: "circle" },
        { src: "/images/trapezium.png", alt: "trapezium" },
        { src: "/images/tool.png", alt: "tool" },
        { src: "/images/parallelogram.png", alt: "parallelogram" }
    ];

    const [shapePositions, setShapePositions] = useState(shapes);
    const [changeRow, setChangeRow] = useState(0);

    const moveShapesLeft = () => {
        const newPositions = [...shapePositions];
        const firstShape = newPositions.shift();
        if (firstShape) {
            newPositions.push(firstShape);
        }
        setShapePositions(newPositions);
    };

    const moveShapesRight = () => {
        const newPositions = [...shapePositions];
        const lastShape = newPositions.pop();
        if (lastShape) {
            newPositions.unshift(lastShape);
        }
        setShapePositions(newPositions);
    };

    const shufflePositions = () => {
        const shuffled = [...shapePositions].sort(() => Math.random() - 0.5);
        setShapePositions(shuffled);
    };

    const moveRow = () => {
        if (changeRow == 1) {
            setChangeRow(0)
        } else {
            setChangeRow(1)
        }
    }

    const rows = [];
    const itemsPerRow = 3;
    for (let i = 0; i < shapePositions.length; i += itemsPerRow) {
        rows.push(shapePositions.slice(i, i + itemsPerRow));
    }

    return (
        <div>
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>{layoutText}</p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center" align="middle">
                <Col>
                    <Button
                        style={{ border: 'none', height: '110px', width: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        icon={<CaretLeftFilled style={{ fontSize: '100px' }} />}
                        onClick={moveShapesLeft}
                    />
                    <p style={{ textAlign: 'center', translate: '0px -10px' }}><span style={{ backgroundColor: 'lightgreen', color: '#fff', padding: '5px', fontSize: '12px', borderRadius: '20px' }}>{moveShape}</span></p>
                </Col>
                <Col>
                    <Button
                        style={{ border: 'none', height: '110px', width: '420px', display: 'flex', alignItems: 'center' }}
                        onClick={moveRow}
                    >
                        <CaretUpFilled style={{ fontSize: '100px', marginRight: '50px' }} />
                        <CaretDownFilled style={{ fontSize: '100px', marginLeft: '50px' }} />
                    </Button>
                    <p style={{ textAlign: 'center', translate: '0px -10px' }}><span style={{ backgroundColor: 'lightgreen', color: '#fff', padding: '5px', fontSize: '12px', borderRadius: '20px' }}>{movePosition}</span></p>
                </Col>
                <Col>
                    <Button
                        style={{ border: 'none', height: '110px', width: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        icon={<CaretRightFilled style={{ fontSize: '100px' }} />}
                        onClick={moveShapesRight}
                    />
                    <p style={{ textAlign: 'center', translate: '0px -10px' }}><span style={{ backgroundColor: 'lightgreen', color: '#fff', padding: '5px', fontSize: '12px', borderRadius: '20px' }}>{moveShape}</span></p>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={4}></Col>
                <Col span={16}>{rows.map((row, rowIndex) => (
                    <Row key={rowIndex} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={rowIndex === changeRow ? "end" : "start"}>
                        {row.map((shape, index) => (
                            <Col key={index}>
                                <Button style={shapeButtonStyle} onClick={shufflePositions}>
                                    <Image src={shape.src} alt={shape.alt} width={100} height={100} />
                                </Button>
                            </Col>
                        ))}
                    </Row>
                ))}</Col>
                <Col span={4}></Col>
            </Row>

        </div>
    )
}

export default LayoutBox

import React, { useState } from 'react';
import { Button, Flex } from 'antd'
import { Col, Divider, Row } from 'antd';

interface LanguageSwitcherProps {
    layoutText: string;
    movePosition: string;
    moveShape: string;
}

const shapeStyles: { [key: string]: React.CSSProperties } = {

    square: {
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    oval: {
        width: '150px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: '50%',
    },
    circle: {
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: '50%',
    },
    trapezoid: {
        borderBottom: '100px solid grey',
        borderLeft: '50px solid transparent',
        borderRight: '50px solid transparent',
        height: '0',
        width: '200px',
    },
    tool: {
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    parallelogram: {
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        transform: 'skew(20deg)',
    },
};


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
        { styleShape: shapeStyles.square },
        { styleShape: shapeStyles.oval },
        { styleShape: shapeStyles.circle },
        { styleShape: shapeStyles.trapezoid },
        { styleShape: shapeStyles.tool },
        { styleShape: shapeStyles.parallelogram }
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
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{layoutText}</p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center" align="middle">
                <Col>
                    {/* <Button
                        style={{ border: 'none', height: '110px', width: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        icon={<CaretLeftFilled style={{ fontSize: '100px' }} />}
                        onClick={moveShapesLeft}
                    /> */}
                    <Button style={{ border: 'none', height: '110px', width: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={moveShapesLeft}>
                        <div style={{
                            width: '0',
                            height: '0',
                            borderTop: '40px solid transparent',
                            borderRight: '75px solid grey',
                            borderBottom: '40px solid transparent'
                        }}>
                        </div>
                    </Button>
                    <p style={{ textAlign: 'center', translate: '0px -10px' }}><span style={{ backgroundColor: 'lightgreen', color: '#fff', padding: '5px', fontSize: '12px', borderRadius: '20px' }}>{moveShape}</span></p>
                </Col>
                <Col>
                    <Button
                        style={{ border: 'none', height: '110px', width: '420px', display: 'flex', alignItems: 'center' }}
                        onClick={moveRow}
                    >
                        {/* <CaretUpFilled style={{ fontSize: '100px', marginRight: '50px' }} />
                        <CaretDownFilled style={{ fontSize: '100px', marginLeft: '50px' }} /> */}
                        <div
                            style={{
                                width: '0',
                                height: '0',
                                borderLeft: '40px solid transparent',
                                borderRight: '40px solid transparent',
                                borderBottom: '80px solid grey',
                                marginRight: '50px'
                            }}>
                        </div>
                        <div
                            style={{
                                width: '0',
                                height: '0',
                                borderLeft: '40px solid transparent',
                                borderRight: '40px solid transparent',
                                borderTop: '80px solid grey',
                                marginLeft: '50px'
                            }}>
                        </div>
                    </Button>
                    <p style={{ textAlign: 'center', translate: '0px -10px' }}><span style={{ backgroundColor: 'lightgreen', color: '#fff', padding: '5px', fontSize: '12px', borderRadius: '20px' }}>{movePosition}</span></p>
                </Col>
                <Col>
                    <Button
                        style={{ border: 'none', height: '110px', width: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={moveShapesRight}
                    >
                        <div style={{
                            width: '0',
                            height: '0',
                            borderTop: '40px solid transparent',
                            borderLeft: '75px solid grey',
                            borderBottom: '40px solid transparent',
                        }}>
                        </div>
                    </Button>
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
                                    <div style={shape.styleShape}></div>
                                </Button>
                            </Col>
                        ))}
                    </Row>
                ))}</Col>
                <Col span={4}></Col>
            </Row>

        </div >
    )
}

export default LayoutBox

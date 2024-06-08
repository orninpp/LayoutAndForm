import { Col, Row } from 'antd'
import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height: '100vh'}}>
        <Row  gutter={24}> 
            <Col className="gutter-row" span={12} style={{padding:'8px'}}>
                <Link href="/Test1">
                    <div  style={{backgroundColor: '#fff',padding: '10px', width: '200px', height:'100px'}}>test1</div>
                </Link>
            </Col>
            <Col className="gutter-row" span={12} style={{padding:'8px'}}>
                <Link href="/Test2">
                    <div  style={{backgroundColor: '#fff',padding: '10px', width: '200px', height:'100px'}}>test2</div>
                </Link>
            </Col>
        </Row>
    </div>
  )
}

export default Navigation

"use client"
import { Col, Row } from 'antd'
import Link from 'next/link'
import React, { ChangeEvent, useState, useEffect } from 'react';
import i18next from '../i18n';


const Navigation = () => {
    const [text, setText] = useState({
        layout: '',
        formHeader: '',
        en: '',
        th: '',
        title1: '',
        title2: ''
    });

    useEffect(() => {
        setText({
            layout: i18next.t('layoutPage.layout'),
            formHeader: i18next.t('formPage.formHeader'),
            en: i18next.t('language.en'),
            th: i18next.t('language.th'),
            title1: i18next.t('firstPage.title1'),
            title2: i18next.t('firstPage.title2'),
        });
    }, []);

    const changeLanguage = (language: string) => {
        i18next.changeLanguage(language);
        setText({
            layout: i18next.t('layoutPage.layout'),
            formHeader: i18next.t('formPage.formHeader'),
            en: i18next.t('language.en'),
            th: i18next.t('language.th'),
            title1: i18next.t('firstPage.title1'),
            title2: i18next.t('firstPage.title2'),
        });
    };

    const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
    };

    useEffect(() => {
        if (selectedLanguage === 'English') {
            changeLanguage('en');
        } else {
            changeLanguage('th');
        }
    }, [selectedLanguage]);
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <select style={{margin: "1rem"}} name="selectLang" id="selectLang" onChange={handleChange} value={selectedLanguage}>
                    <option value="English">{text.en}</option>
                    <option value="Thai">{text.th}</option>
                </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Row gutter={24}>
                    <Col className="gutter-row" span={12} style={{ padding: '8px' }}>
                        <Link href="/Test1">
                            <div style={{ backgroundColor: '#fff', padding: '10px', width: '200px', height: '100px' }}>
                                <div>
                                    {text.title1}
                                </div>
                                <div style={{ marginTop: '2rem'}}>
                                    {text.layout}
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col className="gutter-row" span={12} style={{ padding: '8px' }}>
                        <Link href="/Test2">
                            <div style={{ backgroundColor: '#fff', padding: '10px', width: '200px', height: '100px' }}>
                                <div >
                                    {text.title2}
                                </div>
                                <div style={{ marginTop: '2rem'}}>
                                    {text.formHeader}
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Navigation

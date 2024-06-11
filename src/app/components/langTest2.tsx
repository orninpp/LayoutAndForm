"use client";
import React, { ChangeEvent, useState, useEffect } from 'react';
import i18next from '../i18n';
import { Button, Col, Row } from 'antd';
import Link from 'next/link';
import FormComponent from './form';
import { Provider } from 'react-redux';
import store from '../Test2/store';
export interface FormComponentProps {
    formHeader: string;
    title: string;
    Mr: string;
    Mrs: string;
    Ms: string;
    name: string;
    firstname: string;
    lastname: string;
    birthday: string;
    nationality: string;
    thai: string;
    french: string;
    american: string;
    citizenID: string;
    gender: string;
    male: string;
    female: string;
    unisex: string;
    phone: string;
    passport: string;
    salary: string;
    reset: string;
    submit: string;
    manage: string;
    selectAll: string;
    edit: string;
    deleted: string;
    prev: string;
    next: string;
    home: string;
}

const LanguageSwitcherTest2: React.FC = () => {
    const [text, setText] = useState({
        formHeader: "",
        title: "",
        Mr: "",
        Mrs: "",
        Ms: "",
        name: "",
        firstname: "",
        lastname: "",
        birthday: "",
        nationality: "",
        thai: "",
        french: "",
        american: "",
        citizenID: "",
        gender: "",
        male: "",
        female: "",
        unisex: "",
        phone: "",
        passport: "",
        salary: "",
        reset: "",
        submit: "",
        manage: "",
        home: "",
        selectAll: "",
        edit: "",
        deleted: "",
        prev: "",
        next: "",
    });
    const [lng, setLng] = useState({
        en: '',
        th: '',
      })

    useEffect(() => {
        setText(i18next.t('formPage', { returnObjects: true }));
        setLng(i18next.t('language', { returnObjects: true }));
    }, []);

    const changeLanguage = (language: string) => {
        i18next.changeLanguage(language);
        setText(i18next.t('formPage', { returnObjects: true }));
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
            <Row style={{  justifyContent: 'end' }}>
                <Col>
                    <select name="selectLang" id="selectLang" onChange={handleChange} value={selectedLanguage}>
                        <option value="English">{lng.en}</option>
                        <option value="Thai">{lng.th}</option>
                    </select>
                </Col>
            </Row>

            <Provider store={store}>
                <FormComponent formHeader={text.formHeader}
                    title={text.title}
                    Mr={text.Mr}
                    Mrs={text.Mrs}
                    Ms={text.Ms}
                    name={text.name}
                    firstname={text.firstname}
                    lastname={text.lastname}
                    birthday={text.birthday}
                    nationality={text.nationality}
                    thai={text.thai}
                    french={text.french}
                    american={text.american}
                    citizenID={text.citizenID}
                    gender={text.gender}
                    male={text.male}
                    female={text.female}
                    unisex={text.unisex}
                    phone={text.phone}
                    passport={text.passport}
                    salary={text.salary}
                    reset={text.reset}
                    submit={text.submit}
                    manage={text.manage}
                    selectAll={text.selectAll}
                    edit={text.edit}
                    deleted={text.deleted}
                    prev={text.prev}
                    next={text.next}
                    home={text.home} />
            </Provider>

            {/* <LayoutBox layoutText={ext.layout} movePosition={helloText.moveposition} moveShape={helloText.moveshape} /> */}
        </div>
    );
};

export default LanguageSwitcherTest2;

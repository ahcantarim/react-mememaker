import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Templates, Form, Body } from './styles';

import { Input, Tooltip, Space, Divider, Button } from 'antd';
import { Row, Col } from 'antd';
import { UndoOutlined, ExperimentOutlined } from '@ant-design/icons';

export default function Home() {

    // * ATENÇÃO: Alterar credenciais para imgflip de acordo com seu cadastro:
    const imgflipUsername = "vikayel543";
    const imgflippassword = "vikayel543";

    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [boxes, setBoxes] = useState([]);
    const [generatedMeme, setGeneratedMeme] = useState(null);

    useEffect(() => {
        (async () => {
            const resp = await fetch('https://api.imgflip.com/get_memes');
            const { data: { memes } } = await resp.json();
            setTemplates(memes);
        })();
    }, []);

    // currying => função que retorna outra função
    const handleInputChange = (index) => (e) => {
        const newValues = boxes;
        newValues[index] = e.target.value;
        setBoxes(newValues);
    };

    function handleSelectTemplate(template) {
        setSelectedTemplate(template);
        setBoxes([]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const params = qs.stringify({
            template_id: selectedTemplate.id,
            username: imgflipUsername,
            password: imgflippassword,
            boxes: boxes.map(text => ({ text }))
        });

        const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`);
        const { data: { url } } = await resp.json();

        setGeneratedMeme(url);
    }

    function handleReset() {
        setSelectedTemplate(null);
        setBoxes([]);
        setGeneratedMeme(null);
    }

    return (
        <Body>
            {!generatedMeme && (
                <>
                    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>First, select an existing template</Divider>
                    <Row>
                        <Col span={24}>
                            <Templates>
                                {templates.map((template) => (
                                    <Tooltip
                                        title={template.name}
                                        key={template.id}>
                                        <button
                                            type="button"
                                            onClick={() => handleSelectTemplate(template)}
                                            className={template.id === selectedTemplate?.id ? 'selected' : ''}>
                                            <img src={template.url} alt={template.name} />
                                        </button>
                                    </Tooltip>
                                ))}
                            </Templates>
                        </Col>
                    </Row>

                    {selectedTemplate && (
                        <>
                            <Divider orientation="left">Then, fill <strong>{selectedTemplate.box_count} boxes</strong> bellow, required for "<strong>{selectedTemplate.name}</strong>"</Divider>
                            <Row>
                                <Col span={24}>
                                    <form onSubmit={handleSubmit}>
                                        <Space direction="vertical">
                                            {(new Array(selectedTemplate.box_count)).fill('').map((_, index) => (
                                                <Input
                                                    required
                                                    allowClear="true"
                                                    key={String(Math.random())}
                                                    size="large"
                                                    placeholder={`Value #${index + 1}`}
                                                    onChange={handleInputChange(index)} />
                                            ))}

                                            <Button
                                                block
                                                htmlType="submit"
                                                type="primary"
                                                size="large"
                                                icon={<ExperimentOutlined />}>Try this</Button>
                                        </Space>
                                    </form>
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            )
            }

            {
                generatedMeme && (
                    <>
                        <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>Enjoy the result</Divider>
                        <Row>
                            <Col span={24}>
                                <Space direction="vertical">
                                    <img src={generatedMeme} alt="Generated meme" />
                                    <Button
                                        block
                                        type="primary"
                                        size="large"
                                        onClick={handleReset}
                                        icon={<UndoOutlined />}>Start over</Button>
                                </Space>
                            </Col>
                        </Row>
                    </>
                )
            }

        </Body >
    );
}
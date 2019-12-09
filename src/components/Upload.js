import React from 'react';
import { Card, Form, Upload, Button, Icon, message } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import { withRouter } from 'react-router'

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { fileList } = this.state;
        console.log(fileList);
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        axios({
            url: 'http://localhost:5000/upload',
            method: 'post',
            processData: false,
            data: formData
        }).then((res) => {
            console.log(res);
            this.setState({
                fileList: [],
                uploading: false,
            });
            message.success('upload successfully.');
            this.props.history.push('/result')
        }).catch(function (error) {
            if (error.response) {
                message.error('upload failed.');
            }
        })
    };


    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                console.log(this.state.fileList);
                return false;
            },
        };
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <Grid className="upload-form">
                    <Row>
                        <Col xsOffset={3} xs={6}>
                            <Card title="File Upload" className="upload-card">
                                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                    <Form.Item label="Note d'information" className="field-name">
                                        <Upload {...props} multiple={false}>
                                            <Button>
                                                <Icon type="upload" /> Select File
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item label="Note en réponse" className="field-name">
                                        <Upload {...props}>
                                            <Button>
                                                <Icon type="upload" /> Select File
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item label="Note de conformité" className="field-name">
                                        <Upload {...props}>
                                            <Button>
                                                <Icon type="upload" /> Select File
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ span: 12, offset: 6 }} >
                                        <Button type="primary" htmlType="submit" className="submit-btn" disabled={fileList.length === 0} loading={uploading}>
                                            {uploading ? 'Uploading' : 'Start Upload'}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const UploadFiles = Form.create({ name: 'files_form' })(UploadForm);

export default withRouter(UploadFiles);
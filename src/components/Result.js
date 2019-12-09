import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Button, Icon, message, List, Radio, Card, Input } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import * as data from '../nlu-result.json';
import { regExpLiteral } from '@babel/types';

const { TabPane } = Tabs;
const operations = <Button>Export</Button>;

class ResultTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            regex: [],
            qa: [],
            classif: [],
            valueqa: "",
            valueclassif: ["", "", ""],
        };
    }

    componentWillMount() {
        const result = data.default;
        var newregex = [];
        var newqa = [];
        var newclassif = [];
        result.forEach(element => {
            if (element.treatement_type == "regex") {
                newregex.push(element);
            }
            if (element.treatement_type == "Q&A") {
                newqa.push(element);
            }
            if (element.treatement_type == "classification") {
                element.prababilities.sort(function (a, b) {
                    return a.probability - b.probability;
                });
                newclassif.push(element);

            }
            console.log(newclassif);
            this.setState({ regex: newregex, qa: newqa, classif: newclassif })
        });

    }

    onChangeQA = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            valueqa: e.target.value,
        });
    };

    onChangeClassif = (e, index) => {
        console.log(index);
        console.log(this.state.valueclassif);
        console.log('radio checked', e.target.value);
        const newClassif = this.state.valueclassif.slice();
        newClassif[index] = e.target.value;
        this.setState({valueclassif: newClassif}, function(){
            console.log(this.state.valueclassif);
        })
    };

    render() {
        const { regex, qa, classif } = this.state;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <Grid className="result-grid">
                <Row>
                    <Col xs={12}>
                        <Tabs tabBarExtraContent={operations}>
                            <TabPane tab="Regex" key="1">
                                <List
                                    className="list-regex"
                                    dataSource={regex}
                                    renderItem={item => (
                                        <List.Item>
                                            <span>{item.name} :</span>
                                            <span className="regex-value">{item.value}</span>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="Q&A" key="2">
                                <Grid>
                                    {qa.map((elt, i) => {
                                        var most_probable = elt.prababilities.slice(0, 3);
                                        return (
                                            <Row className="qa-div"  key={i}>
                                                <Col xs={5}>
                                                    <p className="qa-value">{elt.name}</p>
                                                    <Radio.Group onChange={this.onChangeQA} value={this.state.valueqa}>
                                                        {
                                                            most_probable.map((proba, i) => {
                                                                return (
                                                                    <Radio style={radioStyle} value={elt.name + proba.text} key={i} className="qa-radio">
                                                                        {proba.text + " (confidence: "+ Math.round(proba.probability * 1000) / 1000 + ")"}
                                                                    </Radio>
                                                                )
                                                            })
                                                        }
                                                        <Radio className="qa-radio" style={radioStyle} value={elt.name + "other"}>
                                                            Other
                                                            {this.state.valueqa.indexOf("other") > -1 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                                                        </Radio>
                                                    </Radio.Group>
                                                </Col>
                                                <Col xsOffset={1} xs={6}>
                                                    <Card title="Corresponding paragraph">
                                                        <p>{elt.data}</p>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                </Grid>
                            </TabPane>
                            <TabPane tab="Classification" key="3">
                                <Grid>
                                    {classif.map((elt, i) => {
                                        var most_probable = elt.prababilities;
                                        return (
                                            <Row className="classif-div"  >
                                                <Col xsOffset={1} xs={3}>
                                                    <p className="classif-value">{elt.name}</p>
                                                    <Radio.Group onChange={(e) => this.onChangeClassif(e, i)} value={this.state.valueclassif[i]}>
                                                        {
                                                            most_probable.map((proba, i) => {
                                                                if (i == 1) {
                                                                    return (
                                                                        <Radio style={radioStyle} value={elt.name + proba.category} key={i}>
                                                                            {proba.category + " (confidence: " + Math.round(proba.probability * 100) / 100 + ")"} 
                                                                            <Icon type="check" style={{ color: '#52c41a' }} className="prediction" />
                                                                        </Radio>
                                                                        
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <Radio style={radioStyle} value={elt.name + proba.category} key={i}>
                                                                            {proba.category + " (confidence: " + Math.round(proba.probability * 100) / 100 + ")"} 
                                                                        </Radio>
                                                                        
                                                                    )
                                                                }


                                                            })
                                                        }
                                                    </Radio.Group>
                                                </Col>
                                                <Col xsOffset={1} xs={6}>
                                                    <Card title="Corresponding paragraph">
                                                        <p>{elt.data}</p>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                </Grid>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Grid >
        )
    }
}

export default ResultTable;
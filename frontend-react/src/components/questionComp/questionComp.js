import React, { Component } from 'react';
import styles from './questionComp.module.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

export default class QuestionComponent extends Component {
    
    render(){
        let enableButton = false;
        if(this.props.answer !== ''){
            enableButton = true
        }
        return (
            <div className={styles.questionComp}>
                {this.props.number}. {this.props.question}
            <div className={styles.radioButtons}>
                <RadioGroup aria-label="answer" name="answer1" value={this.props.answer} onChange={this.props.handleChange}>
                    <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
                </RadioGroup>
            </div>
            <div className={styles.button}>
                {enableButton ? 
                                <Button variant="contained" color="primary" onClick={this.props.nextClicked}>Next </Button> :
                                <Button variant="contained" color="primary" disabled>Next </Button> }
            </div>
            </div>
        )
    }
}
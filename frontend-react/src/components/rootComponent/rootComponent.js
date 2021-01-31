import React, { Component } from 'react';
import styles from './rootComponent.module.css';
import UserDetailsComp from '../userDetailsComp/userDetailsComp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addUser, getQuestions, submitResponse, getCoverage} from '../../actions/action';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import QuestionComponent from '../questionComp/questionComp';
import _ from 'lodash';
import Button from '@material-ui/core/Button';

class RootComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userDOB: '',
            userAddress: '',
            userDetailsSubmitted: false,
            questionsSubmitted: false,
            showSnack: false,
            currentQuestion: "",
            answer: '',
            index: '',
            totalQuestions: 0,
            getCoverageClicked: false
        };
      }
    
    componentDidMount() {
        this.props.getQuestions();
    }

    componentDidUpdate(prevProps) {
        if(!_.isEqual(prevProps.questions, this.props.questions)){
            const question = this.props.questions[0].question
            this.setState({
                index: 1,
                currentQuestion: question,
                questionId: this.props.questions[0].id,
                totalQuestions: this.props.questions.length
            })
        }
    }
    saveName = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    saveDOB = (event) => {
        this.setState({
            userDOB: event.target.value
        })
    }

    saveAddress = (event) => {
        this.setState({
            userAddress: event.target.value
        })
    }

    userDetailsSubmit = () => {
        const payload = {userName: this.state.userName,
        address: this.state.userAddress,
        dob: this.state.userDOB
        }
        this.props.addUser(payload);
        this.setState({
            userDetailsSubmitted: true,
            showSnack: true
        })
    }

    closeSnack = () => {
       this.setState({
        showSnack: false
       })
    }

    handleAnswer = (event) =>{
        this.setState({
            answer: event.target.value
        })
    }

    getCoverageClicked = () => {
        const userSubmitResponse = {
            userName: this.state.userName,
            dob: this.state.userDOB,
            address: this.state.userAddress
        }
        this.props.getCoverage(userSubmitResponse)
        
        this.setState({
            getCoverageClicked: true
        })
    }

    handleNext = () =>{
        const response = {
            userName: this.state.userName,
            dob: this.state.userDOB,
            address: this.state.userAddress,
            question: this.state.questionId,
            response: this.state.answer
        }
        this.props.submitResponse(response);
        if(this.state.index === this.state.totalQuestions){
            this.setState({
                questionsSubmitted: true
            })
        }else{
            this.setState((prevState) => ({
                index: prevState.index+1,
                currentQuestion: this.props.questions[prevState.index].question,
                questionId: this.props.questions[prevState.index].id,
                answer: '',
            }))
        }
       
    }
      
    render() {
        return (
            <div className={styles.rootComponent}>
                <div className={styles.rootComponentHeader}>
                    {this.state.userDetailsSubmitted && !this.state.questionsSubmitted && <span>Please answer the below questions</span> }
                    {!this.state.userDetailsSubmitted && !this.state.questionsSubmitted && <span>Please fill your details</span>}
                    {this.state.userDetailsSubmitted && this.state.questionsSubmitted && <span>We have saved your response</span>}
                </div>
                {this.state.userDetailsSubmitted && !this.state.questionsSubmitted &&
                    <QuestionComponent number={this.state.index} question={this.state.currentQuestion} answer={this.state.answer} 
                            handleChange ={this.handleAnswer} nextClicked = {this.handleNext}
                            />}
                {!this.state.userDetailsSubmitted && !this.state.questionsSubmitted && 
                    <UserDetailsComp userName={this.state.userName} saveName = {this.saveName}
                                    userDOB={this.state.userDOB} saveDOB = {this.saveDOB}
                                    userAddress={this.state.userAddress} saveAddress = {this.saveAddress}
                                    userDetailsSubmit = {this.userDetailsSubmit}
                    ></UserDetailsComp>
                }
                {this.state.userDetailsSubmitted && this.state.questionsSubmitted && !this.state.getCoverageClicked && <div className={styles.finalCoverageButton}> <Button variant="contained" color="primary" onClick={this.getCoverageClicked}>Get Coverage</Button></div>} 
                {this.state.userDetailsSubmitted && this.state.questionsSubmitted && this.state.getCoverageClicked && <div className={styles.finalCoverage}>
                        You are eligible for the coverage of amount: <span> ${this.props.coverage}</span></div>}
                 <Snackbar open={this.state.showSnack} autoHideDuration={2000} onClose={this.closeSnack}>
                    <MuiAlert elevation={6} variant="filled"  severity="success">
                        Submission Success!
                    </MuiAlert>
                </Snackbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    questions: state.questions.questions,
    coverage: state.coverage.coverage
  });

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            getQuestions: getQuestions,
            submitResponse: (payload) => submitResponse(payload),
            getCoverage: (payload) => getCoverage(payload),
            addUser: (payload) => addUser(payload),
           }, dispatch);
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(RootComponent);
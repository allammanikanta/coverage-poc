import React, { Component } from 'react';
import styles from './userDetailsComp.module.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

export default class UserDetailsComp extends Component {
    render() {
        const enableButton = this.props.userName !== '' && this.props.userAddress !== '' && this.props.userDOB !== '';
        return (
            <div className={styles.UserDetailsComp}>
                <div className={styles.UserDetailsCompCenterAlign}>
                    <div className={styles.userNameAndDOB}>
                        <TextField
                            className="None"
                            id="input-with-icon-textfield"
                            label="Enter Name"
                            value={this.props.userName}
                            onChange={this.props.saveName}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircle />
                                </InputAdornment>
                            ),
                            }}/>
                            <TextField
                                id="date"
                                label="Enter DOB"
                                type="date"
                                defaultValue="2017-05-24"
                                onChange={this.props.saveDOB}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                    </div>
                    <div className={styles.userAddress}>
                        <TextField
                            id="filled-full-width"
                            label="Enter Address"
                            style={{ margin: 0}}
                            placeholder=""
                            onChange={this.props.saveAddress}
                            helperText="Max of 2000 Characters"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={styles.submitButton}>
                        {enableButton ? 
                            <Button variant="contained" color="primary" onClick={this.props.userDetailsSubmit}>Submit </Button> :
                            <Button variant="contained" color="primary" disabled>Submit </Button> }
                    </div>
                    
                </div>
               
            </div>
        )
    }
}
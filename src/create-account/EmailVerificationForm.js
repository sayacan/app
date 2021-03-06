import React, { Component } from 'react';
import M from '../_common/M';
import ErrorMsg from '../_common/ErrorMsg';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';

export default class EmailVerificationForm extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        error: React.PropTypes.object.isRequired,
        email: React.PropTypes.string.isRequired,
        password: React.PropTypes.string.isRequired,
        residence: React.PropTypes.string.isRequired,
        verificationCode: React.PropTypes.string.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    async onVerificationCodeEntered(event) {
        const { actions } = this.props;
        try {
            await actions.createAccountFieldUpdate('verificationCode', event.target.value);
            await actions.createAccountFieldUpdate('error', null);
        } catch (err) {
            actions.createAccountFieldUpdate('error', err);
        }
    }

    async onVerify() {
        const { actions, email, password, residence, verificationCode } = this.props;
        const { router } = this.context;

        actions.createAccountFieldUpdate('progress', true);
        try {
            await LiveData.api.createVirtualAccount({
                email,
                client_password: password,
                residence,
                verification_code: verificationCode,
            });
            router.push('/signin');
        } catch (err) {
            actions.createAccountFailed(err);
        } finally {
            actions.createAccountFieldUpdate('progress', false);
        }
    }

    render() {
        const { error } = this.props;
        return (
            <div>
                <h3>
                    <M m="Please enter your email verification code" />
                </h3>
                <InputGroup
                    type="text"
                    placeholder="Verification Code"
                    onChange={::this.onVerificationCodeEntered}
                />
                <ErrorMsg
                    shown={!!error}
                    text={(error && error.message) || '-'}
                />
                <button onClick={::this.onVerify}><M m="Verify" /></button>
            </div>
        );
    }
}

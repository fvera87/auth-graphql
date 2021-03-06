import React, { Component } from 'react'
import AuthForm from './AuthForm'
import mutation from '../mutations/Login'
import query from '../queries/CurrentUser'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: []
    }
  }
  onSubmit ({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    })
      .catch(e => {
        const errors = e.graphQLErrors.map(error => error.message)
        this.setState({ errors })
      })
  }
  componentWillUpdate (nextProps) {
    // this.props the old set of props
    // nextProps the next set of props that will be in place when the component renders
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard')
    }
  }
  render () {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(LoginForm)
)

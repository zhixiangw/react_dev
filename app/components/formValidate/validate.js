const Validator = function(type,otherV) {

  const gg =  {
    'email': {
      rules: [{
        type: 'email', message: 'The input is not valid E-mail!',
      }, {
        required: true, message: 'Please input your E-mail!',
      }]
    },

    'password':{
      rules: [{
        required: true, message: 'Please input your password!',
      }, {
        validator: otherV,
      }],
    },

    'confirm':{
      rules: [{
        required: true, message: 'Please confirm your password!',
      }, {
        validator: otherV,
      }],
    },

    'residence':{
      rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
    },

    'phone':{
      rules: [{ required: true, message: 'Please input your phone number!' }],
    }



  }
  return gg[type]
}


export default  Validator

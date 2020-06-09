const englishTranslation = {
  common: {
    agree: 'Agree',
    disagree: 'Disagree',
    yes: 'Yes',
    no: 'No',
    ok: 'Ok',
    done: 'Done',
    submit: 'Submit',
    cancel: 'Cancel',
    upload: 'Upload',
    change: 'Change',
    delete: 'Delete',
    validation: {
      required: 'Required',
      tooShort: 'Too short',
      tooLong: 'Too long',
      mustAccept: 'Must be accepted',
      invalidEntry: 'Invalid entry'
    }
  },
  router: {
    message: {
      invalidContentType:
        'Bad of us.. Somehow, this is not redirecting to a valid content.'
    }
  },
  cookieConsent: {
    button: 'Got It!',
    message:
      'This website uses cookies to ensure you get the best experience on our website.'
  },
  topBar: {
    buttons: {
      notifications: 'Notifications',
      messages: 'Messages'
    },
    placeholders: {
      search: 'Search...'
    }
  },
  topMenu: {
    buttons: {
      notifications: 'Notifications',
      messages: 'Messages',
      newStream: 'New Stream',
      continueCanto: 'Continue Canto',
      profile: 'Profile',
      settings: 'Settings',
      language: 'Language',
      darkMode: 'Dark Mode',
      about: 'About',
      register: 'Register',
      login: 'Login',
      logout: 'Logout'
    },
    tooltips: {
      notifications: 'Notifications',
      messages: 'Messages',
      newStream: 'New Stream',
      continueCanto: 'Continue Canto'
    }
  },
  home: {
    labels: {
      bottomNav: {
        streams: {
          sealed: 'Sealed Streams',
          live: 'Live  Streams'
        },
        cantos: {
          paused: 'Paused Cantos',
          live: 'Live Cantos'
        }
      }
    },
    tooltips: {
      addContentFabAction: {
        stream: 'Stream',
        canto: 'Canto'
      }
    }
  },
  search: {
    labels: {
      streams: 'Stream',
      cantos: 'Cantos',
      users: 'Users'
    },
    message: {
      noResult: 'Nothing found'
    }
  },
  languageDialog: {
    title: 'Language',
    body: 'Choose to change the site language'
  },
  logoutConfirmationDialog: {
    title: 'Logout',
    body: 'You are going to log out. Are you sure that you want to log out?'
  },
  loginForm: {
    text: {
      title: 'Login',
      description: '',
      noAccount: 'Not having an account?'
    },
    labels: {
      usernameOrEmail: 'User Name or Email',
      password: 'Password'
    },
    buttons: {
      submit: 'Login',
      forgotPassword: 'Forgot Password',
      register: 'Not having an account? Register!'
    },
    validation: {
      invalidUserNameOrEmail:
        'The input is not a valid user name or email address'
    }
  },
  registerForm: {
    text: {
      title: 'Register',
      description: '',
      noAccount: 'Not having an account?'
    },
    labels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'User Name',
      email: 'Email',
      password: 'Password',
      retypePassword: 'Retype Password',
      birthDate: 'Birth Date',
      terms:
        'Do you agree the <1>terms of service</1> and <3>privacy policy</3>?'
    },
    buttons: {
      submit: 'Register'
    },
    validation: {
      invalidEmail: 'Invalid email',
      weakPassword: 'Weak password',
      invalidUsername: 'Invalid user name',
      invalidDateFormat: 'Invalid date format',
      passwordsNotMatch: 'Passwords do not match',
      invalidBirthDate: 'Not old enough, lucky you'
    }
  },
  agreements: {
    termsOfService: {
      title: 'Terms of Service'
    },
    privacyPolicy: {
      title: 'Privacy Policy'
    }
  },
  confirmRegistrationForm: {
    text: {
      title: 'Confirm Registration',
      description:
        'Please check your mailbox for a verification code and enter it below.'
    },
    message: {
      success: 'Account activated! Redirecting to Login page in a second',
      requiredUsername: 'User name cannot be empty'
    },
    labels: {
      code: 'Verification Code'
    },
    buttons: {
      submit: 'Confirm',
      resend: 'Resend Code (Email)'
    },
    validation: {
      invalidUsername: 'Invalid user name'
    }
  },
  forgotPasswordForm: {
    text: {
      title: 'Forgot Password',
      description:
        'Please enter your user name to receive a verification code via an e-mail. Then use that code to enter your new password.',
      checkYourEmail: 'Please check your email for a verification code'
    },
    labels: {
      username: 'User Name',
      code: 'Verification Code',
      password: 'Password',
      retypePassword: 'Retype Password'
    },
    buttons: {
      usernameSubmit: 'Send Code (Email)',
      usernameResubmit: 'Resend Code (Email)',
      changePassword: 'Change Password'
    },
    validation: {
      invalidUsername: 'Invalid user name',
      weakPassword: 'Weak password',
      passwordsNotMatch: 'Passwords do not match'
    },
    message: {
      success: 'Password changed! Redirecting to Login page in a second'
    }
  },
  farewell: {
    text: {
      title: 'Goodbye!',
      body: 'Still loving you. You can register right from the start anytime!'
    },
    buttons: {
      returnHome: 'Shut Up and Take Me Home'
    }
  },
  gridListTileCard: {
    text: {
      live: 'Live Now!'
    },
    buttons: {
      showAnyway: 'Show Anyway'
    },
    message: {
      blocked: 'Content is blocked'
    }
  },
  contentTileCard: {
    text: {
      live: 'Live Now!'
    },
    buttons: {
      unbookmark: 'Unbookmark',
      unwatch: 'Unwatch',
      unblock: 'Unblock'
    }
  },
  searchResultTileCard: {
    text: {
      live: 'Live Now!'
    },
    buttons: {
      showAnyway: 'Show Anyway'
    },
    message: {
      blocked: 'Content is blocked'
    }
  },
  profile: {
    labels: {
      bio: 'Bio'
    },
    buttons: {
      changeProfilePictureOverlay: 'Change',
      settings: 'Settings',
      watch: 'Watch',
      unwatch: 'Unwatch',
      block: 'Block',
      unblock: 'Unblock'
    },
    tabs: {
      streams: {
        title: 'Streams'
      },
      canto: {
        title: 'Canto'
      },
      bookmarks: {
        title: 'Bookmarks',
        contentTypeSelect: {
          label: 'Content Type',
          options: {
            stream: 'Stream',
            canto: 'Canto'
          }
        }
      },
      comments: {
        title: 'Comments'
      },
      faveOthers: {
        title: 'Fave Others'
      },
      blockedOthers: {
        title: 'Blocked Others'
      }
    },
    dialogs: {
      avatar: {
        title: 'Avatar',
        body: 'Choose an image to set as your new avatar',
        dropzone: "Drag 'n' drop some files here, or click to select files"
      }
    }
  },
  settings: {
    text: {
      title: 'Settings'
    },
    tabs: {
      profile: {
        title: 'Profile',
        labels: {
          bio: 'Bio (Optional)'
        },
        placeholders: {
          bio: 'A short information you want to give about you'
        },
        message: {
          bioUpdated: 'Bio updated successfully'
        }
      },
      account: {
        title: 'Account',
        basicInfo: {
          title: 'Basic Info',
          changeEmail: {
            title: 'Change Email',
            subheader: 'Current: {{authUserEmail}}',
            dialog: {
              title: 'Change Email',
              body: `
                After you enter the email address, you will be redirected to the account verification page.
                Enter the code you will shortly receive in the inbox of your new email.
              `,
              labels: {
                newEmail: 'New Email'
              },
              buttons: {
                sendVerificationCode: 'Send Code'
              },
              message: {
                success: 'Redirecting to account verification page in a second'
              }
            }
          },
          changePassword: {
            title: 'Change Password',
            dialog: {
              title: 'Change Password',
              body: 'Change Password',
              labels: {
                oldPassword: 'Old Password',
                newPassword: 'New Password',
                retypeNewPassword: 'Retype New Password'
              },
              validation: {
                weakPassword: 'Weak password',
                passwordsNotMatch: 'Passwords do not match'
              },
              message: {
                success: 'Redirecting to login page in a second'
              }
            }
          }
        },
        departure: {
          title: 'Departure',
          deleteAccount: {
            title: 'Delete Account',
            dialog: {
              title: 'Delete Account',
              body:
                'Your username may not be available to you again. Are you sure?'
            }
          }
        }
      },
      privacy: { title: 'Privacy' },
      notifications: { title: 'Notifications' },
      messaging: { title: 'In-site messaging' }
    }
  },
  canto: {
    topBarActionsMenu: {
      buttons: {
        unbookmark: 'Remove Bookmark'
      }
    }
  }
}
export default englishTranslation

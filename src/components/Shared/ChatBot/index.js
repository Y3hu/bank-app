import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { withRouter } from 'react-router-dom'

function CustomChatbot({ history, location }) {
    const config = {

        floating: true
    };

    const theme = {
        background: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
        headerBgColor: "#007bff",
        headerFontColor: "#fff",
        headerFontSize: "25px",
        botBubbleColor: "#007bff",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#007bff"
    };

    const steps = [
        {
            id: "Greet",
            message: "Hello, Welcome to our shop",
            trigger: "Ask Name"
        },
        {
            id: "Ask Name",
            message: "Please type your name?",
            trigger: "Waiting user input for name"
        },
        {
            id: "Waiting user input for name",
            user: true,
            trigger: "Asking options to help"
        },
        {
            id: "Asking options to help",
            message: "Hi {previousValue}, Please click on what you need help with!",
            trigger: "Displaying options to help"
        },
        {
            id: "Displaying options to help",
            options: [
                {
                    value: "transference",
                    label: "Transference",
                    trigger: "Helping with transference"
                },
                {
                    value: "balance",
                    label: "Balance",
                    trigger: "Helping with balance"
                },
                {
                    value: "favorite",
                    label: "Favorite",
                    trigger: "Helping with favorite"
                },
                {
                    value: "wallet",
                    label: "Wallet",
                    trigger: "Helping with wallet"
                }
            ]
        },
        {
            id: "Helping with balance",
            message: "Go to home page and select the account you want to see the balance, that's it.",
            trigger: "Asking if helpful"
        },
        {
            id: "Helping with transference",
            message: "OK, select the account you want to use to make a transference, then click on the add button and fill the form.",
            trigger: "Asking if helpful"
        },
        {
            id: "Helping with favorite",
            message: "Would you like me to take you there?",
            trigger: "Redirecting to"
        },
        {
            id: "Helping with wallet",
            message: "Would you like me to take you there?",
            trigger: "Redirecting to wallet"
        },
        {
            id: "Redirecting to",
            options: [
                {
                    value: true,
                    label: "Yes",
                    trigger: () => {
                        redirecting("/favorite")
                        return "Asking if helpful"
                    }
                },
                {
                    value: "false",
                    label: "No",
                    trigger: "Ask for another option"
                }
            ]
        },
        {
            id: "Redirecting to wallet",
            options: [
                {
                    value: true,
                    label: "Yes",
                    trigger: () => {
                        redirecting("/wallet")
                        return "Asking if helpful"
                    }
                },
                {
                    value: "false",
                    label: "No",
                    trigger: "Ask for another option"
                }
            ]
        },
        {
            id: "Asking if helpful",
            message: "Was it helpful?",
            trigger: "Helpful options"
        },
        {
            id: "Helpful options",
            options: [
                {
                    value: true,
                    label: "Yes",
                    trigger: () => {
                        return "Ask for another option"
                    }
                },
                {
                    value: "false",
                    label: "No",
                    trigger: "Ask for another option"
                }
            ]
        },

        {
            id: "Ask for another option",
            message: "Do you need help with something else?",
            trigger: "Another options"
        },
        {
            id: "Another options",
            options: [
                {
                    value: true,
                    label: "Yes",
                    trigger: () => {
                        return "Displaying options to help"
                    }
                },
                {
                    value: "false",
                    label: "No",
                    trigger: "Done"
                }
            ]
        },
        {
            id: "Done",
            message: "Have a great day !!",
            end: true
        }
    ];

    const redirecting = goTo => {
        history.push(goTo)
    }

    return (
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} {...config} />
        </ThemeProvider>
    )
}

export default withRouter(CustomChatbot)
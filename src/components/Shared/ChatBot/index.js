import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

function CustomChatbot(props) {
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
            message: "OK, go to the navbar and select home, then select the account you want to debit",
            trigger: "Asking if helpful"
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

    return (
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} {...config} />
        </ThemeProvider>
    )
}

export default CustomChatbot;
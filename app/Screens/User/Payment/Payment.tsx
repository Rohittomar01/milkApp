import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View } from "react-native-ui-lib";

export default function RazorPay() {


    const [status, setStatus] = useState('')
    const fam = 2000
    const options = {
        // key: 'rzp_test_1DP5mmOlF5G5ag',
        key: 'rzp_test_qPOfPOdzrtddEv',
        amount: fam * 100, //  = INR 1
        name: 'ips group of college',
        // description: 'some description',
        prefill: {
            name: "Vishal Jain",
            contact: "9174537339",
            email: "vishaljain2504@gmail.com"
        },

        image: 'http://www.ipsgwalior.org/ipsctm_journal/img/logo.png',
        handler: function (response) {
            // AddPurchaseDetails(response.razorpay_payment_id)
            // setStatus(true)
            alert(response.razorpay_payment_id)
        },
        notes: {
            address: 'some address'
        },
        theme: {
            color: '#212121',
            hide_topbar: false
        },
        //onClose:

    };

    const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        setStatus(true)

    };



    const OnlineMethod = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        setTimeout(() => {
            openPayModal()
        }, 1500)
    }

    return (
        <SafeAreaView>
            <View >
                <Button onPress={() => OnlineMethod()}><Text>click here for other options</Text></Button>
            </View>
        </SafeAreaView>
    )
}
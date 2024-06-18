const razorpay = require("./razorpay");

const createContact = async (data) => {
    return new Promise((resolve, reject) => {
        const contactData = {
            name: data.name,
            email: data.email,
            contact: '8909678874'
        }

        razorpay.customers.create(contactData)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

const addFundAccount = async (bankData, contactId) => {
    console.log(contactId);
    return new Promise((resolve, reject) => {
        const fundAccountData = {
            contact_id: contactId,
            account_type: 'bank_account',
            bank_account: {
                name: bankData.bankName,
                ifsc: bankData.ifscCode,
                account_number: bankData.accountNumber
            }
        }
        razorpay.fundAccount.create(fundAccountData)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

module.exports = { createContact, addFundAccount };